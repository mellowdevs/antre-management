import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { addTable } from '../../store/actions/orderAction';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class CreateOrder extends Component {
	state = {
		cname: '',
		cid: '1',
		currEntry: '',
		categoryItems: [],
		addedEntries: [],
		prevCid: '1',
		tid: '1',
	};

	save() {
		this.props.addTable(this.state);
	}
	clearStates() {
		this.setState({ cid: '1' });
		this.setState({ cname: '' });
		this.setState({ currEntry: '' });
		this.setState({ categoryItems: [] });
		this.setState({ addedEntries: [] });
	}

	addEntry(currEntry) {
		if (this.state.currEntry) {
			let results = this.state.addedEntries.filter((entry) => {
				return entry.id === currEntry.id;
			});
			if (results.length === 0) {
				this.state.addedEntries.push({
					total: currEntry.price,
					cid: this.state.cid,
					id: currEntry.id,
					price: currEntry.price,
					name: currEntry.name,
					count: 1,
					stock: currEntry.stock || 0,
				});
				console.log('l', this.state.addedEntries);
				console.log(this.props);
			} else {
				const updatedEntries = [];
				this.state.addedEntries.forEach((entry) => {
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
				this.setState({ addedEntries: updatedEntries });
			}
		}
	}
	setCategory(category) {
		this.setState({ cid: category.id });
		this.setState({ cname: category.name });
		this.setState({ currEntry: '' });
	}
	setItem(item) {
		this.setState({ currEntry: item });
	}

	removeEntry = (currEntry) => {
		if (this.state.currEntry) {
			let results = this.state.addedEntries.filter((entry) => {
				return entry.id === currEntry.id;
			});
			if (results.length !== 0) {
				const updatedEntries = [];
				this.state.addedEntries.forEach((entry) => {
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
				this.setState({ addedEntries: updatedEntries });
			}
		}
	};

	componentDidMount() {
		const database = firebase.firestore();
		const tid = this.props.match.params.id;
		this.setState({ tid: tid });
		database
			.collection('tables')
			.doc(tid)
			.get()
			.then((response) => {
				this.setState({ tname: response.data().name });
			});
	}

	componentDidUpdate() {
		const prevCid = this.state.prevCid;

		if (this.state.cid !== prevCid) {
			this.setState({ prevCid: this.state.cid });
			const database = firebase.firestore();
			database
				.collection('categories')
				.doc(this.state.cid)
				.collection('items')
				.orderBy('name', 'asc')
				.get()
				.then((response) => {
					const categoryItems = [];
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
	render() {
		const { auth, categories, orderError, orderSuccess } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}

		return (
			<div className='container create-order'>
				<div className='card order-create-card shadow'>
					<h5 className='component-title add-table-title'>
						{this.state.tname}
					</h5>
					<div className='card-body create-card-body'>
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
							<div className='col-12'>
								<div className='added-list'>
									<ul className='list-group'>
										{this.state.addedEntries &&
											this.state.addedEntries.map((entry) => {
												return (
													<li className='list-group-item'>
														{entry.count} {entry.name}
													</li>
												);
											})}
									</ul>
								</div>
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
								<ConditionalLink
									to='/'
									condition={
										this.state.addedEntries.length > 0 && this.state.cid
									}
								>
									<button
										className='btn save-order-btn'
										onClick={(e) => this.save()}
									>
										Kaydet
									</button>
								</ConditionalLink>
							</div>
						</div>
						<div className='add-menu-error-div text-center'>
							<p className='add-menu-result'>
								{orderError ? (
									<p className='add-menu-error-text'>{orderError}</p>
								) : null}
								{orderSuccess ? (
									<p className='add-menu-success-text'>Adisyon kaydedildi.</p>
								) : null}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const ConditionalLink = ({ children, to, condition }) =>
	!!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		categories: state.firestore.ordered.categories,
		orderError: state.order.orderError,
		orderSuccess: state.order.orderSuccess,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTable: (table) => dispatch(addTable(table)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(() => {
		return [{ collection: 'categories', orderBy: 'name' }];
	})
)(CreateOrder);
