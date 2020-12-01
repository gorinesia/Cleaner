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
  getMessage({commit}) {
    const db = firebase.firestore();
    db.collection('projects')
      .orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
      //   console.log(doc.data())
      // })
      // // .get()
      // .then((querySnapshot) => {
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
          })
        })
        commit('setArticles', articles);
    })
  },
  addMessage(context, payload) {
    const db = firebase.firestore();
    db.collection('projects')
      .add(payload)
      .then(() => {
        console.log(payload);
        context.commit('resetImage', null);
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
    const getUser = firebase.auth().currentUser
    console.log(getUser.uid);
    console.log(getUser.displayName);
    console.log(payload.uid);
    console.log(payload.displayName);
    console.log(payload.displayImage);
    const db = firebase.firestore();
    db.collection('projects')
      // .where('displayName', '==', 'payload.displayName')
      // .get()
      // .then((snapshot) => {
      //   snapshot.forEach((doc) => {
      //     console.log(doc.data());
      //   })
      // })
      .doc(payload.uid)
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
    const db = firebase.firestore();
    const personalDetails = [];
    db.collection('projects')
      .doc(payload.id)
      .get()
      .then((doc) => {
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
          this.$router.push('/personal/personalproject');
          commit('setPersonalProject', personalDetails);
      })
  }
}
