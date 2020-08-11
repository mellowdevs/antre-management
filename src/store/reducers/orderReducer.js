const initState = {
	tables: [
		{
			id: '1',
			orders: [
				{ id: '01', name: 'Filtre Kahve' },
				{ id: '02', name: 'Americano' },
			],
		},
		{
			id: '2',
			orders: [
				{ id: '01', name: 'Flat White' },
				{ id: '02', name: 'Americano' },
				{ id: '03', name: 'Cheesecake' },
			],
		},
	],
};
const orderReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_TABLE_ERROR':
			return {
				...state,
				orderError: action.orderError,
			};
		case 'ADD_TABLE':
			return {
				...state,
				orderError: '',
			};
		default:
			return state;
	}
	return state;
};

export default orderReducer;
