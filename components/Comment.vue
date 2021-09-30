<template>
  <div>
    <!-- <div v-if="loggedIn"> -->
    <!-- <v-icon
        v-if="beLiked"
        :id="article.id"
        @click.stop="unlike"
        >mdi-thumb-up</v-icon
      >
      <v-icon v-else color="orange" @click.stop="like" outlined
        >mdi-thumb-up-outline</v-icon
      > -->
    <v-text-field
      label="コメントを入力"
      hide-details="auto"
      v-model="reply"
    ></v-text-field>
    <v-btn @click.stop="addComment">コメントを送信</v-btn>
    <!-- <v-col cols="12" md="5">
            <span class="user--name">{{ article.displayName }}</span>
            <span class="user--place">{{ article.place }}</span>
            <p class="my-2 font-weight-bold">{{ article.comment }}</p>
          </v-col> -->
    <!-- </div> -->
    <div v-for="replyComment in replyComments" :key="replyComment.id">
      <p>{{ replyComment }}</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "~/plugins/firebase";

export default {
  props: ["article", "articles", "id"],
  data() {
    return {
      dialog: false,
      likeCount: 0,
      alertPost: false,
      reply: "",
      replyComments: [],
      // personalComments: this.$store.state.project.personalComments,
      // rules: [
      //   (value) => !!value || "Required.",
      //   (value) => (value && value.length >= 3) || "Min 3 characters",
      // ],
    };
  },
  async mounted() {
    const db = firebase.firestore();
    console.log(this.article.id);
    // console.log(this.personalComponent[0].id);
    this.commentRef = db
      .collection("posts")
      .doc(this.article.id)
      // .doc(this.personalComponent[0].id)
      .collection("comments");
    // this.checkLikeStatus();
    // this.likeRef.onSnapshot((snap) => {
    //   this.likeCount = snap.size;
    // });
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
    personalComponent() {
      return this.$store.getters["project/personalComponent"];
    },
  },
  methods: {
    async addComment() {
      await this.commentRef.add({
        comment: this.reply,
      });
      console.log(this.reply);
      this.replyComments.push({
        commnet: this.reply,
      });
      this.alertPost = true;
      setTimeout(() => {
        this.alertPost = false;
      }, 3000);
      // this.replyComment = this.reply;
      this.reply = "";
    },
    // addComments() {
    //   this.$store.dispatch("project/addComments", {
    //     // await this.commentRef.doc(this.currentUser[0].uid).set({
    //     // uid: this.currentUser[0].uid,
    //     comment: this.reply,
    //     id: this.commentRef
    //   });
    //   console.log(comment);
    //   this.alertPost = true;
    //   setTimeout(() => {
    //     this.alertPost = false;
    //   }, 3000);
    //   this.personalComment = "";
    // },
  },
};
</script>

<style lang="scss" scoped>
.article {
  margin: 6px;
}

.user--name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #00acc1;
  margin-bottom: 3px;
  cursor: pointer;
}

.user--place {
  margin: 2px 0px;
  margin-left: 5px;
  color: #757575;
}

.v-sheet.v-card:hover {
  // background: rgba(0, 172, 193, 0.1);
  transition: 0.3s;
  opacity: 0.8;
}

.sidebar {
  background: red;
}
</style>
