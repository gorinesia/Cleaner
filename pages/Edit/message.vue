<template>
  <v-app class="mx-10">
    <h2 class="cyan--text text--darken-1 my-5">メッセージ管理</h2>
    <h3>ユーザー</h3>
      <v-text-field placeholder="製作中です"></v-text-field>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="messageText"></v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="addMessage">投稿</v-btn>
          </v-col>
        </v-row>
        <v-row v-for="(message, key, index) in messages" :key="index">
          <v-col>
            <p>{{ message.messageText }}</p>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore'
// import firebase, { firestore } from '~/plugins/firebase.js'


export default {
  layout: 'loggedIn',
  data() {
    return {
      messages: [],
      messageText: '',
      alert: false
    }
  },
  mounted() {
    this.initMessage();
  },
  methods: {
    initMessage() {
      const db = firebase.firestore();
      db.collection('messages')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.messages.unshift({
            messageText: doc.data().messageText,
            id: doc.id
          })
          console.log(doc.data().messageText);
        })
      })
    },
    addMessage() {
      const db = firebase.firestore();
      db.collection('messages')
        .add({
          messageText: this.messageText
        });
        this.messageText = '';
    }
  }
}
</script>

<style>

</style>
