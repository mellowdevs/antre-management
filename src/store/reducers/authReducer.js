const initState = {
	authError: '',
};
const authReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SIGNIN_ERROR':
			console.log('signin error');
			return {
				...state,
				authError: 'Login Failed',
			};
		case 'SIGNIN_SUCCES':
			console.log('signin success');
			return {
				...state,
				authError: '',
			};
		case 'SIGNOUT_ERROR':
			console.log('signout error');
			return {
				...state,
				authError: 'Login Failed',
			};
		case 'SIGNOUT_SUCCES':
			console.log('signout success');
			return state;
		default:
			return state;
	}
};

export default authReducer;
