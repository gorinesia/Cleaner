import firebase from 'firebase';

export const state = () => ({
  name: '',
  place: '',
  image: null,
  date: '',
  messages: [],
  articleId: '',
  messageComment: '',
  deleteOverlay: false,
  editOverlay: false
})

export const getters = {
  messages: state => state.messages,
  image: state => state.image,
  deleteOverlay: state => state.deleteOverlay,
  articleId: state => state.articleId,
  editOverlay: state => state.editOverlay
}

export const mutations = {
  setMessages: (state, messages) => {
    state.messages = messages;
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
      .get()
      .then((querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({
            name: doc.data().name,
            place: doc.data().place,
            messageComment: doc.data().comment,
            image: doc.data().image,
            id: doc.id,
            date: doc.data().date,
          })
        })
        commit('setMessages', messages);
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
        context.dispatch('getMessage');
      })
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
}
