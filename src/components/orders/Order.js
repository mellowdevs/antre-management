import React from 'react';

const Order = () => {
	return (
		<div className='card order-card'>
			<div className='card-body table-card-body'>
				<h5 className='card-title table-name'>Masa 1</h5>
				<div className='card-text'>
					<ul className='order-details-body list-group'>
						<li className='order-item list-group-item'>
							<div className='row'>
								<div className='col-1 prod-num'>3</div>
								<div className='col-8 prod-name'>Iced Americano</div>
								<div className='col-2 prod-price'>45₺</div>
							</div>
						</li>
						<li className='order-item list-group-item'>
							<div className='row'>
								<div className='col-1 prod-num'>1</div>
								<div className='col-8 prod-name'>Cold Brew</div>
								<div className='col-2 prod-price'>20₺</div>
							</div>
						</li>
						<li className='order-item list-group-item'>
							<div className='row'>
								<div className='col-1 prod-num'>1</div>
								<div className='col-8 prod-name'>Cheesecake</div>
								<div className='col-2 prod-price'>15₺</div>
							</div>
						</li>
					</ul>
					<div className='row'>
						<div className='col-3 order-price'> Tutar: </div>
						<div className='col-3 order-price  offset-6 table-price text-center'>
							80₺
						</div>
					</div>
				</div>
				<button className='btn btn-primary manage-btn'>Yönet</button>
			</div>
		</div>
	);
};

export default Order;
