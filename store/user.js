import firebase from 'firebase';

export const state = () => ({
  user: null,
  loggedIn: false,
  allUsers: [],
  currentUser: [],
  loginUsers: [],
  image: null,
  personalDatas: []
})

export const getters = {
  allUsers: state => state.allUsers,
  currentUser: state => state.currentUser,
  loginUsers: state => state.loginUsers,
  image: state => state.image,
  personalDatas: state => state.personalDatas,
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
  },
  setImage: (state, url) => {
    state.image = url;
  },
  setPersonalDatas: (state, personalDetails) => {
    state.personalDatas = personalDetails
    console.log(state.personalDatas);
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
            displayName: doc.data().displayName,
            email: doc.data().email,
            image: doc.data().image,
            id: doc.id
          })
          console.log(doc.data().displayName);
          console.log(doc.id);
          const otherLoginUsers = allLoginUsers.filter((otherUsers) => {
            return otherUsers.email != getUser.email;
          })
          const currentLoginUser = allLoginUsers.filter((currentUser) => {
            return currentUser.email === getUser.email;
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
  },
  btnUploadChange(context, payload) {
    const file = payload.ev.target.files[0];
    const storage = firebase.storage();
    const storageRef = storage.ref('profileImages');
    const uploadRef = storageRef.child(file.name);
    uploadRef.put(file)
      .then((snapshot) => {
        context.dispatch('getUrl', payload);
      })
      .catch((error) => {
        console.log(error);
      })
  },
  getUrl({commit}, payload) {
    const file = payload.ev.target.files[0];
    const storage = firebase.storage();
    const storageRef = storage.ref('profileImages');
    const uploadRef = storageRef.child(file.name);
    uploadRef.getDownloadURL()
      .then((url) => {
        commit('setImage', url);
      })
  },
  getProfile({dispatch}) {
    const db = firebase.firestore();
    db.collection('user')
      .get()
      .then((querySnapshot) => {
        const allLoginUsers = [];
        querySnapshot.forEach((doc) => {
          allLoginUsers.push({
            displayName: doc.data().displayName,
            place: doc.data().place,
            messageComment: doc.data().comment,
            image: doc.data().image,
            id: doc.id,
            date: doc.data().date,
          })
        })
        dispatch('logInUserDisplay');
    })
  },
  updateProfile(context, payload) {
    const db = firebase.firestore();
    db.collection('users')
      .doc(payload.id)
      .update({
        displayName: payload.displayName,
        place: payload.place,
        comment: payload.comment,
        image: payload.image,
      })
      .then(() => {
        console.log(payload);
        // context.commit('resetImage', null);
        context.dispatch('logInUserDisplay');
      })
  },
  getProfile({commit}, payload) {
    const db = firebase.firestore();
    const personalDetails = [];
    db.collection('users')
      .doc(payload.id)
      .get()
      .then((doc) => {
        personalDetails.push({
          displayName: doc.data().displayName,
          place: doc.data().place,
          comment: doc.data().comment,
          image: doc.data().image,
          id: doc.id,
        })
          console.log(doc.data())
          commit('setPersonalDatas', personalDetails);
      })
  }
}
