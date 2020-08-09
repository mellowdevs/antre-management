import React from 'react';
import Product from './Product';
const ProductList = ({ products }) => {
	return (
		<div className='warehouse-flex'>
			{products &&
				products.map((product) => {
					return <Product product={product} key={product.id} />;
				})}
		</div>
	);
};

export default ProductList;
