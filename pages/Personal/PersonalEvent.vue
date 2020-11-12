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


      <div :id="currentUser[0].id">
        <v-btn v-if="!applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="applyEvent(currentUser[0].id)">{{ applyButton }}</v-btn>
      </div>
      <div :id="currentUser[0].id">
        <v-btn v-if="applyFlag" class="mb-10 white--text" rounded color="orange" x-large @click="cancelEvent(currentUser[0].id)">{{ applyButton }}</v-btn>
      </div>

      <div>メンバー</div>
      <v-card>
        <v-row>
          <v-col>
            <v-avatar>
              <v-img :src="personalEvent.displayImage" width="50px" height="50px" @click="getProfile(personalEvent.id)"></v-img>
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
            <v-avatar tile size="100" color="cyan" :src="image_src" class="mx-5">
              <img :src="personalEvent.image" alt="">
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
      image_src: require('@/assets/img/everyone.jpg'),
      applyUsers: [],
      applyFlag: false,
      applyButton: '参加',
      loginUser: null
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
    this.getEvent(this.currentUser[0].id)
  },
  methods: {
    getEvent(id) {
      const db = firebase.firestore();
      const docRef = db.collection('users').doc(id).collection('posts').doc('apply');
      docRef
        .onSnapshot((doc) => {
          console.log(doc.data());
          this.applyUsers.push({
            // displayName: doc.data().displayName,
            // image: doc.data().image,
            // applyButton: doc.data().applyButton
          })
        })
    },
    applyEvent(id) {
      console.log(id);
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(id).collection('posts').doc('apply')
          docRef.set({
          })
            this.getEvent(id);
    },
    cancelEvent(id) {
      console.log(id);
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(id).collection('posts').doc('apply');
          docRef.update({
          })
            this.getEvent(id);
    },
    getProfile(id) {
      console.log(id);
    },
  }
}
</script>

<style>

</style>
