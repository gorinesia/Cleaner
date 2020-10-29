import firebase from 'firebase';

export const state = () => ({
  // currentUser: null,
  // displayName: '',
  currentUser: [],
  loginUsers: []
})

export const getters = {
  // currentUser: state => state.currentUser,
  // displayName: state => state.displayName,
  currentUser: state => state.currentUser,
  loginUsers: state => state.loginUsers,
}

export const mutations = {
  // serCurrentUser: (state, payload) => {
  //   state.currentUser = payload
  // },
  setCurrentUser: (state, currentLoginUser) => {
    state.currentUser = currentLoginUser;
  },
  setLoginUsers: (state, otherLoginUsers) => {
    state.loginUsers = otherLoginUsers;
  }
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
  logInUserDisplay({commit}) {
    const getUser = firebase.auth().currentUser;
    const db =firebase.firestore();
    db.collection('users')
      .onSnapshot((querySnapshot) => {
        const allUsers = [];
        querySnapshot.forEach((doc) => {
          allUsers.push({
            displayName: doc.data().displayName
          })
          console.log(doc.data().displayName)
          const otherLoginUsers = allUsers.filter((otherUsers) => {
            return otherUsers.displayName != getUser.displayName;
          })
          const currentLoginUser = allUsers.filter((currentUser) => {
            return currentUser.displayName === getUser.displayName;
          })
          commit('setCurrentUser', currentLoginUser);
          commit('setLoginUsers', otherLoginUsers);
        })
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
