import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	return (
		<div className='card product-card shadow'>
			<div className='card-body table-card-body'>
				<div className='card-text'>
					<div className='row'>
						<div className='col-12 product-detail-col '>
							<p className='product-detail-item product-detail-name'>
								{product.name}
							</p>
						</div>
					</div>
					<div className='row product-second-row'>
						<div className='col-3  product-detail-col'>
							<p className='product-detail-item product-detail-stock'>
								<b>{product.stock} porsiyon</b>
							</p>
						</div>
						<div className='col-3 product-detail-col'>
							<p className='product-detail-item product-detail-price'>
								{product.price}₺
							</p>
						</div>
						<div className='col-4 product-detail-col'>
							<Link
								to={'/update/' + product.id}
								style={{ textDecoration: 'none' }}
							>
								<button className='btn edit-product-btn'>Güncelle</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
