<template>
  <div>
    <v-divider />
    <v-hover v-slot="{ hover }">
      <v-card :class="{ 'on-hover': hover }">
        <v-row>
          <v-col cols="12" md="2">
            <v-avatar tile size="100" class="ml-5">
              <v-img :src="article.image"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="1">
            <v-avatar class="profile" color="grey" size="60">
              <v-img :src="article.displayImage"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="5">
            <span class="user--name">{{ article.displayName }}</span>
            <span class="user--place">{{ article.place }}</span>
            <p class="my-2 font-weight-bold">{{ article.comment }}</p>
            <div v-if="loggedIn">
              <v-icon
                v-if="beLiked"
                color="orange"
                :id="article.id"
                @click.stop="unlike"
                >mdi-thumb-up</v-icon
              >
              <v-icon v-else color="orange" @click.stop="like" outlined
                >mdi-thumb-up-outline</v-icon
              >
              <span>{{ likeCount }}</span>
            </div>
            <div v-else>
              <div>
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="orange"
                      v-if="!applyFlag"
                      class="white--text"
                      v-bind="attrs"
                      v-on="on"
                      medium
                      outlined
                      >mdi-thumb-up-outline</v-icon
                    >
                    <span>{{ likeCount }}</span>
                  </template>
                  <v-card>
                    <v-card-title>Need to Login</v-card-title>
                    <v-card-text
                      >ログインしてCleanerを楽しみませんか？</v-card-text
                    >
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="cyan" outlined rounded to="/auth/login"
                        >ログイン</v-btn
                      >
                      <v-btn
                        color="orange"
                        outlined
                        rounded
                        @click="dialog = false"
                        >閉じる</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <span class="grey--text float-right mr-5"
              ><v-icon>mdi-scale</v-icon>{{ article.name }}・{{
                article.date
              }}</span
            >
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
    <div></div>
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
    };
  },
  async mounted() {
    const db = firebase.firestore();
    console.log(this.article.id);
    this.likeRef = db
      .collection("posts")
      .doc(this.article.id)
      .collection("likes");
    this.checkLikeStatus();

    this.likeRef.onSnapshot((snap) => {
      this.likeCount = snap.size;
    });
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
