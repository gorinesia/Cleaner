import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAwCJl7jA_yHzUd7CkMoZwAifRMSxWmDGs",
    authDomain: "cleaner-caffc.firebaseapp.com",
    databaseURL: "https://cleaner-caffc.firebaseio.com",
    projectId: "cleaner-caffc",
    storageBucket: "cleaner-caffc.appspot.com",
    messagingSenderId: "639829768377",
    appId: "1:639829768377:web:20e16362831873cbadc368",
    measurementId: "G-QQ0FFYZ3V3"
  })
}

// const firebaseConfig = {
//   apiKey: "AIzaSyAwCJl7jA_yHzUd7CkMoZwAifRMSxWmDGs",
//   authDomain: "cleaner-caffc.firebaseapp.com",
//   databaseURL: "https://cleaner-caffc.firebaseio.com",
//   projectId: "cleaner-caffc",
//   storageBucket: "cleaner-caffc.appspot.com",
//   messagingSenderId: "639829768377",
//   appId: "1:639829768377:web:20e16362831873cbadc368",
//   measurementId: "G-QQ0FFYZ3V3"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export default firebase;
