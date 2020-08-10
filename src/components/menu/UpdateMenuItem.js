import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	updateMenuItem,
	deleteMenuItem,
} from '../../store/actions/menuActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

const UpdateMenuItem = (props) => {
	const cid = props.match.params.cid;
	const id = props.match.params.id;
	const { item, auth } = props;
	if (!auth.uid) {
		return <Redirect to='/signin' />;
	}
	if (item) {
		const state = {
			cid: cid,
			id: id,
			cname: item.cname,
			name: item.name,
			price: item.price,
		};
		const handleChange = (e) => {
			state[e.target.id] =
				parseFloat(e.target.value) ||
				e.target.value;
		};
		const handleUpdate = (e) => {
			props.updateMenuItem(state);
		};
		const handleDelete = (e) => {
			props.deleteMenuItem(state);
		};
		return (
			<div className='container-fluid update-menu-container'>
				<div className='card add-product-card shadow'>
					<div className='card-title text-center'>
						<h5 className='component-title menu-update-title'>Menü Güncelle</h5>
					</div>
					<div className='card-body'>
						<div className='row'>
							<div className='col-8 menu-input'>
								<input
									type='text'
									id='name'
									className='product-name'
									placeholder='Ürün Adı'
									onChange={handleChange}
									defaultValue={item.name}
									min='1'
								/>
							</div>
							<div className='col-3  menu-input'>
								<input
									type='number'
									id='price'
									className='product-price'
									placeholder='Satış Fiyatı'
									onChange={handleChange}
									defaultValue={item.price}
									min='1'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-4 offset-4 update-menu-col text-center'>
								<Link to='/menu' style={{ textDecoration: 'none' }}>
									<button
										className='btn btn-danger update-menu-btn'
										onClick={handleDelete}
									>
										Kaldır
									</button>
								</Link>
							</div>
							<div className='col-4 update-menu-col '>
								<Link to='/menu' style={{ textDecoration: 'none' }}>
									<button
										className='btn btn-success update-menu-btn'
										onClick={handleUpdate}
									>
										Güncelle
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <div>yo</div>;
	}
};

const mapStateToProps = (state, ownProps) => {
	let item = {};
	const id = ownProps.match.params.id;
	const cid = ownProps.match.params.cid;
	const items = state.firestore.data.items;
	const itemDetails = items ? items[id] : null;
	const categories = state.firestore.data.categories;
	const thisCategory = categories ? categories[cid] : null;
	if (itemDetails && thisCategory) {
		item = {
			cid: cid,
			cname: thisCategory.name,
			id: id,
			name: itemDetails.name,
			price: itemDetails.price,
		};
	}
	return {
		item: item,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateMenuItem: (item) => dispatch(updateMenuItem(item)),
		deleteMenuItem: (item) => dispatch(deleteMenuItem(item)),
	};
};
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => {
		const cid = props.match.params.cid;
		return [
			{
				collection: `categories/${cid}/items`,
				storeAs: 'items',
			},
			{
				collection: `categories`,
				storeAs: 'categories',
			},
		];
	})
)(UpdateMenuItem);
