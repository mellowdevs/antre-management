import React, { Component } from 'react';
import TableOrder from './TableOrder';
import firebase from 'firebase';
class Table extends Component {
	state = {
		orders: [{}],
		total: 0,
	};
	componentDidMount() {
		const { table } = this.props;
		const database = firebase.firestore();
		database
			.collection('tables')
			.doc(table.id)
			.collection('orders')
			.get()
			.then((response) => {
				const orders = [];
				let total = 0;
				response.forEach((doc) => {
					const order = {
						id: doc.id,
						...doc.data(),
					};
					total += order.total;
					orders.push(order);
				});
				this.setState({ orders: orders, total: total });
			})
			.catch((error) => {
				console.error(error);
			});
	}
	render() {
		const { table } = this.props;
		const orders = this.state.orders;
		return (
			<div className='card order-card shadow'>
				<div className='card-body table-card-body'>
					<h5 className='card-title table-name'>{table.name}</h5>
					<div className='card-text'>
						<ul className='order-details-body list-group'>
							{orders &&
								orders.map((order) => {
									return <TableOrder order={order} key={order.id} />;
								})}
						</ul>
						<div className='row'>
							<div className='col-3 order-price'> Tutar: </div>
							<div className='col-3 order-price  offset-6 table-price text-center'>
								{this.state.total}₺
							</div>
						</div>
					</div>
					<button className='btn btn-primary manage-btn'>Yönet</button>
				</div>
			</div>
		);
	}
}

export default Table;
