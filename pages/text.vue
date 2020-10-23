<template>
  <section class="container">
    <v-row>
      <v-col>
        <v-text-field v-model="messageComment"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addMessage">投稿</v-btn>
      </v-col>
    </v-row>
    <v-row v-for="(message, key, index) in messages" :key="index">
      <v-col>
        <p>{{ message.messageComment }}</p>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase';
const db = firebase.firestore();

export default {
  data() {
    return {
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
        .get()
        .then((querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              messageComment: doc.data().comment
            })
          })
          this.messages = messages;
      })
    },
    addMessage() {
      const db = firebase.firestore();
      db.collection('users').add({
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
