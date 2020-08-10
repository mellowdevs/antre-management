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
			return { ...state, menuError: '' };
		case 'UPDATE_MENU_ITEM':
			return state;
		case 'DELETE_MENU_ITEM':
			return state;
		case 'ADD_MENU_ITEM_ERROR':
			return { ...state, menuError: 'Failed' };
		default:
			return state;
	}
};

export default menuReducer;
