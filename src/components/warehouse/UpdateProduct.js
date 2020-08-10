import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProduct } from '../../store/actions/productActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

const UpdateProduct = (props) => {
	const id = props.match.params.id;
	const { product, auth } = props;
	if (!auth.uid) {
		return <Redirect to='/signin' />;
	}
	if (product) {
		const state = {
			id: id,
			cid: product.cid,
			name: product.name,
			stock: product.stock,
			price: product.price,
		};
		const handleChange = (e) => {
			state[e.target.id] = parseInt(e.target.value);
		};

		const handleSubmit = (e) => {
			props.updateProduct(state);
		};
		return (
			<div className='container-fluid add-product-container'>
				<div className='card add-product-card shadow'>
					<div className='card-title text-center'>
						<h5 className='component-title'>Ürün Güncelle</h5>
					</div>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12 text-center'>
								<p className='update-product-name'>{product.name}</p>
							</div>
						</div>
						<div className='row'>
							<div className='col-4 text-center'>
								<p className='update-label'>Stok Adeti</p>
							</div>
							<div className='col-4 text-center'>
								<p className='update-label'>Satış Ücreti</p>
							</div>
						</div>
						<div className='row'>
							<div className='col-4'>
								<input
									type='number'
									id='stock'
									className='product-stock'
									onChange={handleChange}
									placeholder='Stok adeti'
									defaultValue={product.stock}
									min='1'
								/>
							</div>
							<div className='col-4'>
								<input
									type='number'
									id='price'
									className='product-price'
									onChange={handleChange}
									placeholder='Satış Fiyatı'
									defaultValue={product.price}
									min='1'
								/>
							</div>

							<div className='col-4'>
								<Link to='/warehouse' style={{ textDecoration: 'none' }}>
									<button
										className='btn btn add-product-button'
										onClick={handleSubmit}
									>
										Kaydet
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
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
			stock: itemDetails.stock,
		};
	}
	return {
		product: item,
		auth: state.firebase.auth,
	};
	// const id = ownProps.match.params.id;
	// const products = state.firestore.data.products;
	// const product = products ? products[id] : null;
	// return {
	// 	product: product,
	// 	auth: state.firebase.auth,
	// };
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateProduct: (product) => dispatch(updateProduct(product)),
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
)(UpdateProduct);
