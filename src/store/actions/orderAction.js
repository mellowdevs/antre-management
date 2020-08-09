export const addTable = (table) => {
	return (dispatch, getState) => {
		// make async call to DB
		dispatch({
			type: 'NEW_TABLE',
			table,
		});
	};
};
