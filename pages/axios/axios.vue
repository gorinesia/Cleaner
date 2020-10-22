<template>
  <section id="main">
    <textarea v-model="message" placeholder="Please enter a comment"></textarea>
    <div class="submitBtn" @click="sendData">Submit</div>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.message }}</li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios';
import firebase from '../../plugins/firebase.js';
import { mapGetters } from 'vuex';
const db = firebase.firestore();

export default {
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters(['posts'])
  },
  created: function() {
    this.$store.dispatch('setPostsRef', db.collection('posts'))
  },
  methods: {
    sendData: function() {
      if (this.message == '' || this.message.length > 100) {
        return false;
      }
      let dbdata = {
        message: this.message
      };
      db.collection('posts').add(dbdata);
    }
  }
}
</script>

<style>

</style>
