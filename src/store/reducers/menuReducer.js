const initState = {
	categories: [
		{
			id: '1',
			name: 'Kahve',
		},
		{
			id: '2',
			name: 'Türk Kahvesi',
		},
		{
			id: '3',
			name: 'Meşrubatlar',
		},
	],
};
const menuReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_MENU_ITEM':
			console.log('created product', action.item);
			return state;
		case 'UPDATE_MENU_ITEM':
			console.log('updated product', action.item);
			return state;
		case 'DELETE_MENU_ITEM':
			console.log('updated product', action.item);
			return state;
		case 'ADD_MENU_ITEM_ERROR':
			console.log('error creating product', action.err);
			return state;
		default:
			return state;
	}
};

export default menuReducer;
