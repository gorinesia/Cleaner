import Vuex from 'vuex';
import firebase from 'firebase';
// import router from 'router';

export const state = () => ({
  // currentUser: null,
  displayName: '',
})

export const getters = {
  // currentUser: state => state.currentUser,
  displayName: state => state.displayName
}

export const mutations = {
  // serCurrentUser: (state, payload) => {
  //   state.currentUser = payload
  // },
  setDisplayName: (state, payload) => {
    state.displayName = payload
  },
}

export const actions = {
  signUpAction({commit}, payload) {
    const db = firebase.firestore();
    db.collection('users')
      .add(payload)
      .then((docRef) => {
        console.log(docRef.id);
      })
      .catch((error) => {
        console.log(error);
      })
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: payload.displayName
          })
          // commit('setcurrentUser', result.user.uid);
          this.$router.push('/auth/login');
        })
        .catch((error) => {
          console.log(error)
        })
  },
  logInAction({commit}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((result) => {
        console.log('loggedIn!!');
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        console.log(error.message);
      })
  },
  logOutAction({commit}) {
    firebase.auth().signOut()
      .then(() => {
        console.log('logout!!');
        this.$router.push('/auth/login');
      })
  }
}
