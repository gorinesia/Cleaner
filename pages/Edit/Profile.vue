<template>
  <v-app class="mx-10">
    <v-alert dense text type="success" :value="alert">プロフィール情報を更新しました</v-alert>
    <v-container max-width="600px">
    <h2 class="grey--text">ユーザー情報</h2>
      <label class="postImage-appendBtn block">プロフィール画像</label>
      <input class="d-block" type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
      <label>ユーザー名</label>
      <v-text-field v-model="name" class="white"></v-text-field>
      <label>場所</label>
      <v-text-field v-model="place" class="white"></v-text-field>
      <label>ひとこと</label>
      <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
      <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>更新</v-btn>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
      messages: [
        {
          avatar: 'image_src',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          excerpt: 'Thank you for joining our comminity...',
        }
      ],
      alert: false
    }
  },
  methods: {
    btnUploadChange(ev) {
      const file = ev.target.files[0];
      const storage = firebase.storage();
      const storageRef = storage.ref('profileImages');
      const uploadRef = storageRef.child(file.name);
      uploadRef.put(file)
        .then((snapshot) => {
          console.log('Uploaded a blob or file');
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 3000)
        })
        .catch((error) => {
          console.log(error);
        })
    },
  }
}
</script>

<style>

</style>
