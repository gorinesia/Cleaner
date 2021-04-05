<template>
  <v-app>
    <v-container>
      <h2 style="color: #00acc1" class="my-5">プロジェクト</h2>
      <v-alert
        dense
        text
        type="success"
        :value="alertPost"
        style="position: fixed; z-index: 1; right: 200px; bottom: 100px"
        >プロジェクトの様子を投稿しました</v-alert
      >

      <v-row justify="center" v-if="loggedIn">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="position: fixed; z-index: 1; right: 20%; bottom: 5%"
              fab
              large
              color="cyan darken-1"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">プロジェクトの様子を投稿する</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <label class="postImage-appendBtn"></label>
                <input
                  type="file"
                  id="btnUpload"
                  @change="btnUploadChange"
                  value="アップロード"
                  data-label="画像の添付"
                /><br />
                <v-img :src="image" width="100" height="100"></v-img>
                <label>ゴミの量</label>
                <v-text-field
                  v-model="name"
                  class="white"
                  placeholder="例) 5kg"
                ></v-text-field>
                <label>日時</label>
                <v-text-field v-model="date" class="white" placeholder="">{{
                  date
                }}</v-text-field>
                <label>場所</label>
                <v-text-field
                  v-model="place"
                  class="white"
                  placeholder="例) 東京"
                ></v-text-field>
                <label>コメント</label>
                <v-textarea
                  v-model="comment"
                  class="white"
                  placeholder="例) 今日もたくさん拾いました。"
                ></v-textarea>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                @click="addMessage"
                class="ma-3 float-right font-weight-bold"
                color="cyan"
                dark
                >投稿</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row class="article">
        <v-col>
          <ProjectArticleCopy
            v-for="article in articles"
            :key="article.id"
            :id="article.id"
            :article="article"
            :articles="articles"
            @click="getComponentsId(article.id)"
          >
          </ProjectArticleCopy>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";
import ProjectArticleCopy from "~/components/ProjectArticleCopy.vue";

export default {
  name: "project",
  layout: "loggedIn",
  scrollToTop: true,
  components: {
    ProjectArticleCopy,
  },
  data() {
    return {
      user: this.$store.state.user.user,
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      time: this.$store.state.project.time,
      date: new Date().toLocaleString(),
      comment: this.$store.state.project.comment,
      imageOverlay: false,
      dialog: false,
      address: "",
      map: "",
      applyFlag: false,
      loginUser: null,
      alertPost: false,
      posts: [],
      id: "",
      lists: "",
      article: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    uid() {
      return this.$store.getters["user/uid"];
    },
    currentUser() {
      return this.$store.getters["user/currentUser"];
    },
    articles() {
      return this.$store.getters["project/articles"];
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
  },
  mounted() {
    console.log("window");
    window.scrollTo(0, 1000);
    this.$store.dispatch("project/getMessage");
    const db = firebase.firestore();
    const docRef = db.collection("posts").where("id", "==", true);
  },
  methods: {
    showImage() {
      this.imageOverlay = true;
    },
    closeModalForImage() {
      this.imageOverlay = false;
    },
    btnUploadChange(ev) {
      this.$store.dispatch("project/btnUploadChange", {
        ev,
      });
    },
    getMessage() {
      this.$store.dispatch("project/getMessage", {
        displayName: this.currentUser[0].displayName,
      });
    },
    addMessage() {
      this.$store.dispatch("project/addMessage", {
        uid: this.currentUser[0].uid,
        displayName: this.currentUser[0].displayName,
        displayImage: this.currentUser[0].image,
        name: this.name,
        place: this.place,
        comment: this.comment,
        image: this.image,
        date: this.date,
        beliked: false,
      });
      this.alertPost = true;
      setTimeout(() => {
        this.alertPost = false;
      }, 3000);
      this.name = "";
      this.place = "";
      this.comment = "";
      this.date = "";
      this.dialog = false;
    },
    async getEvent(docRef) {
      await docRef.get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          this.posts = doc.data();
          const posts = this.posts;
          this.likeSum = this.posts.uid.length;
          this.applyFlag = this.posts.uid.includes(this.loginUser.uid);
        } else {
          console.log(doc.data());
        }
      });
    },
    async applyEvent(id) {
      const db = firebase.firestore();
      const docRef = await db.collection("posts").doc(id);
      docRef.set(
        {
          uid: this.currentUser[0].uid,
        },
        { merge: true }
      );
      await this.getEvent(docRef);
      this.applyEvent = true;
    },
    async cancelEvent(id) {
      const db = firebase.firestore();
      const docRef = await db.collection("posts").doc(id);
      docRef.delete();
      await this.getEvent(docRef);
      this.applyEvent = false;
    },
    async getComponentsId(id) {
      console.log(id);
      await this.$store.dispatch("project/getComponentsProject", {
        id,
      });
    },
  },
};
</script>

<style scoped>
.v-sheet.v-card:hover {
  background: #000;
}

.sidebar {
  background: red;
}
</style>
