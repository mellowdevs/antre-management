import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
	reduxFirestore,
	getFirestore,
	createFirestoreInstance,
} from 'redux-firestore';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
		reduxFirestore(fbConfig, { attachAuthIsReady: true })
	)
);
const rrfProps = {
	firebase,
	config: fbConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
	userProfile: 'users', // where profiles are stored in database
	presence: 'presence', // where list of online users is stored in database
	sessions: 'sessions',
};

function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth))
		return (
			<div className='container-fluid loading text-center'>
				<div className='spinner-border loading' role='status'></div>
			</div>
		);
	return children;
}
ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<AuthIsLoaded>
				<App />
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);
