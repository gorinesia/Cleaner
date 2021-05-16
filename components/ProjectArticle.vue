<template>
  <div>
    <v-divider />
    <v-hover v-slot="{ hover }">
      <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
        <div class="grid--container">
          <div class="item--a">
            <div class="main--image"><img :src="article.image" /></div>
          </div>
          <div class="item--b">
            <div class="user--avatar"><img :src="article.displayImage" /></div>
          </div>
          <div class="item--c">
            <span class="user--name">{{ article.displayName }}</span>
            <span class="user--place">{{ article.place }}</span>
            <span class="grey--text float-right user--date"
              ><v-icon>mdi-scale</v-icon>{{ article.amount }}・{{ date }}</span
            >
          </div>
          <div class="item--d">
            <p class="my-2 user--comment">{{ article.comment }}</p>
          </div>
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
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "~/plugins/firebase";
import moment from "moment-timezone";
import "moment/locale/ja";

export default {
  props: ["article"],
  data() {
    return {
      dialog: false,
      applyFlag: false,
      beLiked: false,
      likeCount: 0,
      date: "",
    };
  },
  async mounted() {
    const db = firebase.firestore();
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
    newDate: {
      get() {
        return this.$store.getters["project/newDate"];
      },
      set(value) {
        this.$store.commit("project/setNewDate", value);
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
      await this.$store.dispatch("project/getPersonalProject", {
        id,
      });
    },
    async checkTimestamp() {
      const date = await this.$store.dispatch("project/checkTimestamp");
      this.date = date;
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  margin: 6px;
}
.col,
.col-2 {
  padding-right: -12px;
}
.grid--container {
  display: grid;
  grid-template-columns: 100px 80px 1fr;
  grid-template-rows: 30px 50px 1fr;
  grid-column-gap: 10px;
  grid-template-areas:
    "item--a item--b item--c"
    "item--a item--b item--d"
    "item--a item--e item--e";
}
.item--a {
  // background: purple;
  grid-area: item--a;
}
.item--b {
  // background: rgb(185, 185, 152);
  grid-area: item--b;
  .user--avatar {
    margin-left: 10px;
  }
}
.item--c {
  // background: turquoise;
  grid-area: item--c;
}
.item--d {
  // background: skyblue;
  grid-area: item--d;
}
.item--e {
  // background: #333;
  display: inline;
  grid-area: item--e;
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
  .grid--container {
    display: grid;
    grid-template-columns: 50px 25px 1fr;
    grid-template-rows: 15px 25px 1fr;
    grid-column-gap: 5px;
    grid-template-areas:
      "item--a item--b item--c"
      "item--a item--b item--d"
      "item--a item--e item--e";
  }
  .item--a {
    // background: purple;
    grid-area: item--a;
  }
  .item--b {
    // background: rgb(185, 185, 152);
    grid-area: item--b;
  }
  .item--c {
    // background: turquoise;
    grid-area: item--c;
  }
  .item--d {
    // background: skyblue;
    grid-area: item--d;
  }
  .item--e {
    // background: #333;
    display: inline;
    grid-area: item--e;
  }
  .main--image {
    margin-left: 0;
  }
  .main--image img {
    width: 50px;
    height: 50px;
  }
  .user--name {
    font-size: 0.8em;
  }
  .user--avatar img {
    width: 25px;
    height: 25px;
  }
  .user--place {
    display: none;
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
  .col,
  .col-1,
  .col-2,
  .col-3,
  .col-4,
  .col-5 {
    padding: 0;
  }
}
</style>
