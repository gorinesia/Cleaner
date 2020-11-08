<template>
  <v-app class="mx-10" style="color: navy">
    <v-container v-for="personalData in personalDatas" :key="personalData.id">
      <v-card outlined class="mb-10">
        <v-row  class="fill-height">
          <v-col align-self="start"  cols="2">
            <v-avatar class="profile" color="grey" size="100">
              <v-img :src="image_src"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="cyan--text text--darken-1 font-weight-bold title text-h4" dark>
                  {{ personalData.name }}
                </v-list-item-title>
                <p>世界が綺麗になればいいなと思って日々活動しています。よろしくお願いいたします。</p>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Johnさんの発案中のイベント</h2>

      <v-card align="center" class="mb-10">
        <v-row>
          <v-col cols="2">
            <p>10月30日</p>
          </v-col>
          <v-col class="font-weight-bold text-h5" cols="6">
            <p>渋谷の路上でゴミを拾います。</p>
          </v-col>
          <v-col cols="2">
            <p>日時：{{ personalData.date }}</p>
          </v-col>
          <v-col cols="2">
            <p>場所：東京都渋谷区</p>
          </v-col>
        </v-row>
        <v-img
          height="200"
          :src="image_src"
        ></v-img>
        <div class="grey--text text--darken-1 font-weight-bold">イベント概要</div>
        <p class="ma-2">僕たちにできることを。人もゴミを多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
      </v-card>
    <!-- </v-container> -->
    <!-- <v-container> -->
      <div :id="currentUser[0].id">
        <v-btn v-if="!applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="applyEvent(currentUser[0].id)">{{ applyButton }}</v-btn>
      </div>
      <div :id="currentUser[0].id">
        <v-btn v-if="applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="cancelEvent(currentUser[0].id)">{{ applyButton }}</v-btn>
      </div>

      <div>メンバー</div>
      <v-card>
        <v-row>
          <v-col cols="1" v-for="(applyUser, index) in applyUsers" :key="index">
            <!-- <span>{{ applyUser.displayName }}</span> -->
            <v-avatar>
              <v-img :src="applyUser.image" width="50px" height="50px" @click="getProfile(applyUser.id)"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
    <!-- </v-container> -->
      <v-container clss="h-full flex flex-col ml-6">
        <div>コメント</div>
        <v-card class="border border-gray-900 rounded mb-4">
          <v-textarea background-color="grey lighten-2" class="w-full pt-4 pl-8 outline-none" placeholder="XXXXへのメッセージ"></v-textarea>
          <v-btn class="cyan text-sm white--text font-bold py-1 px-2 rouded">送信</v-btn>
        </v-card>
      </v-container>
    <!-- <v-container v-for="personalData in personalDatas" :key="personalData.id"> -->
      <v-card color="#E0F7FA" class="rounded-xl mt-5 pa-5" rounded>
        <h2 class="mx-10">クリーナーを応援しよう</h2>
        <v-row>
          <v-col cols="9">
            <span>{{ personalData.name }}さんの行動に対してお金を送ってサポートすることができます。</span>
            <v-btn color="#0D47A1" rounded x-large dark>サポートする</v-btn>
          </v-col>
          <v-col cols="3">
            <v-avatar tile size="100" color="cyan" :src="image_src" class="mx-5">
              <img :src="image_src" alt="">
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
  layout: 'loggedIn',
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
      applyUsers: [],
      // isPush: false,
      applyFlag: false,
      applyButton: '参加',
      loginUser: null
    }
  },
  computed: {
    personalDatas() {
      return this.$store.getters['event/personalDatas']
    },
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    // applyUser() {
    //   return this.$store.getters['event/currentUser']
    // },
  },
  created() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.loginUser = user;
    //     const db = firebase.firestore();
    //     const docRef = db.collection('posts').doc(this.loginUser.uid);
    //     this.getEvent(docRef)
    //   }
    // })
  },
  mounted() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log(user)
    //     this.loginUser = user;
    //     const db = firebase.firestore();
    //     const docRef = db.collection('posts').doc(this.currentUser[0].id);
    //   }
    // })
    this.getEvent(this.currentUser[0].id)
  },
  methods: {
    // getEvent(docRef) {
    //   docRef.get().then(doc => {
    //     if (doc.exists) {
    //       console.log(doc)
    //       this.posts = doc.data();
    //       this.applyFlag = this.posts.applyButton.includes(this.loginUser.uid)
    //     }
    //   })
    // },
    getEvent(id) {
      // const db = firebase.firestore();
      // db.collection('posts')
      //   .doc(id)
      const db = firebase.firestore();
      const docRef = db.collection('users').doc(id).collection('posts').doc('apply');
      // docRef
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       this.applyUsers.push({
      //         // displayName: doc.data().displayName,
      //         // image: doc.data().image,
      //         // id: doc.id,
      //         applyButton: doc.data().applyButton
      //       })
      //     })
      //   })
      docRef
        .onSnapshot((doc) => {
          console.log(doc.data());
          this.applyUsers.push({
            // displayName: doc.data().displayName,
            // image: doc.data().image,
            // id: doc.id,
            // applyButton: doc.data().applyButton
          })
        })
    },
    applyEvent(id) {
      console.log(id);
      // if (this.applyFlag = false) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(id).collection('posts').doc('apply')
          docRef.set({
            // applyButton: 'キャンセル',
          })
          // .then((doc) => {
            // this.applyUsers.push({
            //   displayName: doc.data().displayName,
            //   // image: doc.data().image,
            //   id: doc.id,
            // })
            // this.applyFlag = true;
            // this.applyButton = 'キャンセル'
            this.getEvent(id);
          // })
      // }
      // console.log(id);
      // // if (this.applyFlag = false) {
      //   const db = firebase.firestore();
      //   db.collection('applyUsers')
      //     .doc(id)
      //     .get()
      //     .then((doc) => {
      //       this.applyapplyUsers.push({
      //         displayName: doc.data().displayName,
      //         // image: doc.data().image,
      //         id: doc.id,
      //       })
      //       this.applyFlag = true;
      //       this.applyButton = 'キャンセル'
      //     })
      // // }
    },
    cancelEvent(id) {
      console.log(id);
      // if (this.applyFlag = true) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(id).collection('posts').doc('apply');
          docRef.update({
            // applyButton: '参加',
            // applyFlag: false
          })
          // .then((doc) => {
            // this.applyButton = '参加';
            this.getEvent(id);
          // })
            // this.getEvent(id);
      // }
    },
    // cancelEvent(id) {
    //   console.log(id);
    //   // if (this.applyFlag = true) {
    //     const db = firebase.firestore();
    //     db.collection('users')
    //       .doc(id)
    //       .get()
    //       .then((doc) => {
    //         this.applyUsers.pop();
    //       })
    //         this.applyFlag = false;
    //         this.applyButton = '参加'
    //         // this.getEvent(id);
    //   // }
    // },
    getProfile(id) {
      console.log(id);
    },
  }
}
</script>

<style>

</style>
