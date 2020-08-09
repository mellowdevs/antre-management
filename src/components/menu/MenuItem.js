import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ item }) => {
	return (
		<li className='list-group-item'>
			<div className='row'>
				<div className='col-6'>
					<p>{item.name}</p>
				</div>
				<div className='col-3'>
					<p>{item.price}₺</p>
				</div>
				<div className='col-1'>
					<Link
						to={'/item/' + item.cid + '/' + item.id}
						cid={item.cid}
						slm='slm'
						style={{ textDecoration: 'none' }}
					>
						<button className='btn btn-sm'>
							<i class='material-icons edit-icon'>edit</i>
						</button>
					</Link>
				</div>
			</div>
		</li>
	);
};

export default MenuItem;
