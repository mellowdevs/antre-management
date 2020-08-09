import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
var firebaseConfig = {
	apiKey: 'AIzaSyAT9ZV7uFkF2gIpzVt3usd1fT6i4v4eRxA',
	authDomain: 'antre-cafe.firebaseapp.com',
	databaseURL: 'https://antre-cafe.firebaseio.com',
	projectId: 'antre-cafe',
	storageBucket: 'antre-cafe.appspot.com',
	messagingSenderId: '680588920199',
	appId: '1:680588920199:web:592811710646f5310d3f22',
	measurementId: 'G-W4EBHQ0HHS',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
