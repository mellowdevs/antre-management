const initState = {
	products: [],
};
const productReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			return state;
		case 'UPDATE_PRODUCT':
			return state;
		case 'ADD_PRODUCT_ERROR':
			return state;
		default:
			return state;
	}
};

export default productReducer;
