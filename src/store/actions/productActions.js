export const addProduct = (product) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to DB
		const firestore = getFirestore();
		firestore
			.collection('products')
			.add({
				...product,
			})
			.then(() => {
				dispatch({ type: 'ADD_PRODUCT', product });
			})
			.catch((err) => dispatch({ type: 'ADD_PRODUCT_ERROR', err }));
	};
};
export const updateProduct = (product) => {
	const id = product.id;
	const cid = product.cid;
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const ref = firestore
			.collection('categories')
			.doc(cid)
			.collection('items')
			.doc(id);
		ref
			.update({
				name: product.name,
				price: product.price,
				stock: product.stock,
			})
			.then(function () {
				dispatch({ type: 'UPDATE_PRODUCT', product });
			});
	};
};
