<template>
  <v-app>
    <v-container>
      <label class="postImage-appendBtn">
        <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付">
      </label>
      <label for="garbage">名前</label>
      <v-text-field v-model="name" class="white"></v-text-field>
      <label for="garbage">場所</label>
      <v-text-field v-model="place" class="white"></v-text-field>
      <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
      <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
      <v-divider></v-divider>
      <v-row v-for="(message, key, index) in messages" :key="index" class="ma-1">
        <v-card class="ma-1">
            <!-- <v-img :src="image_update" max-height="100" max-width="200"></v-img> -->
            <v-img :src="message.image" max-height="100" max-width="200"></v-img>
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
      image_update: null,
      name: '',
      place: '',
      image: null,
      messages: [],
      messageComment: ''
    }
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    btnUploadChange(ev) {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const uploadRef = storageRef.child('images/doind2.jpg');
      const f = ev.target.files[0];
      console.log(f)
      uploadRef.put(f).then((snapshot) => {
        console.log('Uploaded a blob or file');
      })
      uploadRef.getDownloadURL().then((url) => {
        console.log('imgSample' + url);
        // this.image_update = url;
        this.image = url;
      })
    },
    // uploadImages() {
    //   const storage = firebase.storage();
    //   const storageRef = storage.ref();
    //   const uploadRef = storageRef.child('images/doind2.jpg');
    //   uploadRef.getDownloadURL().then((url) => {
    //     console.log('imgSample' + url);
    //     this.image = url;
    //   })
    // },
    getMessage(ev) {
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
              messageComment: doc.data().comment,
              image: doc.data().image
            })
            console.log(doc.data())
          })
          this.messages = messages;
      })
    },
    addMessage(ev) {
      const db = firebase.firestore();
      db.collection('users').add({
        name: this.name,
        place: this.place,
        comment: this.messageComment,
        image: this.image
      })
      console.log(this.messageComment);
      this.name = ''
      this.place = ''
      this.messageComment = ''
      this.image = ''
      this.getMessage(ev);
      // this.uploadImages();
    },
  }
};
</script>

<style>

</style>
