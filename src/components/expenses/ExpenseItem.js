import React from 'react';
import { Link } from 'react-router-dom';
import { deleteExpense } from '../../store/actions/expenseActions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const ExpenseItem = (props) => {
	const { expense } = props;

	return (
		<div className='jumbotron expense-jumbo border-bottom'>
			<div className='row'>
				<div className='col-12'>
					<p className='expense-item-descr'>{expense.descr}</p>
				</div>
			</div>
			<div className='row'>
				<div className='col-6'>
					<p className='expense-item-date'>{expense.date}</p>
				</div>
				<div className='col-4'>
					<p className='expense-item-cost '>{expense.cost}₺</p>
				</div>
				<div className='col-2'>
					<button
						className='btn btn-delete'
						onClick={(e) => props.deleteExpense(expense)}
					>
						<i className='material-icons'>delete</i>
					</button>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteExpense: (expense) => dispatch(deleteExpense(expense)),
	};
};
export default connect(null, mapDispatchToProps)(ExpenseItem);
