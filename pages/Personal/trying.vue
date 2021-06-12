<template>
  <v-app>
    <div>
      <ProjectArticleCopy :article="personalComponent[0]"> </ProjectArticleCopy>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import ProjectArticleCopy from "~/components/ProjectArticleCopy.vue";

export default {
  name: "personalProject",
  layout: "loggedIn",
  components: {
    ProjectArticleCopy,
  },
  data() {
    return {
      messages: [],
      messageComment: "",
      comments: [],
      comment: "",
      items: [
        { title: "投稿を編集", icon: "mdi-pencil-plus" },
        { title: "投稿を削除", icon: "mdi-trash-can" },
      ],
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      time: new Date().toLocaleString(),
      dialog: false,
      alertEdit: false,
      alertDelete: false,
      applyUsers: [],
      applyFlag: false,
      loginUser: null,
      likeSum: 0,
      images: [],
      image_users: [],
      name_users: [],
      error: "",
      stripe: null,
      card: null,
      dialog: false,
      payDialog: false,
      posts: "",
      id: "",
      article: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    articles() {
      return this.$store.getters["project/articles"];
    },
    currentUser() {
      return this.$store.getters["user/currentUser"];
    },
    image: {
      get() {
        return this.$store.getters["project/image"];
      },
      set(value) {
        this.$store.commit("project/setImage", value);
      },
    },
    personalProject() {
      return this.$store.getters["project/personalProject"];
    },
    personalComponent() {
      return this.$store.getters["project/personalComponent"];
    },
    deleteOverlay() {
      return this.$store.getters["project/deleteOverlay"];
    },
    articleId() {
      return this.$store.getters["project/articleId"];
    },
    editOverlay() {
      return this.$store.getters["project/editOverlay"];
    },
  },
  mounted() {
    this.$store.dispatch("project/getMessage");
  },
  methods: {
    btnUploadChange(ev) {
      this.$store.dispatch("project/btnUploadChange", {
        ev,
      });
    },
    getComment(id) {
      const db = firebase.firestore();
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("date", "asc")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.comments.push({
              displayName: doc.data().displayName,
              comment: doc.data().comment,
              image: doc.data().image,
              date: doc.data().date,
            });
            console.log(doc.data());
            console.log(doc.id);
          });
        });
    },
    addComment(id) {
      const db = firebase.firestore();
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .add({
          displayName: this.currentUser[0].displayName,
          comment: this.comment,
          image: this.currentUser[0].image,
          date: new Date().toLocaleString(),
        })
        .then(() => {
          console.log(this.comment);
          this.displayName = "";
          this.comment = "";
          this.image = "";
          this.date = "";
          this.getComment(id);
        });
    },
    getMessage() {
      this.$store.dispatch("project/getMessage", {
        displayName: this.currentUser[0].displayName,
      });
    },
    addMessage() {
      this.$store.dispatch("project/addMessage", {
        displayName: this.currentUser[0].displayName,
        displayImage: this.currentUser[0].image,
        name: this.name,
        place: this.place,
        comment: this.comment,
        image: this.image,
        date: new Date().toLocaleString(),
      });
      this.name = "";
      this.place = "";
      this.comment = "";
      this.date = "";
    },
    openModalForDelete(id) {
      this.$store.commit("project/openModalForDelete", {
        id,
      });
    },
    closeModalForDelete() {
      this.$store.commit("project/closeModalForDelete");
    },
    deleteArticles(id) {
      console.log(id);
      this.$store.dispatch("project/deleteArticles", {
        id,
      });
    },
    openModalForEdit(id) {
      this.$store.commit("project/openModalForEdit", {
        id,
      });
    },
    closeModalForEdit() {
      this.$store.commit("project/closeModalForEdit");
    },
    editArticles(id) {
      this.$store.dispatch("project/editArticles", {
        id,
        name: this.name,
        place: this.place,
        comment: this.comment,
        image: this.image,
      });
      this.alertEdit = true;
      setTimeout(() => {
        this.alertEdit = false;
      }, 3000);
      this.name = "";
      this.place = "";
      this.comment = "";
      this.image = "";
    },
    getEvent(docRef) {
      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          this.posts = doc.data();
          this.likeSum = this.posts.like_users.length;
          this.images = [...this.posts.image_users];
          this.nameUser = [...this.posts.name_users];
          this.applyFlag = this.posts.like_users.includes(this.loginUser.uid);
        } else {
          console.log(doc.data());
        }
      });
    },
    async applyEvent() {
      const db = firebase.firestore();
      const docRef = await db
        .collection("posts")
        .doc(this.personalProject[0].id);
      docRef.set(
        {
          displayImage: this.currentUser[0].image,
          like_users: firebase.firestore.FieldValue.arrayUnion(
            this.loginUser.uid
          ),
          image_users: firebase.firestore.FieldValue.arrayUnion(
            this.currentUser[0].image
          ),
          name_users: firebase.firestore.FieldValue.arrayUnion(
            this.loginUser.displayName
          ),
        },
        { merge: true }
      );
      await this.getEvent(docRef);
      this.applyFlag = true;
    },
    async cancelEvent() {
      const db = firebase.firestore();
      const docRef = await db
        .collection("posts")
        .doc(this.personalProject[0].id);
      docRef.update({
        like_users: firebase.firestore.FieldValue.arrayRemove(
          this.loginUser.uid
        ),
        image_users: firebase.firestore.FieldValue.arrayRemove(
          this.currentUser[0].image
        ),
        name_users: firebase.firestore.FieldValue.arrayRemove(
          this.loginUser.displayName
        ),
      });
      await this.getEvent(docRef);
      this.applyFlag = false;
    },
  },
};
</script>

<style scoped>
.profile {
  margin-left: 20px;
}

.display-name {
  color: #00acc1;
}
.comment {
  margin: 3px auto 0;
}
</style>
