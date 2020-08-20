import React, { Component } from 'react';
import MenuList from './MenuList';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class Menu extends Component {
	render() {
		const { categories, auth } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='container-fluid menu-container'>
				<div className='container-fluid title-container text-center'>
					<div className='row'>
						<div className='col-12'>
							<h5 className='component-title'>ANTRE MENÜ</h5>
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
		auth: state.firebase.auth,
		categories: state.firebase.ordered.categories,
	};
};
export default compose(
	firebaseConnect({ path: 'categories', queryParams: ['orderByKey'] }),
	connect(mapStateToProps)
)(Menu);
