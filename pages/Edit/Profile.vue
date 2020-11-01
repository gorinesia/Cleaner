<template>
  <v-app class="mx-10">
    <h2>プロフィール編集</h2>
    <v-alert dense text type="success" :value="alert">プロフィール情報を更新しました</v-alert>
    <!-- <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="position: fixed; z-index: 1; right: 200px; bottom: 100px"
          fab
          large
          color="cyan darken-1"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card v-for="currentUser in currentUser" :key="currentUser.id">
        <v-card-title>
          <span class="headline">User Article</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <label class="postImage-appendBtn"></label>
            <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
            <label>名前</label>
            <v-text-field v-model="name" class="white" ></v-text-field>
            <label>場所</label>
            <v-text-field v-model="place" class="white"></v-text-field>
            <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
            <!-- <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn> -->
          <!-- </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <h2 class="grey--text">ユーザー情報</h2>
    <v-container max-width="600px">
      <v-card v-for="currentUser in currentUser" :key="currentUser.id">
        <label class="postImage-appendBtn block">プロフィール画像</label>
        <input class="d-block" type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
        <v-img :src="image" width="100" height="100"></v-img>
        <label>ユーザー名</label>
        <v-text-field v-model="displayName" class="white" :placeholder="currentUser.displayName">{{ currentUser.displayName }}</v-text-field>
        <label>場所</label>
        <v-text-field v-model="place" class="white" placeholder="東京"></v-text-field>
        <label>ひとこと</label>
        <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
        <v-btn @click="updateProfile(currentUser.id)" class=" ma-3 float-right font-weight-bold" color="cyan" dark>更新</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase';

export default {
  layout: 'loggedIn',
  data() {
    return {
      displayName: '',
      place: '',
      date: '',
      messageComment: '',
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
    // getProfile() {
    //   this.$store.dispatch('user/getProfile');
    // },
    updateProfile(id) {
      console.log(id)
      this.$store.dispatch('user/updateProfile', {
        id,
        displayName: this.displayName,
        place: this.place,
        comment: this.messageComment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.displayName = '';
      this.place = '';
      this.messageComment = '';
      this.date = '';
    },
  }
}
</script>

<style>

</style>

// this.alert = true;
//           setTimeout(() => {
//             this.alert = false
//           }, 3000)
