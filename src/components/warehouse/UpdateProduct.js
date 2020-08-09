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
				<div className='card add-product-card'>
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
	const id = ownProps.match.params.id;
	const products = state.firestore.data.products;
	const product = products ? products[id] : null;
	return {
		product: product,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateProduct: (product) => dispatch(updateProduct(product)),
	};
};
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([{ collection: 'products' }])
)(UpdateProduct);
