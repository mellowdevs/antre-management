import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import firebase from 'firebase';

class Warehouse extends Component {
	state = {
		categories: [{}],
		items: [{}],
	};
	componentDidMount() {
		const database = firebase.firestore();

		database
			.collection('categories')
			.where('isWarehouse', '==', true)
			.get()
			.then((response) => {
				const categories = [];
				const items = [];
				response.forEach((doc) => {
					const cid = doc.id;
					const category = {
						id: cid,
						...doc.data(),
					};
					categories.push(category);
					database
						.collection('categories')
						.doc(doc.id)
						.collection('items')
						.get()
						.then((response) => {
							response.forEach((doc) => {
								const item = {
									id: doc.id,
									cid: cid,
									...doc.data(),
								};
								items.push(item);
							});
							this.setState({ items: items });
						})
						.catch(function (error) {
							console.log('Error getting documents: ', error);
						});
				});
				this.setState({ categories: categories });
			})
			.catch(function (error) {
				console.log('Error getting documents: ', error);
			});
	}
	render() {
		const { auth } = this.props;
		const items = this.state.items;
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
				<ProductList items={items} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

export default connect(mapStateToProps)(Warehouse);
