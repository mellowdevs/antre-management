const initState = {};
const expenseReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return state;
		case 'DELETE_EXPENSE':
			return state;
		case 'ADD_EXPENSE_ERROR':
			return state;
		default:
			return state;
	}
};

export default expenseReducer;
