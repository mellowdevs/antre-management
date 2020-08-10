const initState = {
	authError: '',
};
const authReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SIGNIN_ERROR':
			return {
				...state,
				authError: 'Login Failed',
			};
		case 'SIGNIN_SUCCES':
			return {
				...state,
				authError: '',
			};
		case 'SIGNOUT_ERROR':
			return {
				...state,
				authError: 'Login Failed',
			};
		case 'SIGNOUT_SUCCES':
			return state;
		default:
			return state;
	}
};

export default authReducer;
