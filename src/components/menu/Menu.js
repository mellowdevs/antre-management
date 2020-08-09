import React, { Component } from 'react';
import MenuList from './MenuList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class Menu extends Component {
	render() {
		const { categories } = this.props;
		console.log(this.props);
		return (
			<div className='container-fluid menu-container'>
				<div className='container-fluid title-container text-center'>
					<div className='row'>
						<div className='col-12'>
							<h5 className='component-title '>ANTRE MENÜ</h5>
						</div>
					</div>
				</div>

				<MenuList categories={categories} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.firestore.ordered.categories,
	};
};
export default compose(
	firestoreConnect(() => [
		{ collection: 'categories', orderBy: ['name', 'asc'] },
	]),
	connect(mapStateToProps)
)(Menu);
