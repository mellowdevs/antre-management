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
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const ref = firestore.collection('products').doc(id);
		ref
			.update({
				name: product.name,
				stock: product.stock,
				price: product.price,
			})
			.then(function () {
				dispatch({ type: 'UPDATE_PRODUCT', product });
			});
		// make async call to DB
		// const firestore = getFirestore();
		// firestore.collection('products');
		// .then(() => {
		// 	dispatch({ type: 'UPDATE_PRODUCT', product });
		// })
		// .catch((err) => dispatch({ type: 'ADD_PRODUCT_ERROR', err }));
	};
};
