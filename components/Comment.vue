<template>
  <div>
    <div v-if="loggedIn">
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
        :rules="rules"
        hide-details="auto"
      ></v-text-field>
      <!-- <v-col cols="12" md="5">
            <span class="user--name">{{ article.displayName }}</span>
            <span class="user--place">{{ article.place }}</span>
            <p class="my-2 font-weight-bold">{{ article.comment }}</p>
          </v-col> -->
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
      applyFlag: false,
      beLiked: false,
      likeCount: 0,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
    };
  },
  mounted() {},
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
  },
  methods: {
    async like() {
      await this.likeRef.doc(this.currentUser[0].uid).set({
        uid: this.currentUser[0].uid,
      });
      this.beLiked = true;
    },
    async unlike() {
      await this.likeRef.doc(this.currentUser[0].uid).delete();
      this.beLiked = false;
    },
    async checkLikeStatus() {
      // const doc = await this.likeRef.doc(this.currentUser[0].uid).get();
      const doc = await this.likeRef;
      this.beLiked = doc.exists;
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
