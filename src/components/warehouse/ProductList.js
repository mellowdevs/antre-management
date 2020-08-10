import React from 'react';
import Product from './Product';
const ProductList = ({ items }) => {
	return (
		<div className='warehouse-flex'>
			{items &&
				items.map((item) => {
					return <Product product={item} key={item.id} />;
				})}
		</div>
	);
};

export default ProductList;
