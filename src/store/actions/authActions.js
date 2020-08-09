export const signIn = (credentails) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signInWithEmailAndPassword(credentails.email, credentails.password)
			.then(() => {
				dispatch({ type: 'SIGNIN_SUCCES' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNIN_ERROR', err });
			});
	};
};
export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: 'SIGNOUT_SUCCES' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNOUT_ERROR', err });
			});
	};
};
