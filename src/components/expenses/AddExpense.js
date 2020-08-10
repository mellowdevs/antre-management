import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addExpense } from '../../store/actions/expenseActions';
import { connect } from 'react-redux';

class AddExpense extends Component {
	state = {
		descr: '',
		date: new Date().toLocaleDateString('tr-TR'),
		cost: 0,
	};
	date = new Date();
	handleChange = (e) => {
		this.setState({
			[e.target.id]: parseInt(e.target.value) || e.target.value,
		});
	};
	handleSubmit = (e) => {
		this.props.addExpense(this.state);
	};
	render() {
		return (
			<div className='card add-expense-card shadow'>
				<div className='card-title text-center'>
					<h5 className='component-title add-expense-title'>Masraf Girişi</h5>
				</div>
				<div className='card-body add-expense-body'>
					<div className='row'>
						<div className='col-12 text-center'>
							<input
								type='text'
								id='descr'
								className='product-name'
								onChange={this.handleChange}
								placeholder='Açıklama'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-12 text-center'>
							<input
								type='number'
								id='cost'
								className='product-name'
								onChange={this.handleChange}
								placeholder='Tutar'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-12'>
							{/* <Link to='/expenses' style={{ textDecoration: 'none' }}> */}
							<button
								className='btn btn add-menu-item-button'
								onClick={this.handleSubmit}
							>
								Kaydet
							</button>
							{/* </Link> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addExpense: (product) => dispatch(addExpense(product)),
	};
};
export default connect(null, mapDispatchToProps)(AddExpense);
