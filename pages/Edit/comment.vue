<template>
  <v-app>
    <v-container>
      <v-row v-for="message in messages" :key="message.id" class="ma-1">
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
              </v-overlay>
            </v-col>
          </v-row>
        </v-card>
        <v-container class="h-full flex flex-col ml-6">
          <v-card class="h-full flex flex-col ml-6">
            <p>メッセージ一覧</p>
            <template v-for="(comment, index) in comments">
              <v-divider :key="index" v-if="index >= 1" />
                <v-row class="flex-grow overflow-y-scroll mb-1" :key="comment.id">
                  <v-col cols="2">
                    <v-card-title class="cyan--text text--darken-1">{{ message.name }}</v-card-title>
                  </v-col>
                  <v-col cols="1">
                    <p>{{ message.place }}</p>
                  </v-col>
                  <v-col cols="6">
                    <p>{{ comment.comment }}</p>
                  </v-col>
                  <v-col cols="3">
                    <span>{{ comment.date }}</span>
                  </v-col>
                </v-row>
            </template>
            <v-card class="border border-gray-900 rounded mb-4">
              <v-textarea background-color="grey lighten-2" class="w-full pt-4 pl-8 outline-none" placeholder="XXXXへのメッセージ" v-model="comment"></v-textarea>
              <v-btn class="cyan text-sm white--text font-bold py-1 px-2 rouded" @click="addComment">送信</v-btn>
            </v-card>
          </v-card>
        </v-container>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase';
const db = firebase.firestore();

export default {
  layout: 'loggedIn',
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
      comments: [],
      comment: ''
    }
  },
  mounted() {
    this.getMessage();
    this.getComment();
  },
  methods: {
    getMessage() {
      const db = firebase.firestore();
      db.collection('projects')
        .orderBy('date', 'desc')
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
      db.collection('projects').add({
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
      db.collection('projects')
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
      db.collection('projects')
        .doc(id)
        .update({
          name: this.name,
          place: this.place,
          comment: this.messageComment,
          image: this.image,
        })
        .then(() => {
          console.log('updated!!');
          this.name = ''
          this.place = ''
          this.messageComment = ''
          this.image = ''
          console.log(this.image)
          this.getMessage();
          console.log(this.image)
        })
    },
    getComment() {
      const db = firebase.firestore();
      db.collection('comments')
        .orderBy('date')
        .get()
        .then((querySnapshot) => {
          const comments = [];
          querySnapshot.forEach((doc) => {
            comments.push({
              // name: doc.data().name,
              // place: doc.data().place,
              comment: doc.data().comment,
              // image: doc.data().image,
              // id: doc.id,
              date: doc.data().date,
            })
            console.log(doc.data());
            console.log(doc.id);
          })
          this.comments = comments;
      })
    },
    addComment() {
      const db = firebase.firestore();
      db.collection('comments').add({
        // name: this.name,
        // place: this.place,
        comment: this.comment,
        // image: this.image,
        date: new Date().toLocaleString()
      })
      console.log(this.comment);
      // this.name = ''
      // this.place = ''
      this.comment = ''
      // this.image = ''
      this.date = ''
      this.getComment();
    },
  }
};
</script>
