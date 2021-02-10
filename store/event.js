import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
// import firebase, { firestore, storage } from '~/plugins/firebase.js'


export const state = () => ({
  name: '',
  place: '',
  time: '',
  image: null,
  date: '',
  events: [],
  articleId: '',
  comment: '',
  deleteOverlay: false,
  editOverlay: false,
  personalEvent: []
})

export const getters = {
  events: state => state.events,
  image: state => state.image,
  deleteOverlay: state => state.deleteOverlay,
  articleId: state => state.articleId,
  editOverlay: state => state.editOverlay,
  personalEvent: state=> state.personalEvent
}

export const mutations = {
  setEvents: (state, events) => {
    state.events = events;
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
  setPersonalEvent: (state, personalDetails) => {
    state.personalEvent = personalDetails
    console.log(state.personalEvent);
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
  getEvent({commit}) {
    const db = firebase.firestore();
    db.collection('events')
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({
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
        commit('setEvents', events);
    })
  },
  addEvent(context, payload) {
    const db = firebase.firestore();
    db.collection('events')
      .add(payload)
      .then(() => {
        console.log(payload);
        context.commit('resetImage', null);
        context.dispatch('getEvent');
      })
  },
  deleteArticles(context, payload) {
    const db = firebase.firestore();
    db.collection('events')
      .doc(payload.id)
      .delete()
      .then(() => {
        console.log('deleted!!');
        context.dispatch('getEvent');
      })
  },
  editArticles(context, payload) {
    const db = firebase.firestore();
    db.collection('events')
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
        context.dispatch('getEvent');
      })
  },
  getPersonalEvent({commit}, payload) {
    const db = firebase.firestore();
    const personalDetails = [];
    db.collection('events')
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
          this.$router.push('/personal/personalevent');
          commit('setPersonalEvent', personalDetails);
      })
  }
}
