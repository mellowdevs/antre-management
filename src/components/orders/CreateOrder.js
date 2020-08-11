import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { addTable, updateWarehouse } from '../../store/actions/orderAction';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import firebase from 'firebase';

class CreateOrder extends Component {
	state = {
		tname: '',
		tid: '',
		cid: '1',
		cname: '',
		items: [{}],
		currEntry: '',
		orders: [],
	};
	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	saveOrder = (e) => {
		// this.props.updateWarehouse(this.state);
		this.props.addTable(this.state);
	};
	addEntry = (entry) => {
		if (this.state.currEntry) {
			let results = this.state.orders.filter((order) => {
				return order.id === entry.id;
			});
			if (results.length === 0) {
				this.state.orders.push({
					...entry,
					count: 1,
					stock: entry.stock || 0,
					total: entry.price,
					cid: this.state.cid,
				});
			} else {
				const newOrders = [];
				this.state.orders.forEach((order) => {
					if (order.id === entry.id) {
						const currCount = order.count + 1;
						newOrders.push({
							count: currCount,
							id: order.id,
							name: order.name,
							price: order.price,
							stock: order.stock,
							total: order.price * currCount,
							cid: this.state.cid,
						});
					} else {
						newOrders.push({ ...order });
					}
				});
				this.setState({ orders: newOrders });
			}
		}
	};

	removeEntry = (entry) => {
		if (this.state.currEntry) {
			let results = this.state.orders.filter((order) => {
				return order.id === entry.id;
			});
			if (results.length !== 0) {
				const newOrders = [];
				this.state.orders.forEach((order) => {
					if (order.id === entry.id) {
						console.log('yo');
						if (order.count !== 1) {
							const currCount = order.count - 1;
							newOrders.push({
								count: currCount,
								id: order.id,
								name: order.name,
								price: order.price,
								stock: order.stock,
								total: order.price * currCount,
								cid: this.state.cid,
							});
						}
					} else {
						newOrders.push({ ...order });
					}
				});
				this.setState({ orders: newOrders });
			}
		}
	};
	componentDidUpdate() {
		const database = firebase.firestore();
		database
			.collection('categories')
			.doc(this.state.cid)
			.collection('items')
			.orderBy('name', 'asc')
			.get()
			.then((response) => {
				const items = [];
				response.forEach((doc) => {
					const item = {
						id: doc.id,
						...doc.data(),
					};
					items.push(item);
				});
				this.setState({ items: items });
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		const { auth, tables, categories, orderError } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='container create-order'>
				<div className='card order-create-card shadow'>
					<h5 className='component-title add-table-title'>Yeni Adisyon</h5>
					<div className='card-body create-card-body'>
						<div className='row'>
							<div className='col-12 table-col'>
								<DropdownButton
									id='dropdown-table-button'
									title={this.state.tname || 'Masa Seç'}
								>
									{tables &&
										tables.map((table) => {
											return table.isTaken ? null : (
												<Dropdown.Item
													className='dropdown-table-item'
													key={table.id}
													onClick={(e) => {
														this.setState({ tid: table.id });
														this.setState({ tname: table.name });
													}}
												>
													{table.name}
												</Dropdown.Item>
											);
										})}
								</DropdownButton>
							</div>
							<div className='col-12'>
								<DropdownButton
									id='dropdown-category-button'
									title={this.state.cname || 'Kategori'}
								>
									{categories &&
										categories.map((category) => {
											return (
												<Dropdown.Item
													key={category.id}
													onClick={(e) => {
														this.setState({ cid: category.id });
														this.setState({ cname: category.name });
														this.setState({ currEntry: '' });
													}}
												>
													{category.name}
												</Dropdown.Item>
											);
										})}
								</DropdownButton>
							</div>
						</div>
						<div className='row'>
							<div className='col-12 product'>
								<DropdownButton
									id='dropdown-item-button'
									title={this.state.currEntry.name || 'Ürün Seç'}
								>
									{this.state.items &&
										this.state.items.map((item) => {
											return (
												<Dropdown.Item
													key={item.id}
													onClick={(e) => {
														this.setState({ currEntry: item });
													}}
												>
													{item.name}
												</Dropdown.Item>
											);
										})}
								</DropdownButton>
							</div>
							<div className='col-4 offset-2 '>
								<button
									className='btn btn-add-entry'
									onClick={(e) => this.addEntry(this.state.currEntry)}
								>
									+
								</button>
							</div>
							<div className='col-4 offset-2 '>
								<button
									className='btn btn-remove-entry'
									onClick={(e) => this.removeEntry(this.state.currEntry)}
								>
									-
								</button>
							</div>
						</div>
						<div className='added-list'>
							<ul className='list-group'>
								{this.state.orders &&
									this.state.orders.map((order) => {
										return (
											<li className='list-group-item'>
												{order.count} {order.name}
											</li>
										);
									})}
							</ul>
						</div>
						<button className='btn save-order-btn' onClick={this.saveOrder}>
							Kaydet
						</button>
						<div className='add-menu-error-div text-center'>
							<p className='add-menu-result'>
								{orderError ? (
									<p className='add-menu-error-text'>{orderError}</p>
								) : null}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		tables: state.firestore.ordered.tables,
		categories: state.firestore.ordered.categories,
		orderError: state.order.orderError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTable: (table) => dispatch(addTable(table)),
		updateWarehouse: (table) => dispatch(updateWarehouse(table)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(() => {
		return [
			{ collection: 'tables', orderBy: 'name' },
			{ collection: 'categories', orderBy: 'name' },
		];
	})
)(CreateOrder);
