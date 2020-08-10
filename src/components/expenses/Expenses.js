import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import ExpenseItem from './ExpenseItem';
import AddExpense from './AddExpense';

class Expenses extends Component {
	state = {};

	render() {
		const { expenses, auth } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='container-fluid expenses-container'>
				<div className='container-fluid title-container text-center'>
					<div className='row'>
						<div className='col-12'>
							<h5 className='component-title'>ANTRE MASRAFLAR</h5>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-md-4'>
						<AddExpense />
					</div>
					<div className='col-12 col-md-7 offset-md-1'>
						{expenses &&
							expenses.map((expense) => {
								return <ExpenseItem expense={expense} key={expense.id} />;
							})}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		expenses: state.firestore.ordered.expenses,
	};
};

export default compose(
	firestoreConnect(() => [
		{ collection: 'expenses', orderBy: ['createdAt', 'desc'] },
	]),
	connect(mapStateToProps)
)(Expenses);
