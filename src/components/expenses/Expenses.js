import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import AddExpense from './AddExpense';
import firebase from 'firebase';

class Expenses extends Component {
	state = {
		prevCount: 0,
		daily: 0,
		monthly: 0,
	};

	componentDidUpdate() {
		const { expenses } = this.props;
		const today = new Date().toLocaleDateString('tr-TR');
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const day = new Date().getDate();
		const database = firebase.firestore();
		database
			.collection('expenses')
			.get()
			.then((response) => {
				let dailyCost = 0;
				let monthlyCost = 0;
				let yearCost = 0;
				response.forEach((doc) => {
					const expense = doc.data();
					if (expense.date === today) {
						dailyCost += expense.cost;
					}
					if (year === expense.year) {
						yearCost += expense.cost;
						if (month === expense.month) {
							monthlyCost += expense.cost;
						}
					}
				});
				this.setState({ daily: dailyCost, monthly: monthlyCost });
			})
			.catch((error) => {
				console.error(error);
			});
	}

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
						<div className='card add-expense-card shadow'>
							<div className='card-title m-2 text-center'>
								<h6>{new Date().toLocaleDateString('tr-TR')}</h6>
							</div>
							<div className='card-body add-expense-body'>
								<div className='row'>
									<div className='col-6'>Günlük Toplam</div>
									<div className='col-6 text-center'>{this.state.daily}₺</div>
								</div>
								<div className='row'>
									<div className='col-6'>Ay Toplamı</div>
									<div className='col-6 text-center'>{this.state.monthly}₺</div>
								</div>
							</div>
						</div>
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
