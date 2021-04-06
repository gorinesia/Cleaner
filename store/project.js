import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'
// import firebase, { firestore, storage } from '~/plugins/firebase.js'



export const state = () => ({
  name: '',
  place: '',
  image: null,
  date: '',
  articles: [],
  articleId: '',
  comment: '',
  deleteOverlay: false,
  editOverlay: false,
  personalProject: []
})

export const getters = {
  articles: state => state.articles,
  image: state => state.image,
  deleteOverlay: state => state.deleteOverlay,
  articleId: state => state.articleId,
  editOverlay: state => state.editOverlay,
  personalProject: state=> state.personalProject
}

export const mutations = {
  setArticles: (state, articles) => {
    state.articles = articles;
  },
  setImage: (state, url) => {
    state.image = url;
  },
  resetImage: (state) => {
    state.image = null;
  },
  openModalForDelete: (state, payload) => {
    state.deleteOverlay = true;
    state.articleId = payload.id;
  },
  closeModalForDelete: (state) => {
    state.deleteOverlay = false;
  },
  openModalForEdit: (state, payload) => {
    state.editOverlay = true;
    state.articleId = payload.id;
  },
  closeModalForEdit: (state) => {
    state.editOverlay = false;
  },
  setPersonalProject: (state, personalDetails) => {
    state.personalProject = personalDetails
    console.log(state.personalProject);
  }
}

export const actions = {
  btnUploadChange(context, payload) {
    const file = payload.ev.target.files[0];
    const storage = firebase.storage();
    const storageRef = storage.ref('images');
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
    const storageRef = storage.ref('images');
    const uploadRef = storageRef.child(file.name);
    uploadRef.getDownloadURL()
      .then((url) => {
        commit('setImage', url);
      })
  },
  getMessage({commit}, payload) {
    const db = firebase.firestore();
    db.collection('projects')
      .orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
          articles.push({
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            displayImage: doc.data().displayImage,
            name: doc.data().name,
            place: doc.data().place,
            comment: doc.data().comment,
            image: doc.data().image,
            id: doc.id,
            date: doc.data().date,
            beLiked: doc.data().beLiked
          })
        })
        commit('setArticles', articles);
    })
  },
  getUserProfile(context, payload) {
    console.log(payload);
    const db = firebase.firestore();
    const getUser = firebase.auth().currentUser;
    console.log(getUser.uid);
    // db.collection('projects')
    //   .onSnapshot((querySnapshot) => {
    //     const allProjects = [];
    //     querySnapshot.forEach((doc) => {
    //       allProjects.push({
    //         displayName: doc.data().displayName,
    //         uid: payload.uid
    //       })
    //     })
    db.collection('projects')
      .where('uid', '==', payload.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          const nameData = doc;
          context.dispatch('changeNameArticle', {
            nameData: doc,
            changeName: payload})
        })
      })
  },
  changeNameArticle(context, payload) {
    console.log(payload)
    console.log(payload.nameData.id);
    console.log(payload.changeName.displayName);
    const db = firebase.firestore();
    db.collection('projects')
      .doc(payload.nameData.id)
      .update({
        displayName: payload.changeName.displayName,
        displayImage: payload.changeName.image,
      })
  },
  addMessage(context, payload) {
    const db = firebase.firestore();
    db.collection('projects')
      .add(payload)
      .then(() => {
        console.log(payload);
        // context.commit('resetImage', null);
        context.dispatch('getMessage');
      })
  },
  deleteArticles(context, payload) {
    const db = firebase.firestore();
    db.collection('projects')
      .doc(payload.id)
      .delete()
      .then(() => {
        console.log('deleted!!');
        this.$router.push('/list/project');
        context.dispatch('getMessage');
        this.alertDelete = true;
        setTimeout(() => {
          this.alertDelete = false
        }, 3000);
        });
        context.commit('closeModalForDelete');
  },
  editArticles(context, payload) {
    const db = firebase.firestore();
    db.collection('projects')
      .doc(payload.id)
      .update({
        name: payload.name,
        place: payload.place,
        comment: payload.comment,
        image: payload.image,
      })
      .then(() => {
        console.log('updated!!');
        context.commit('resetImage', null);
        context.dispatch('getMessage');
      })
  },
  updateProject(context, payload) {
    const db = firebase.firestore();
    db.collection('projects')
      .doc(payload.id)
      .set({
        displayName: payload.displayName,
        displayImage: payload.displayImage,
      }, {merge: true})
      .then(() => {
        console.log('updatedProject!!');
        context.dispatch('getMessage');
      })
  },
  getPersonalProject({commit}, payload) {
    console.log(payload);
    const db = firebase.firestore();
    const personalDetails = [];
    db.collection('projects')
      .doc(payload.id)
      .get()
      .then((doc) => {
        console.log(payload.id);
        console.log(doc.data());
        personalDetails.push({
          displayName: doc.data().displayName,
          displayImage: doc.data().displayImage,
          name: doc.data().name,
          place: doc.data().place,
          comment: doc.data().comment,
          image: doc.data().image,
          id: doc.id,
          date: doc.data().date,
        })
          console.log(doc.data())
          commit('setPersonalProject', personalDetails);
          this.$router.push('/personal/personalproject');
      })
  },
  getComponentsProject({commit}, payload) {
    console.log(payload);
    // const db = firebase.firestore();
    // const personalDetails = [];
    // db.collection('projects')
    //   .doc(payload.id)
    //   .get()
    //   .then((doc) => {
    //     console.log(payload.id);
    //     console.log(doc.data());
    //     personalDetails.push({
    //       displayName: doc.data().displayName,
    //       displayImage: doc.data().displayImage,
    //       name: doc.data().name,
    //       place: doc.data().place,
    //       comment: doc.data().comment,
    //       image: doc.data().image,
    //       id: doc.id,
    //       date: doc.data().date,
    //     })
    //       console.log(doc.data())
    //       commit('setPersonalProject', personalDetails);
          // this.$router.push('/personal/trying');
      // })
  }
}
