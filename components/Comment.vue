<template>
  <div>
    <v-text-field
      label="コメントを入力"
      hide-details="auto"
      v-model="reply"
    ></v-text-field>
    <v-btn class="ma-4" @click.stop="addComment">コメントを送信</v-btn>
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
    };
  },
  async mounted() {
    const db = firebase.firestore();
    console.log(this.article.id);
    this.commentRef = db
      .collection("posts")
      .doc(this.article.id)
      .collection("comments");

    this.getComment();
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
      console.log(this.commentRef.doc(this.$route.params.uid));
      console.log(this.commentRef.doc());
      this.replyComments.unshift({
        commnet: this.reply,
      });
      this.alertPost = true;
      setTimeout(() => {
        this.alertPost = false;
      }, 3000);
      this.reply = "";
    },
    // getComment() {
    //   this.$store.dispatch("project/getComment", {
    //     displayName: this.currentUser[0].displayName,
    //   });
    // },
    getComment() {
      // const getPosts = () => {
      //空の配列postsを準備します
      let posts = [];
      //firebaseお決まりのメソッドでコレクションからデータを取ってきます
      //ここでのポイントは「doc()がいらないこと」です
      console.log("aa");
      this.commentRef.onSnapshot((querySnapshot) => {
        //getしたデータに対し、
        // .then((snapshot) => {
        //docsプロパティ(※)を指定しforEachで各データを取り出します。
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const data = doc.data();
          //準備しておいた配列に取り出したデータをpushします
          posts.push({
            id: doc.id,
            comment: doc.data().comment,
          });
          console.log(posts);
          return (this.replyComments = posts);
        });

        // });
      });
    },
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
