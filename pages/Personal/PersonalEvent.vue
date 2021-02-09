<template>
  <v-app class="mx-10" style="color: navy">
    <v-container v-for="personalEvent in personalEvent" :key="personalEvent.id">
      <v-card align="center" class="mb-5 pa-5">
        <v-row>
          <v-col cols="12" md="2" class="mb-n5">
            <p>{{ personalEvent.date}}</p>
          </v-col>
          <v-col class="font-weight-bold text-h5 my-n4" cols="12" md="6">
            <p>{{ personalEvent.name }}</p>
          </v-col>
          <v-col cols="12" md="2" class="my-n4">
            <p>日時：{{ personalEvent.date }}</p>
          </v-col>
          <v-col cols="12" md="2" class="my-n4">
            <p>場所：{{ personalEvent.place }}</p>
          </v-col>
        </v-row>
        <v-img
          height="200"
          :src="personalEvent.image"
        ></v-img>
        <div class="grey--text text--darken-1 font-weight-bold mt-5">イベント概要</div>
        <p class="ma-5">{{ personalEvent.comment }}</p>
      </v-card>
      <h2 class="mb-5"><span class="cyan--text text--darken-1">{{ personalEvent.displayName }}</span>さんの発案中のイベント</h2>

      <div v-if="loggedIn">
        <div>
          <v-btn v-if="!applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="applyEvent()">参加</v-btn>
        </div>
        <div>
          <v-btn v-if="applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="cancelEvent()">キャンセル</v-btn>
        </div>
        <span>{{ likeSum }}</span>
        <span>{{ nameUser }}</span>
      </div>
      <div v-else>
        <div>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs}">
              <v-btn v-if="!applyFlag" class="mb-10 white--text" v-bind="attrs " v-on="on" rounded color="orange" x-large>参加</v-btn>
            </template>
            <v-card>
              <v-card-title>Need to Login</v-card-title>
              <v-card-text>ログインしてCleanerを楽しみませんか？</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan" outlined rounded to="/auth/login">ログイン</v-btn>
                <v-btn color="orange" outlined rounded @click="dialog = false">閉じる</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div>
          <v-btn v-if="applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="pushEvent">キャンセル</v-btn>
        </div>
        <span>{{ likeSum }}</span>
        <span>{{ nameUser }}</span>
      </div>

      <div>メンバー</div>
      <v-card>
        <v-row>
          <v-col>
            <v-avatar v-for="image in images" :key="image.id">
              <img :src="image" :key="image" width="50px" height="50px" @click="getProfile(personalEvent.id)">
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
          <v-col cols="12" md="9">
            <span class="mb-3"><span class="cyan--text text--darken-1">{{ personalEvent.displayName }}</span>さんの行動に対してジュースを渡す(100円)感覚でサポートすることができます。</span>
            <v-dialog v-model="payDialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="#0D47A1" rounded x-large dark v-bind="attrs" v-on="on">ジュースをプレゼントする</v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  ジュース代(100円)をプレゼントする
                </v-card-title>
                <v-card-text><span class="cyan--text text--darken-1">{{ personalEvent.displayName }}</span>さんへ<br>「お疲れさま」の気持ちを込めて、ジュース代をプレゼントします。</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-3" color="cyan" dark @click="openStripeCardform">支払う</v-btn>
                  <v-btn class="ma-3" @click="payDialog = false">閉じる</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="12" md="3">
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
      image_users: [],
      nameUser: [],
      name_users: [],
      dialog: false,
      payDialog: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['user/loggedIn']
    },
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
          this.likeSum = this.posts.like_users.length;
          this.images = [...this.posts.image_users];
          this.nameUser = [...this.posts.name_users];
          this.applyFlag = this.posts.like_users.includes(this.loginUser.uid);
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
          like_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
          image_users: firebase.firestore.FieldValue.arrayUnion(this.currentUser[0].image),
          name_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.displayName),
        }, { merge: true })
        this.applyFlag = true;
        this.getEvent(docRef);
    },
    cancelEvent() {
        const db = firebase.firestore();
        const docRef = db.collection('posts').doc(this.personalEvent[0].id)
        docRef.update({
          like_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
          image_users: firebase.firestore.FieldValue.arrayRemove(this.currentUser[0].image),
          name_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.displayName),
        })
        this.applyFlag = false;
        this.getEvent(docRef);
    },
    getProfile(id) {
      console.log(id);
    },
    openStripeCardform() {

    }
  }
}
</script>

<style>

</style>
