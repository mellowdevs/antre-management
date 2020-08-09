import authReducer from './authReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import expenseReducer from './expenseReducer';
import orderDetailsReducer from './orderDetailsReducer';
import menuReducer from './menuReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
	auth: authReducer,
	product: productReducer,
	order: orderReducer,
	expense: expenseReducer,
	orderDetails: orderDetailsReducer,
	menu: menuReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
});

export default rootReducer;
