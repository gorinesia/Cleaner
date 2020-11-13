import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
  projectId: process.env.VUE_APP_FB_PROJECTID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
// const firebaseApp = firebase.initializeApp(config);

// export const auth = firebaseApp.auth();
// export const firestore = firebaseApp.firestore();
// export const storage = firebaseApp.storage();

export default firebase;
