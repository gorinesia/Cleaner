<template>
  <v-app>
    <v-container>
      <label for="garbage">名前</label>
      <v-text-field v-model="name" class="white"></v-text-field>
      <label for="garbage">場所</label>
      <v-text-field v-model="place" class="white"></v-text-field>
      <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
      <v-btn @click="addMessage" class="float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
      <v-row v-for="(message, key, index) in messages" :key="index">
        <v-card class="ma-1">
            <p>{{ message.name }}</p>
            <p>{{ message.place }}</p>
            <p>{{ message.messageComment }}</p>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase';
const db = firebase.firestore();

export default {
  data() {
    return {
      name: '',
      place: '',
      messages: [],
      messageComment: ''
    }
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      const db = firebase.firestore();
      db.collection('users')
        .orderBy('name')
        .get()
        .then((querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              name: doc.data().name,
              place: doc.data().place,
              messageComment: doc.data().comment
            })
          })
          this.messages = messages;
      })
    },
    addMessage() {
      const db = firebase.firestore();
      db.collection('users').add({
        name: this.name,
        place: this.place,
        comment: this.messageComment
      })
      console.log(this.messageComment);
      this.messageComment = ''
      this.getMessage();
    },
  }
};
</script>

<style>

</style>
