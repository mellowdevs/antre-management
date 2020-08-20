export const addTable = (table) => {
	const tid = table.tid;
	const orders = table.addedEntries;
	console.log(table);
	if (!tid) {
		return (dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: 'ADD_TABLE_ERROR', orderError: 'Masa Seçmelisin.' });
		};
	}
	if (orders.length === 0) {
		return (dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: 'ADD_TABLE_ERROR', orderError: 'Ürün seçmelisin.' });
		};
	}
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		firestore.collection('tables').doc(tid).update({
			isTaken: true,
		});
		orders.forEach((order) => {
			const firestore = getFirestore();
			firestore
				.collection('tables')
				.doc(tid)
				.collection('orders')
				.add({
					...order,
				})
				.then(() => {
					dispatch({
						type: 'ADD_TABLE',
						orderError: '',
						orderSuccess: 'success',
						table,
					});
				})
				.catch((error) =>
					dispatch({
						type: 'ADD_TABLE_ERROR',
						orderError: error,
						orderSuccess: '',
						table,
					})
				);
		});
	};
};

export const updateTable = (table) => {
	const tid = table.tid;
	const orders = table.updatedOrders;
	if (!tid) {
		console.log('here');
		return (dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: 'UPDATE_TABLE_ERROR', updateError: 'Masa Seçmelisin.' });
		};
	}
	if (orders.length === 0) {
		return (dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: 'UPDATE_TABLE_ERROR', updateError: 'Ürün seçmelisin.' });
		};
	}
	return (dispatch, getState, { getFirestore }) => {
		console.log('updating');
		const prevOrders = table.prevOrders;
		const prevIDs = table.prevOIDs;
		const firestore = getFirestore();
		// Delete prev
		prevIDs.forEach((id) => {
			firestore
				.collection('tables')
				.doc(tid)
				.collection('orders')
				.doc(id)
				.delete()
				.then(() => {
					console.log('deleted');
				});
		});

		orders.forEach((order) => {
			firestore
				.collection('tables')
				.doc(tid)
				.collection('orders')
				.add({
					...order,
				})
				.then(() => {
					dispatch({
						type: 'UPDATE_TABLE',
						updateError: '',
						updateSuccess: 'success',
						table,
					});
				})
				.catch((error) =>
					dispatch({
						type: 'UPDATE_TABLE_ERROR',
						updateError: error,
						updateSuccess: '',
						table,
					})
				);
		});
	};
};

export const deleteTableOrder = (table) => {
	const tid = table.tid;
	const orders = table.updatedOrders;
	if (!tid) {
		console.log('here');
		return (dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: 'UPDATE_TABLE_ERROR', updateError: 'Masa Seçmelisin.' });
		};
	}
	if (orders.length === 0) {
		return (dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: 'UPDATE_TABLE_ERROR', updateError: 'Ürün seçmelisin.' });
		};
	}
	return (dispatch, getState, { getFirestore }) => {
		console.log('deletinn');
		const firestore = getFirestore();
		// Save to DB
		orders.forEach((order) => {
			firestore
				.collection('deletedOrders')
				.add({
					...order,
				})
				.then(() => {
					console.log('done');
				});
		});

		// Update Warehouse

		// Delete
	};
};
