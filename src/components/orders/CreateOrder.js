import React, { Component } from 'react';
import OrderProductEntry from './OrderProductEntry';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { addTable } from '../../store/actions/orderAction';
class CreateOrder extends Component {
	state = {};
	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleClick = (e) => {
		this.props.addTable(this.state);
	};
	render() {
		const { auth } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='container create-order'>
				<div className='card order-create-card shadow'>
					<div className='card-body create-card-body'>
						<div className='select-div'>
							<select
								onChange={this.handleChange}
								id='table'
								className='form-select select-table'
								aria-label='Default select example'
							>
								<option defaultValue>Masa Adı</option>
								<option value='1'>Masa 1</option>
								<option value='2'>Masa 2</option>
								<option value='3'>Masa 3</option>
								<option value='4'>Masa 4</option>
								<option value='5'>Masa 5</option>
								<option value='6'>Masa 6</option>
							</select>
						</div>
						<div className='products-added'>
							<OrderProductEntry />
						</div>
						<div className='added-list'>
							<ul className='list-group'>
								<li className='list-group-item'>Americano</li>
							</ul>
						</div>
						<button className='btn save-order-btn' onClick={this.handleClick}>
							Kaydet
						</button>
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
		addTable: (table) => dispatch(addTable(table)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
