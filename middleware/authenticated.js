import firebase from 'firebase/app';
import 'firebase/auth';

export default function ({ store, redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return redirect('/auth/login');
    }
  })
}
