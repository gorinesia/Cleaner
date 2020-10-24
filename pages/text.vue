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
      <v-row v-for="message in messages" :key="message.id" class="ma-1">
        <v-card class="ma-1">
            <v-img :src="message.image" max-height="100" max-width="200"></v-img>
            <p>{{ message.name }}</p>
            <p>{{ message.place }}</p>
            <p>{{ message.messageComment }}</p>
            <div>
              <v-btn @click="overlay = !overlay">削除</v-btn>
              <v-overlay :value="overlay">
                <p>本当に記事を削除しますか？</p>
                <v-btn @click="deleteArticles(message.id)">削除</v-btn>
                <v-btn @click="overlay = false">閉じる</v-btn>
              </v-overlay>
            </div>
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
      messageComment: '',
      overlay: false,
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
        this.image = url;
      })
    },
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
              messageComment: doc.data().comment,
              image: doc.data().image,
              id: doc.id
            })
            console.log(doc.data());
            console.log(doc.id);
          })
          this.messages = messages;
      })
    },
    addMessage() {
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
      this.getMessage();
    },
    deleteArticles(id) {
      console.log(id)
      const db = firebase.firestore();
      db.collection('users')
        .doc(id)
        .delete()
        .then(() => {
          console.log('deleted!!');
          this.getMessage();
        })
    }
  }
};
</script>
