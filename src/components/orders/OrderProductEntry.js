import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrderRow } from '../../store/actions/orderDetailsAction';

class OrderProductEntry extends Component {
	state = {};

	handleProduct = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleClick = (e) => {
		this.props.addOrderRow(this.state);
		console.log(this.state);
	};
	render() {
		return (
			<div className='row product-entry'>
				<div className='col-10 product'>
					<select
						className='form-select select-product'
						aria-label='Default select example'
						id='name'
						onChange={this.handleProduct}
					>
						<option defaultValue>Ürün Adı</option>
						<option value='filtre'>Filtre Kahve</option>
						<option value='americano'>Americano</option>
						<option value='turk'>Türk Kahvesi</option>
						<option value='espresso'>Espresso</option>
						<option value='flat'>Flat White</option>
						<option value='cheesecake'>Cheesecake</option>
					</select>
				</div>
				<div className='col-2 '>
					<button className='btn btn-add-a-row' onClick={this.handleClick}>
						+
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addOrderRow: (row) => dispatch(addOrderRow(row)),
	};
};

export default connect(null, mapDispatchToProps)(OrderProductEntry);
