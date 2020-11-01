import firebase from 'firebase';

export const state = () => ({
  user: null,
  allUsers: [],
  currentUser: [],
  loginUsers: []
})

export const getters = {
  allUsers: state => state.allUsers,
  currentUser: state => state.currentUser,
  loginUsers: state => state.loginUsers,
}

export const mutations = {
  setUser(state, currentUser) {
    state.user = currentUser
  },
  setAllUsers: (state, allLoggedInUsers) => {
    state.allUsers = allLoggedInUsers;
  },
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
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then((result) => {
            result.user.updateProfile({
              displayName: payload.displayName
            })
            commit('setUser', payload.displayName);
            this.$router.push('/auth/login');
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error);
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
  openTheApplication({commit}) {
    const db = firebase.firestore();
    db.collection('users')
      .onSnapshot((querySnapshot) => {
        const allLogUsers = [];
        querySnapshot.forEach((doc) => {
          allLogUsers.push({
            displayName: doc.data().displayName
          })
          console.log(doc.data().displayName)
          const allLoggedInUsers = allLogUsers.filter(() => {
            return  doc.data().displayName
          })
          commit('setAllUsers', allLoggedInUsers);
        })
      })
  },
  // signInAnonymously({commit}) {
  //   firebase.auth().signInAnonymously()
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if(user) {
  //       const uid = user.uid;
  //       const currentLoginUser = [{displayName: 'ゲスト'}]
  //       commit('setCurrentUser', currentLoginUser);
  //       this.$router.push('/dashboard');
  //     }
  //   })
  // },
  logInUserDisplay(context) {
    // console.log(payload);
    const getUser = firebase.auth().currentUser;
    console.log(getUser);
    // if (!getUser.displayName) {
    //   context.dispatch('signInAnonymously');
    //   return;
    // }
    // context.commit('setUser', payload.displayName);
    const db = firebase.firestore();
    db.collection('users')
      .onSnapshot((querySnapshot) => {
        const allLoginUsers = [];
        querySnapshot.forEach((doc) => {
          allLoginUsers.push({
            displayName: doc.data().displayName
          })
          console.log(doc.data().displayName)
          const otherLoginUsers = allLoginUsers.filter((otherUsers) => {
            return otherUsers.displayName != getUser.displayName;
          })
          const currentLoginUser = allLoginUsers.filter((currentUser) => {
            return currentUser.displayName === getUser.displayName;
          })
          context.commit('setCurrentUser', currentLoginUser);
          context.commit('setLoginUsers', otherLoginUsers);
        })
      })
  },
  logOutAction({commit}) {
    firebase.auth().signOut()
      .then(() => {
        console.log('logout!!');
        commit('setUser', null);
        this.$router.push('/auth/logout');
      })
  }
}
