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
			console.log('created item', action.item);
			return { ...state, menuError: '' };
		case 'UPDATE_MENU_ITEM':
			console.log('updated item', action.item);
			return state;
		case 'DELETE_MENU_ITEM':
			console.log('updated item', action.item);
			return state;
		case 'ADD_MENU_ITEM_ERROR':
			console.log('error creating item', action.err);
			return { ...state, menuError: 'Failed' };
		default:
			return state;
	}
};

export default menuReducer;
