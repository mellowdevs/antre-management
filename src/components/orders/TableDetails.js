import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import TableOrder from './TableOrder';
import firebase from 'firebase';
import { updateTable, deleteTableOrder } from '../../store/actions/orderAction';
import { DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class TableDetails extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
	}
	state = {
		title: 'title',
		tname: '',
		tid: '',
		cid: '1',
		cname: '',
		items: [{}],
		currEntry: '',
		updatedOrders: [],
		addedEntries: [],
		categoryItems: [],
		prevOrders: [],
		prevOIDs: [],
		prevCid: '1',
		cumulative: 0,
		deleteShow: false,
	};
	closeCheckModal() {
		this.setState({ deleteShow: true });
	}
	save() {
		this.props.updateTable(this.state);
	}
	clearStates() {
		const initState = this.state.prevOrders;
		this.setState({ cid: '1' });
		this.setState({ cname: '' });
		this.setState({ currEntry: '' });
		this.setState({ categoryItems: [] });
		this.setState({ updatedOrders: initState });
		this.updateCumulative();
	}

	updateCumulative(t) {
		let total = this.state.cumulative;
		total += t;
		this.setState({ cumulative: total });
	}
	addEntry(currEntry) {
		if (this.state.currEntry) {
			let results = this.state.updatedOrders.filter((entry) => {
				return entry.id === currEntry.id;
			});
			if (results.length === 0) {
				const temp = this.state.updatedOrders;
				temp.push({
					total: currEntry.price,
					cid: this.state.cid,
					id: currEntry.id,
					price: currEntry.price,
					name: currEntry.name,
					count: 1,
					stock: currEntry.stock || 0,
				});
				this.setState({ updatedOrders: temp });
			} else {
				const updatedEntries = [];
				this.state.updatedOrders.forEach((entry) => {
					if (entry.id === currEntry.id) {
						const currCount = entry.count + 1;
						updatedEntries.push({
							count: currCount,
							id: entry.id,
							name: entry.name,
							price: entry.price,
							stock: entry.stock,
							total: entry.price * currCount,
							cid: this.state.cid,
						});
					} else {
						updatedEntries.push({ ...entry });
					}
				});
				this.setState({ updatedOrders: updatedEntries });
			}
			this.updateCumulative(currEntry.price);
		}
	}
	removeEntry = (currEntry) => {
		if (this.state.currEntry) {
			let results = this.state.updatedOrders.filter((entry) => {
				return entry.id === currEntry.id;
			});
			if (results.length !== 0) {
				const updatedEntries = [];
				this.state.updatedOrders.forEach((entry) => {
					if (entry.id === currEntry.id) {
						if (entry.count !== 1) {
							const currCount = entry.count - 1;
							updatedEntries.push({
								count: currCount,
								id: entry.id,
								name: entry.name,
								price: entry.price,
								stock: entry.stock,
								total: entry.price * currCount,
								cid: this.state.cid,
							});
						}
					} else {
						updatedEntries.push({ ...entry });
					}
				});
				this.setState({ updatedOrders: updatedEntries });
				this.updateCumulative(-currEntry.price);
			}
		}
	};
	componentWillUnmount() {
		this._isMounted = false;
	}
	componentDidMount() {
		const database = firebase.database();
		let title = '';
		// this._isMounted = true;
		// const database = firebase.firestore();
		// const tid = this.props.match.params.id;
		// this.setState({ tid: tid });
		// database
		// 	.collection('tables')
		// 	.doc(tid)
		// 	.get()
		// 	.then((response) => {
		// 		this.setState({ tname: response.data().name });
		// 		database
		// 			.collection('tables')
		// 			.doc(tid)
		// 			.collection('orders')
		// 			.get()
		// 			.then((response) => {
		// 				let total = 0;
		// 				const tmpOrders = [];
		// 				const savePrev = [];
		// 				const ids = [];
		// 				response.forEach((doc) => {
		// 					tmpOrders.push(doc.data());
		// 					savePrev.push(doc.data());
		// 					ids.push(doc.id);
		// 					total += doc.data().total;
		// 				});
		// 				this.setState({ prevOrders: savePrev });
		// 				this.setState({ updatedOrders: tmpOrders });
		// 				this.setState({ prevOIDs: ids });
		// 				this.setState({ cumulative: total });
		// 			});
		// 	});
	}
	setCategory(category) {
		this.setState({ cid: category.id });
		this.setState({ cname: category.name });
		this.setState({ currEntry: '' });
	}
	handleClose() {
		this.setState({ deleteShow: false });
	}
	setItem(item) {
		this.setState({ currEntry: item });
	}
	componentDidUpdate() {
		const prevCid = this.state.prevCid;

		if (this.state.cid !== prevCid) {
			this.setState({ prevCid: this.state.cid });
			const categoryItems = [];
			const database = firebase.firestore();
			database
				.collection('categories')
				.doc(this.state.cid)
				.collection('items')
				.orderBy('name', 'asc')
				.get()
				.then((response) => {
					response.forEach((doc) => {
						const item = {
							id: doc.id,
							...doc.data(),
						};
						categoryItems.push(item);
					});
					this.setState({ categoryItems: categoryItems });
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	handleDelete() {
		// this.props.deleteTableOrder(this.state);
	}
	render() {
		const { auth, categories, updateSuccess, updateError } = this.props;
		const tid = this.props.match.params.id;
		if (!auth.uid) {
			return <Redirect to='/signin' />;
		}
		let total = 0;
		return (
			<div className='container table-details'>
				<div className='row'>
					<div className='col-12 col-sm-7'>
						<div className='card table-details-card shadow'>
							<div className='card-title text-center'>
								<h6 className='component-title table-name-detail'>
									{this.state.tname}
								</h6>
							</div>
							<div className='card-body'>
								<ul className='list-group'>
									{this.state.updatedOrders &&
										this.state.updatedOrders.map((order, index) => {
											return <TableOrder order={order} key={index} tid={tid} />;
										})}
								</ul>
								<div className='row order-item'>
									<div className='col-3 offset-2'>
										<p>Total:</p>
									</div>
									<div className='col-3 offset-4'>
										<p>{this.state.cumulative}₺</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-12 col-sm-5'>
						<div className='card table-details-card shadow'>
							<div className='card-title text-center'>
								<h6 className='component-title table-name-detail'>Düzenle</h6>
							</div>
							<div className='card-body'>
								<div className='row'>
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
																this.setCategory(category);
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
											{this.state.categoryItems &&
												this.state.categoryItems.map((item) => {
													return (
														<Dropdown.Item
															key={item.id}
															onClick={(e) => {
																this.setItem(item);
															}}
														>
															{item.name}
														</Dropdown.Item>
													);
												})}
										</DropdownButton>
									</div>
								</div>
								<div className='row'>
									<div className='col-4 offset-2 '>
										<button
											className='btn btn-remove-entry'
											onClick={(e) => {
												this.removeEntry(this.state.currEntry);
											}}
										>
											-
										</button>
									</div>
									<div className='col-4 offset-2 '>
										<button
											className='btn btn-add-entry'
											onClick={(e) => {
												this.addEntry(this.state.currEntry);
											}}
										>
											+
										</button>
									</div>
								</div>
								<div className='row'>
									<div className='col-6'>
										<button
											className='btn cancel-order-btn'
											onClick={(e) => this.clearStates()}
										>
											Temizle
										</button>
									</div>
									<div className='col-6'>
										<Link to='/' style={{ textDecoration: 'none' }}>
											<button
												className='btn save-order-btn'
												onClick={(e) => this.save()}
											>
												Kaydet
											</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-sm-5 offset-sm-7'>
						<div className='card table-details-card shadow'>
							<div className='card-title text-center'>
								<h6 className='component-title table-name-detail'>
									Adisyon Kapat
								</h6>
							</div>
							<div className='card-body'>
								<div className='row'>
									<div className='col-4'>
										<button
											className='btn btn-danger'
											onClick={(e) => this.closeCheckModal()}
										>
											HESABI KAPAT
										</button>
									</div>
									<div className='col-4'>
										<button className='btn btn-info'>ÖDEME EKLE</button>
									</div>
									<div className='col-4'>
										<button className='btn btn-success'>ÖDEME TAMAMLA</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Modal
					show={this.state.deleteShow}
					onHide={(e) => this.handleClose()}
					animation={false}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.tname}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.state.tname} hesabını silmek istiyor musunuz?
					</Modal.Body>
					<Modal.Footer>
						<button
							className='btn btn-secondary'
							onClick={(e) => this.handleClose()}
						>
							İptal
						</button>
						<button
							className='btn btn-danger'
							onClick={(e) => this.handleDelete()}
						>
							HESABI SİL
						</button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

const ConditionalLink = ({ children, to, condition }) =>
	!!condition && to ? (
		<Link to={to} style={{ textDecoration: 'none' }}>
			{children}{' '}
		</Link>
	) : (
		<>{children}</>
	);
const mapDispatchToProps = (dispatch) => {
	return {
		updateTable: (table) => dispatch(updateTable(table)),
		deleteTableOrder: (table) => dispatch(deleteTableOrder(table)),
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.firebase.auth,
		categories: state.firestore.ordered.categories,
		updateError: state.order.updateError,
		updateSuccess: state.order.updateSuccess,
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
)(TableDetails);
