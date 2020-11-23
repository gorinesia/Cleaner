<template>
  <v-app class="mx-10" style="color: navy">
    <v-container v-for="personalEvent in personalEvent" :key="personalEvent.id">
      <v-card align="center" class="mb-10">
        <v-row>
          <v-col cols="2">
            <p>{{ personalEvent.date}}</p>
          </v-col>
          <v-col class="font-weight-bold text-h5" cols="6">
            <p>{{ personalEvent.name }}</p>
          </v-col>
          <v-col cols="2">
            <p>日時：{{ personalEvent.date }}</p>
          </v-col>
          <v-col cols="2">
            <p>場所：{{ personalEvent.place }}</p>
          </v-col>
        </v-row>
        <v-img
          height="200"
          :src="personalEvent.image"
        ></v-img>
        <div class="grey--text text--darken-1 font-weight-bold">イベント概要</div>
        <p class="ma-2">{{ personalEvent.comment }}</p>
      </v-card>
      <v-card outlined class="mb-10">
        <v-row  class="fill-height">
          <v-col align-self="start"  cols="2">
            <v-avatar class="profile" color="grey" size="100">
              <v-img :src="personalEvent.image"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="cyan--text text--darken-1 font-weight-bold title text-h4" dark>
                  {{ personalEvent.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">{{ personalEvent.displayName }}さんの発案中のイベント</h2>

      <div>
        <div>
          <v-btn v-if="!applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="applyEvent()">参加</v-btn>
        </div>
        <div>
          <v-btn v-if="applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="cancelEvent()">キャンセル</v-btn>
        </div>
        <span>{{ likeSum }}</span>
        <!-- <span>{{ likeSum }}</span>
        <span>{{ nameUser }}</span> -->
        <!-- <img :src="images" width="50px" height="50px"> -->
      </div>
      <!-- <div>
        <div>
          <v-btn v-if="!applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="applyEvent()"><v-icon color="cyan darken-1">mdi-thumb-up</v-icon></v-btn>
        </div>
        <div>
          <v-btn v-if="applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="cancelEvent()"><v-icon color="cyan darken-1">mdi-thumb-up</v-icon></v-btn>
        </div>
        <span>{{ likeSum }}</span>
        <span>{{ nameUser }}</span>
        <img :src="images" width="50px" height="50px">
      </div> -->

      <div>メンバー</div>
      <v-card>
        <v-row>
          <v-col>
            <v-avatar v-for="image in images" :key="image.id">
              <!-- <img :src="image" :key="imge" width="50px" height="50px" @click="getProfile(personalEvent.id)"> -->
              <v-img :src="image.displayImage" width="50px" height="50px" @click="getProfile(personalEvent.id)"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
      <v-container clss="h-full flex flex-col ml-6">
        <div>コメント</div>
        <v-card class="border border-gray-900 rounded mb-4">
          <v-textarea background-color="grey lighten-2" class="w-full pt-4 pl-8 outline-none" placeholder="XXXXへのメッセージ"></v-textarea>
          <v-btn class="cyan text-sm white--text font-bold py-1 px-2 rouded">送信</v-btn>
        </v-card>
      </v-container>

      <v-card color="#E0F7FA" class="rounded-xl mt-5 pa-5" rounded>
        <h2 class="mx-10">クリーナーを応援しよう</h2>
        <v-row>
          <v-col cols="9">
            <span>{{ personalEvent.displayName }}さんの行動に対してお金を送ってサポートすることができます。</span>
            <v-btn color="#0D47A1" rounded x-large dark>サポートする</v-btn>
          </v-col>
          <v-col cols="3">
            <v-avatar tile size="100" color="cyan" class="mx-5">
              <img :src="personalEvent.image">
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: 'personalEvent',
  data() {
    return {
      applyUsers: [],
      applyFlag: false,
      loginUser: null,
      likeSum: 0,
      images: [],
      nameUser: [],
      name_users: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    personalEvent() {
      return this.$store.getters['event/personalEvent']
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUser = user;
      }
    })
    const db = firebase.firestore();
    const docRef = db.collection('posts').doc(this.personalEvent[0].id);
    this.getEvent(docRef)

  },
  methods: {
    getEvent(docRef) {
      docRef.get().then(doc => {
        if (doc.exists) {
          console.log(doc.data());
          this.posts = doc.data();
          // this.likeSum = this.posts.like_users.length;
          // this.images = this.posts.displayImage;
          this.images.push({
            displayImage: this.posts.displayImage
          })

          // this.images = [...this.posts.image_users];
          // this.nameUser = [...this.posts.name_users];
          // this.applyFlag = this.posts.like_users.includes(this.loginUser.uid);
        } else {
          console.log(doc.data());
        }
      })
    },
    applyEvent() {
        const db = firebase.firestore();
        const docRef = db.collection('posts').doc(this.personalEvent[0].id)
        docRef.set({
          displayImage: this.currentUser[0].image,
          // like_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
          // image_users: firebase.firestore.FieldValue.arrayUnion(this.currentUser[0].image),
          // name_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.displayName),
        }, { merge: true })
        this.applyFlag = true;
        this.getEvent(docRef);
    },
    cancelEvent() {
        const db = firebase.firestore();
        const docRef = db.collection('posts').doc(this.personalEvent[0].id)
        docRef.delete(
        // docRef.update({
          // displayImage: null,
          // like_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
          // image_users: firebase.firestore.FieldValue.arrayRemove(this.currentUser[0].image),
          // name_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.displayName),
        )
        this.applyFlag = false;
        this.getEvent(docRef);
    },
    getProfile(id) {
      console.log(id);
    },
  }
}
</script>

<style>

</style>
