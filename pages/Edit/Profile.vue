<template>
  <v-app class="mx-10">
    <v-alert dense text type="success" :value="alert" style="position: fixed; z-index: 1; right: 200px; bottom: 100px">プロフィール情報を更新しました</v-alert>
    <h2 class="cyan--text text--darken-1">ユーザー情報</h2>
    <v-container max-width="600px">
      <v-card v-for="currentUser in currentUser" :key="currentUser.id" class="pa-5" >
        <label class="postImage-appendBtn block font-weight-bold">プロフィール画像</label>
        <input class="d-block" type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
        <v-img :src="image" width="100" height="100"></v-img>
        <label class="font-weight-bold">ユーザー名</label>
        <v-text-field v-model="displayName" class="white" :placeholder="currentUser.displayName"></v-text-field>
        <label class="font-weight-bold">プロフィール</label>
        <v-textarea v-model="comment" class="white" placeholder="自己紹介を書きましょう"></v-textarea>
        <v-btn @click="updateProfile(currentUser.id)" class="mt-8 float-right font-weight-bold" color="cyan" dark>更新</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore'

export default {
  layout: 'loggedIn',
  data() {
    return {
      displayName: '',
      comment: '',
      alert: false,
      dialog: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    uid() {
      return this.$store.getters['user/uid']
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
    this.$store.dispatch('user/logInUserDisplay', {
      uid: this.uid,
      email: this.currentUser[0].email
    });
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
      console.log(this.currentUser);
      this.$store.dispatch('user/updateProfile', {
        id,
        uid: this.currentUser[0].uid,
        displayName: this.displayName,
        comment: this.comment,
        image: this.image,
        email: this.currentUser[0].email
      });
      this.getUserProfile(this.currentUser[0].uid);
      this.alert = true;
      setTimeout(() => {
        this.alert = false
      }, 3000);
      this.displayName = '';
      this.place = '';
      this.comment = '';
      this.date = '';
    },
    // updateProject() {
    //   this.$store.dispatch('project/updateProject', {
    //     id,
    //     displayName: this.displayName,
    //     displayImage: this.image
    //   });
    // },
    getUserProfile(uid) {
      this.$store.dispatch('project/getUserProfile', {
        uid
      });
    }
  }
}
</script>

<style>

</style>
