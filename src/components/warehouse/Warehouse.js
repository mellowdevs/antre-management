import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class Warehouse extends Component {
	render() {
		const { products, auth } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}

		return (
			<div className='container-fluid warehouse-container'>
				<div className='container-fluid title-container text-center'>
					<div className='row'>
						<div className='col-12'>
							<h5 className='component-title warehouse-title'>ANTRE DEPO</h5>
						</div>
					</div>
				</div>
				<ProductList products={products} />
				<div className='add-more-btn-container text-center'>
					<Link to='/add-product'>
						<button className='btn add-new-product-btn'>+</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.firestore.ordered.products,
		auth: state.firebase.auth,
	};
};

export default compose(
	firestoreConnect(() => ['products']),
	connect(mapStateToProps)
)(Warehouse);
