import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Table extends Component {
	render() {
		const { table } = this.props;
		if (table.isTaken) {
			return (
				<div className='card order-card taken-table shadow'>
					<div className='card-body table-card-body text-center'>
						<h5 className='card-title table-name'>{table.name}</h5>
						<Link to={'/order/' + table.id} style={{ textDecoration: 'none' }}>
							<button className='btn btn-primary manage-btn'>Yönet</button>
						</Link>
					</div>
				</div>
			);
		} else {
			return (
				<div className='card order-card shadow'>
					<div className='card-body table-card-body  text-center'>
						<h5 className='card-title table-name'>{table.name}</h5>
						<Link to={'/create/' + table.id} style={{ textDecoration: 'none' }}>
							<button className='btn btn-primary manage-btn'>Yeni Masa</button>
						</Link>
					</div>
				</div>
			);
		}
	}
}

export default Table;
