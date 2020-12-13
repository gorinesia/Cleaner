import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import firebase, { auth, firestore, storage } from '~/plugins/firebase.js'

export const state = () => ({
  user: null,
  loggedIn: false,
  uid: '',
  allUsers: [],
  currentUser: [],
  loginUsers: [],
  image: null,
  personalDatas: [],
})

export const getters = {
  loggedIn: state => state.loggedIn,
  uid: state => state.uid,
  // allUsers: state => state.allUsers,
  currentUser: state => state.currentUser,
  loginUsers: state => state.loginUsers,
  image: state => state.image,
  personalDatas: state => state.personalDatas,
}

export const mutations = {
  setLoggedIn:(state, payload) => {
    state.loggedIn = payload;
  },
  setUser:(state, currentUser) => {
    state.user = currentUser
  },
  setUserUid:(state, uid) => {
    state.uid = uid;
  },
  // setAllUsers: (state, allLoggedInUsers) => {
  //   state.allUsers = allLoggedInUsers;
  // },
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
  },
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
        console.log(result.user.uid);
        const uid = result.user.uid;
        console.log('loggedIn!!');
        commit('setLoggedIn', true);
        commit('setUserUid', uid);
        this.$router.push('/mypage')
      })
      .catch((error) => {
        console.log(error.message);
      })
  },
  // openTheApplication({commit}) {
  //   const db = firebase.firestore();
  //   db.collection('users')
  //     .onSnapshot((querySnapshot) => {
  //       const allLogUsers = [];
  //       querySnapshot.forEach((doc) => {
  //         allLogUsers.push({
  //           displayName: doc.data().displayName
  //         })
  //         console.log(doc.data().displayName)
  //         const allLoggedInUsers = allLogUsers.filter(() => {
  //           return  doc.data().displayName
  //         })
  //         commit('setAllUsers', allLoggedInUsers);
  //       })
  //     })
  // },
  logInUserDisplay(context, uid) {
    console.log(uid);
    const getUser = firebase.auth().currentUser;
    // console.log(getUser.uid);
    const db = firebase.firestore();
    db.collection('users')
      .onSnapshot((querySnapshot) => {
        const allLoginUsers = [];
        querySnapshot.forEach((doc) => {
          allLoginUsers.push({
            uid: uid,
            displayName: doc.data().displayName,
            email: doc.data().email,
            comment: doc.data().comment,
            image: doc.data().image,
            id: doc.id
          })
          // console.log(doc.data().displayName);
          // console.log(doc.id);
          // console.log(doc.data());
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
        commit('setLoggedIn', false);
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
    // const user = firebase.auth().currentUser;
    // user.updateProfile({
    //   uid: payload.uid,
    //   displayName: payload.displayName,
    //   displayImage: payload.image,
    // })
    const db = firebase.firestore();
    db.collection('users')
      .doc(payload.uid)
      .update({
        displayName: payload.displayName,
        place: payload.place,
        comment: payload.comment,
        image: payload.image,
      })
      .then(() => {
        console.log(payload);
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
