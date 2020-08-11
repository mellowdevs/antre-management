import { updateMenuItem } from './menuActions';

export const updateWarehouse = (table) => {
	const tid = table.tid;
	const orders = table.orders;
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
		orders.forEach((order) => {
			console.log(order.cid);
			const firestore = getFirestore();
			firestore
				.collection('categories')
				.doc(order.cid)
				.get()
				.then((response) => {
					if (response.data().isWarehouse) {
						const orderStock = order.stock;
						const orderCount = order.count;
						firestore
							.collection('categories')
							.doc(order.cid)
							.collection('items')
							.doc(order.id)
							.update({
								stock: orderStock - orderCount,
							})
							.then(function () {
								dispatch({ type: 'UPDATE_MENU_ITEM', table });
							});
					}
				})
				.catch((error) =>
					dispatch({
						type: 'ADD_TABLE_ERROR',
						orderError: error,
						orderSuccess: '',
					})
				);
		});
	};
};

export const addTable = (table) => {
	const tid = table.tid;
	const orders = table.orders;
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

// const update = (order, count) => {
// };
