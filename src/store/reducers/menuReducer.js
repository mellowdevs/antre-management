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
	return state;
};

export default menuReducer;
