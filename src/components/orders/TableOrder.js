import React, { Component } from 'react';

class TableOrder extends Component {
	state = {};
	render() {
		const { order } = this.props;
		return (
			<li className='order-item list-group-item'>
				<div className='row'>
					<div className='col-1 prod-num'>{order.count}</div>
					<div className='col-8 prod-name'>{order.name}</div>
					<div className='col-2 prod-price'>{order.total}₺</div>
				</div>
			</li>
		);
	}
}

export default TableOrder;
