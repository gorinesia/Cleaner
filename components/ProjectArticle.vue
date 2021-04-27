<template>
  <div>
    <v-divider />
    <v-hover v-slot="{ hover }">
      <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
        <div class="grid--container">
          <div class="item--a">
            <!-- <v-avatar class="avatar"> -->
              <div class="main--image"><img :src="article.image"></div>
            <!-- </v-avatar> -->
          </div>
          <div class="item--b">
            <!-- <v-avatar class="profile" color="grey" size="60"> -->
              <div class="user--avatar"><img :src="article.displayImage" ></div>
            <!-- </v-avatar> -->
          </div>
          <div class="item--c">
            <span class="user--name">{{ article.displayName }}</span>
            <span class="user--place">{{ article.place }}</span>
            <span class="grey--text float-right user--date"
              ><v-icon>mdi-scale</v-icon>{{ article.name }}・{{
                article.date
              }}</span
            >
            <div class="item--e">
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
            </div>
          </div>
          <div class="item--d">
            <p class="my-2 user--comment">{{ article.comment }}</p>
          </div>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "~/plugins/firebase";

export default {
  props: ["article"],
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
    console.log("hoge");
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
      const doc = await this.likeRef.doc(this.currentUser[0].uid).get();
      this.beLiked = doc.exists;
    },
    async getPersonalId(id) {
      console.log(id);
      await this.$store.dispatch("project/getPersonalProject", {
        id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  margin: 6px;
}
.col, .col-2 {
  padding-right: -12px;
}
.grid--container {
  display: grid;
  grid-template-columns: 100px 50px 1fr;
  grid-template-rows: 100px 50px 1fr;
}
.item--a {
  background: purple;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}
.item--b {
  background: yellow;
  grid-row: 1 / 2 ;
  grid-column: 2 / 3;
}
.item--c {
  background: turquoise;
  grid-row: 1 / 2;
  grid-column: 3 / 4;
}
.item--d {
  background: skyblue;
  grid-row: 2 / 3;
  grid-column: 3 / 4;
}
.item--e {
  background: #333;
  display: inline;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}
.main--image {
  margin-left: 10px;
}
.main--image img {
  width: 100px;
  height: 100px;
}
.user--avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.user--name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #00acc1;
  margin-bottom: 3px;
}
.user--place {
  margin: 2px 0px;
  margin-left: 5px;
  color: #757575;
}
.user--comment {
  font-weight: bold;
}
.v-sheet.v-card:hover {
  transition: 0.3s;
  opacity: 0.8;
}
@media (max-width: 650px) {
  .v-application .ml-5 {
    margin-left: 5px !important;
  }
  .user--name {
    font-size: 0.8em;
  }
  .user--place {
    font-size: 0.8em;
  }
  .user--date {
    font-size: 0.8em;
    margin-right: 0;
  }
  .v-icon {
    font-size: 12px;
  }
  .v-avatar .v-image[data-v-6862af38] {
    height: 60px;
    min-width: 60px;
    width: 60px;
    ::v-deep .v-image__image--cover {
      background-size: contain;
    }
  }
  .col, .col-1, .col-2, .col-3, .col-4, .col-5 {
    padding: 0;
  }
}
</style>
