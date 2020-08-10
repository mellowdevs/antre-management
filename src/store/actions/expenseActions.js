export const addExpense = (expense) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection('expenses')
			.add({
				descr: expense.descr,
				cost: expense.cost,
				date: expense.date,
				createdAt: firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				dispatch({ type: 'ADD_EXPENSE', expense });
			})
			.catch((err) => dispatch({ type: 'ADD_EXPENSE_ERROR', err }));
	};
};
export const deleteExpense = (expense) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log(expense.id);
		const firestore = getFirestore();
		firestore
			.collection('expenses')
			.doc(expense.id)
			.delete()
			.then(function () {
				dispatch({ type: 'DELETE_EXPENSE' });
			});
	};
};
