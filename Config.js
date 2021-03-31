import firebase from 'firebase';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCXa2_gAOHqX25jnujPRVVh3EURi6W4QzU",
    authDomain: "barter-system-e5db7.firebaseapp.com",
    projectId: "barter-system-e5db7",
    storageBucket: "barter-system-e5db7.appspot.com",
    messagingSenderId: "484978065103",
    appId: "1:484978065103:web:45b25cc50120d0a94641ba"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();