import firebase from 'firebase';
import 'firebase/firestore';
import {initFirestorter, Collection} from 'firestorter';

firebase.initializeApp({
  apiKey: "AIzaSyC6sLlg-hq33NxIwY2xA9GhPvattsZUPYs",
  authDomain: "studio-backoffice-253304.firebaseapp.com",
  databaseURL: "https://studio-backoffice-253304.firebaseio.com",
  projectId: "studio-backoffice-253304",
  storageBucket: "studio-backoffice-253304.appspot.com",
  messagingSenderId: "913361955490",
  appId: "1:913361955490:web:d798af39cb682adb8545fb",
  measurementId: "G-9RNV8E1X8E"
});



initFirestorter({firebase: firebase});

const threads = new Collection('threads');

export {
	threads
};
