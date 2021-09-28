<template>
  <v-app class="main_wrap">
    <div class="main_article">
      <ProjectArticleCopy :article="personalComponent[0]"> </ProjectArticleCopy>
    </div>
    <div class="map_wrap">
      <div>
        <h2>{{ personalComponent[0].address }}</h2>
      </div>
      <section id="map"></section>
    </div>
    <div>
      <div class="pt-20">
        <h2>コメント</h2>
        <v-row justify="center" v-if="loggedIn">
          <Comment />
        </v-row>
        <p>素敵ですね！</p>
      </div>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import ProjectArticleCopy from "~/components/ProjectArticleCopy.vue";
import Comment from "~/components/Comment.vue";

export default {
  name: "personalProject",
  layout: "loggedIn",
  components: {
    ProjectArticleCopy,
    Comment,
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
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
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

    this.showUserLocationOnTheMap(
      this.personalComponent[0].latitude,
      this.personalComponent[0].longitude
    );
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
    showUserLocationOnTheMap(latitude, longitude) {
      // Create a Map object
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      // Add a marker
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },
  },
};
</script>

<style scoped>
#map {
  background-color: #00acc1;
  width: 500px;
  height: 350px;
  margin: 0 auto;
}

.profile {
  margin-left: 20px;
}

.display-name {
  color: #00acc1;
}
.comment {
  margin: 3px auto 0;
}
.main_article {
  margin-top: 50px;
  cursor: pointer;
}
.map_wrap {
  margin-top: 50px;
}
</style>
