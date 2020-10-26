<template>
  <v-app>
    <v-container>
      <label class="postImage-appendBtn"></label>
      <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
      <label>名前</label>
      <v-text-field v-model="name" class="white"></v-text-field>
      <label>場所</label>
      <v-text-field v-model="place" class="white"></v-text-field>
      <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
      <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
    </v-container>
    <v-divider inset></v-divider>
    <v-container>
      <v-row v-for="message in messages" :key="message.id" class="ma-1" :messages="reversedMessages">
        <v-card width="100%">
          <v-row>
            <v-col cols="3">
              <v-img :src="message.image" max-height="100" max-width="200" class="ml-1"></v-img>
            </v-col>
            <v-col cols="3">
              <v-card-title class="cyan--text text--darken-1">{{ message.name }}</v-card-title>
              <p>{{ message.place }}</p>
              <p>{{ message.messageComment }}</p>
            </v-col>
            <v-col cols="4">
              <span>{{ message.date }}</span>
            </v-col>
            <v-col cols="1">
              <v-btn @click="openModalForEdit(message.id)" class="float-right">編集</v-btn>
              <v-overlay :value="overlay2">
                <label class="postImage-appendBtn">
                <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付">
                </label>
                <label for="garbage">名前</label>
                <v-text-field v-model="name"></v-text-field>
                <label for="garbage">場所</label>
                <v-text-field v-model="place"></v-text-field>
                <v-textarea v-model="messageComment" placeholder="コメントを入力"></v-textarea>
                <v-btn @click="editArticles(article.id)">編集</v-btn>
                <v-btn @click="overlay2 = false">閉じる</v-btn>
              </v-overlay>
            </v-col>
            <v-col cols="1">
              <v-btn @click="openModalForDelete(message.id)" class="float-right">削除</v-btn>
              <v-overlay :value="overlay">
                <p>本当に記事を削除しますか？</p>
                <v-btn @click="deleteArticles(article.id)">削除</v-btn>
                <!-- <v-btn @click="overlay = false">閉じる</v-btn> -->
              </v-overlay>
            </v-col>
          </v-row>
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
      date: '',
      messages: [],
      article: {
        id: ''
      },
      messageComment: '',
      overlay: false,
      overlay2: false,
    }
  },
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    }
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    btnUploadChange(ev) {
      const file = ev.target.files[0];
      const storage = firebase.storage();
      const storageRef = storage.ref('images');
      const uploadRef = storageRef.child(file.name);
      console.log(file)
      uploadRef.put(file)
        .then((snapshot) => {
          console.log('Uploaded a blob or file');
          this.getUrl(ev)
        })
        // .then((url) => {
        //   console.log('imgSample' + url);
        //   this.image = url;
        // })
        .catch((error) => {
          console.log(error);
        })
      // uploadRef.getDownloadURL().then((url) => {
      //   console.log('imgSample' + url);
      //   this.image = url;
      // })
    },
    getUrl(ev) {
      const file = ev.target.files[0];
      const storage = firebase.storage();
      const storageRef = storage.ref('images');
      const uploadRef = storageRef.child(file.name);
      uploadRef.getDownloadURL().then((url) => {
        console.log('imgSample' + url);
        this.image = url;
      })
    },
    getMessage() {
      const db = firebase.firestore();
      db.collection('users')
        .orderBy('date')
        .get()
        .then((querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              name: doc.data().name,
              place: doc.data().place,
              messageComment: doc.data().comment,
              image: doc.data().image,
              id: doc.id,
              date: doc.data().date,
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
        image: this.image,
        date: new Date().toLocaleString()
      })
      console.log(this.messageComment);
      this.name = ''
      this.place = ''
      this.messageComment = ''
      this.image = ''
      this.date = ''
      this.getMessage();
    },
    openModalForDelete(id) {
      console.log(id);
      this.overlay = true;
      this.article.id = id;
    },
    closeModalForDelete() {
      this.overlay = false;
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
          this.closeModalForDelete()
        })
    },
    openModalForEdit(id) {
      console.log(id);
      this.overlay2 = true;
      this.article.id = id;
    },
    editArticles(id) {
      console.log(id)
      const db = firebase.firestore();
      db.collection('users')
        .doc(id)
        .update({
          name: this.name,
          place: this.place,
          comment: this.messageComment,
          image: this.image,
          // date: new Date().toLocaleString()
        })
        .then(() => {
          console.log('updated!!');
          this.name = ''
          this.place = ''
          this.messageComment = ''
          this.image = ''
          console.log(this.image)
          // this.date = ''
          this.getMessage();
          console.log(this.image)
        })
    },
  }
};
</script>
