import firebase from 'firebase/app';
import 'firebase/auth';
// import firebase, { auth } from '~/plugins/firebase.js'


export default function ({ store, redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return redirect('/auth/login');
    }
  })
}
