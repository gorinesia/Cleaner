import firebase from 'firebase';

export const actions = {
  addStarCount({ getters ,commit }, postId){
    if(getters.uid){
      firebase.firestore().collection("posts").where('post_id', '==', postId).get().then(doc => {
        var data = doc.docs[0].id;

        firebase.firestore().collection("posts").doc(data).update({
          starCount: firebase.firestore.FieldValue.increment(1)
        })

      })
      firebase.firestore().collection(`users/${getters.uid}/starCount`).doc("starCount").update({
        star_post_id: firebase.firestore.FieldValue.arrayUnion(postId)
      })
      commit('addStarCount')
    }

  },
  deleteStarCount({ getters, commit }, postId){
    if(getters.uid){
      firebase.firestore().collection("posts").where('post_id', '==', postId).get().then(doc => {
        var data = doc.docs[0].id;

        firebase.firestore().collection("posts").doc(data).update({
          starCount: firebase.firestore.FieldValue.increment(-1)
        })

      })
      firebase.firestore().collection(`users/${getters.uid}/starCount`).doc("starCount").update({
        star_post_id: firebase.firestore.FieldValue.arrayRemove(postId)
      })
      commit('deleteStarCount')
    }
  },
}
