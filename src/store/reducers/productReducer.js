const initState = {
	products: [
		{
			id: '1',
			name: 'Beyoğlu Gazoz Zencefilli',
			stock: 12,
			price: 7,
		},
		{
			id: '2',
			name: 'Beyoğlu Gazoz Limonlu',
			stock: 10,
			price: 7,
		},
		{
			id: '3',
			name: 'Limonlu Cheesecake',
			stock: 8,
			price: 15,
		},
	],
};
const productReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			console.log('created product', action.product);
			return state;
		case 'UPDATE_PRODUCT':
			console.log('updated product', action.product);
			return state;
		case 'ADD_PRODUCT_ERROR':
			console.log('error creating product', action.err);
			return state;
		default:
			return state;
	}
};

export default productReducer;
