import firebase from 'firebase/app';
import 'firebase/auth';
// import firebase, { auth } from '~/plugins/firebase.js'


export default function ({ route, store, redirect }) {
  console.log(route);
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return redirect('/auth/login');
    }
  })
}
