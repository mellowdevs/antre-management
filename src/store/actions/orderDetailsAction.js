export const addOrderRow = (orderRow) => {
	return (dispatch, getState) => {
		// make async call to DB
		dispatch({
			type: 'NEW_ORDER_ROW',
			orderRow,
		});
	};
};
