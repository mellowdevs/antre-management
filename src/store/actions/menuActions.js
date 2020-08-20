export const addMenuItem = (item) => {
	const cid = item.cid;
	if (!cid) {
		return (dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: 'ADD_MENU_ITEM_ERROR', err: 'no_category' });
		};
	}
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log('gelen item', item);
		const database = getFirebase();
		database
			.ref(`categories/${cid}/items/`)
			.push({
				name: item.name,
				price: item.price,
				stock: 0,
			})
			.then(function () {
				dispatch({ type: 'ADD_MENU_ITEM', item });
			});
		// const firestore = getFirestore();
		// firestore
		// 	.collection('categories')
		// 	.doc(cid)
		// 	.collection('items')
		// 	.add({
		// 		name: item.name,
		// 		price: item.price,
		// 		stock: 0,
		// 	})
		// 	.then(() => {
		// 		dispatch({ type: 'ADD_MENU_ITEM', item });
		// 	})
		// 	.catch((err) => dispatch({ type: 'ADD_MENU_ITEM_ERROR', err }));
	};
};
export const updateMenuItem = (item) => {
	console.log('gelen', item);
	const id = item.id;
	const cid = item.cid;
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const database = getFirebase();
		database
			.ref(`categories/${cid}/items/${id}`)
			.update({
				name: item.name,
				price: item.price,
				stock: item.stock,
			})
			.then(function () {
				dispatch({ type: 'UPDATE_MENU_ITEM', item });
			});
	};
};

export const deleteMenuItem = (item) => {
	const id = item.id;
	const cid = item.cid;
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const database = getFirebase();
		database
			.ref(`categories/${cid}/items/${id}`)
			.remove()
			.then(function () {
				dispatch({ type: 'DELETE_MENU_ITEM', item });
			});
	};
};
