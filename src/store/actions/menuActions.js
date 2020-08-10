export const addMenuItem = (item) => {
	const cid = item.cid;
	console.log(cid);
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection('categories')
			.doc(cid)
			.collection('items')
			.add({
				name: item.name,
				price: item.price,
			})
			.then(() => {
				dispatch({ type: 'ADD_MENU_ITEM', item });
			})
			.catch((err) => dispatch({ type: 'ADD_MENU_ITEM_ERROR', err }));
	};
};
export const updateMenuItem = (item) => {
	const id = item.id;
	const cid = item.cid;
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const ref = firestore
			.collection('categories')
			.doc(cid)
			.collection('items')
			.doc(id);
		ref
			.update({
				name: item.name,
				price: item.price,
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
		const firestore = getFirestore();
		firestore
			.collection('categories')
			.doc(cid)
			.collection('items')
			.doc(id)
			.delete()
			.then(function () {
				dispatch({ type: 'DELETE_MENU_ITEM', item });
			});
	};
};
