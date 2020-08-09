const initState = {
	orders: [
		{ id: '01', name: 'Filtre Kahve' },
		{ id: '02', name: 'Americano' },
	],
};
const orderDetailsReducer = (state = initState, action) => {
	switch (action.type) {
		case 'NEW_ORDER_ROW':
			console.log('created product', action.orderRow);
	}
	return state;
};

export default orderDetailsReducer;
