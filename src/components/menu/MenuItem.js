import React from 'react';

const MenuItem = ({ item }) => {
	console.log(JSON.stringify(item));
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
					<button className='btn btn-sm'>
						<i class='material-icons edit-icon'>edit</i>
					</button>
				</div>
			</div>
		</li>
	);
};

export default MenuItem;
