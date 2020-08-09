import React from 'react';
import MenuCategory from './MenuCategory';

const MenuList = ({ categories }) => {
	const results = categories;
	console.log(results);
	return (
		<div className='menu-flex'>
			{results &&
				results.map((category) => {
					return (
						<MenuCategory
							category={category}
							cid={category.id}
							key={category.id}
						/>
					);
				})}
		</div>
	);
};

export default MenuList;
