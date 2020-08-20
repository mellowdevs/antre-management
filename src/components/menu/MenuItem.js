import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ item }) => {
	return (
		<li className='list-group-item'>
			<div className='row'>
				<div className='col-6 menu-item-detail'>{item.name}</div>
				<div className='col-3 menu-item-detail'>{item.price}₺</div>
				<div className='col-1 menu-item-detail'>
					<Link
						to={'/item/' + item.cid + '/' + item.key}
						style={{ textDecoration: 'none' }}
					>
						<button className='btn btn-sm'>
							<i className='material-icons edit-icon'>edit</i>
						</button>
					</Link>
				</div>
			</div>
		</li>
	);
};

export default MenuItem;
