<template>
  <v-app class="mx-10">
    <v-alert dense text type="success" :value="alert" style="position: fixed; z-index: 1; right: 200px; bottom: 100px">プロフィール情報を更新しました</v-alert>
    <h2 class="cyan--text text--darken-1">ユーザー情報</h2>
    <v-container max-width="600px">
      <v-card v-for="currentUser in currentUser" :key="currentUser.id">
        <label class="postImage-appendBtn block">プロフィール画像</label>
        <input class="d-block" type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
        <v-img :src="image" width="100" height="100"></v-img>
        <label>ユーザー名</label>
        <v-text-field v-model="displayName" class="white" :placeholder="currentUser.displayName"></v-text-field>
        <label>プロフィール</label>
        <v-textarea v-model="comment" class="white" placeholder="自己紹介を書きましょう"></v-textarea>
        <v-btn @click="updateProfile(currentUser.id)" class=" ma-3 float-right font-weight-bold" color="cyan" dark>更新</v-btn>
      </v-card>
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
      displayName: '',
      place: '',
      date: '',
      comment: '',
      alert: false,
      dialog: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    image: {
      get() {
        return this.$store.getters['user/image']
      },
      set(value) {
        this.$store.commit('user/setImage', value)
      }
    },
  },
  mounted() {
    this.$store.dispatch('user/logInUserDisplay');
  },
  methods: {
    btnUploadChange(ev) {
      this.$store.dispatch('user/btnUploadChange', {
        ev
      });
    },
    getUrl(ev) {
      this.$store.dispatch('user/getUrl', {
        ev
      });
    },
    updateProfile(id) {
      console.log(id)
      this.$store.dispatch('user/updateProfile', {
        id,
        displayName: this.displayName,
        place: this.place,
        comment: this.comment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.alert = true;
      setTimeout(() => {
        this.alert = false
      }, 3000)
      this.displayName = '';
      this.place = '';
      this.comment = '';
      this.date = '';
    },
  }
}
</script>

<style>

</style>
