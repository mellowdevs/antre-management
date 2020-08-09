import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../../store/actions/productActions';
import { Redirect } from 'react-router-dom';
class AddProduct extends Component {
	state = {
		name: '',
		stock: '',
		price: '',
	};
	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSubmit = (e) => {
		this.props.addProduct(this.state);
	};
	render() {
		const { auth } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='container-fluid add-product-container'>
				<div className='card add-product-card'>
					<div className='card-title text-center'>
						<h5 className='component-title'>Ürün Ekle</h5>
					</div>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12 '>
								<input
									type='text'
									id='name'
									className='product-name'
									onChange={this.handleChange}
									placeholder='Ürün Adı'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-4'>
								<input
									type='number'
									id='stock'
									className='product-name'
									onChange={this.handleChange}
									placeholder='Stok adeti'
									min='1'
								/>
							</div>
							<div className='col-4'>
								<input
									type='number'
									id='price'
									className='product-price'
									onChange={this.handleChange}
									placeholder='Satış Fiyatı'
									min='1'
								/>
							</div>
							<div className='col-4'>
								<Link to='/warehouse' style={{ textDecoration: 'none' }}>
									<button
										className='btn btn add-product-button'
										onClick={this.handleSubmit}
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
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addProduct: (product) => dispatch(addProduct(product)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
