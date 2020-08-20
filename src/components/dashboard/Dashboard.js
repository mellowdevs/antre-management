import React, { Component } from 'react';
import Stats from './Stats';
import TableList from '../orders/TableList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
	render() {
		const { auth } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='dashboard container'>
				<div className='row'>
					<div className='col-12'>
						<TableList />
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

export default compose(
	firestoreConnect(() => ['products']),
	connect(mapStateToProps)
)(Dashboard);
