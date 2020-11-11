<template>
  <v-app>
    <v-container v-for="personalProject in personalProject" :key="personalProject.id">
      <v-card outlined class="mb-5">
        <v-row >
          <v-col align-self="start"  cols="2">
            <v-avatar class="profile ml-5" color="grey" size="80">
              <v-img :src="personalProject.displayImage"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <nuxt-link class="cyan--text text--darken-1 font-weight-bold title text-h4 text-decoration-none" to="/personal/profile" dark>
                  {{ personalProject.displayName }}
                </nuxt-link>
                <p class="mt-3">{{ personalProject.comment }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col>
            <span class="grey--text float-right mr-5"><v-icon>mdi-scale</v-icon>{{ personalProject.name }}・{{ personalProject.date}}</span>
          </v-col>
        </v-row>
      </v-card>
      <v-card align="center" class="mb-10">
        <v-row >
          <v-col cols="2">
          </v-col>
          <v-col class="font-weight-bold text-h5" cols="6">
            <p>{{ personalProject.place }}</p>
          </v-col>
        </v-row>
        <v-img
          height="200"
          width="500"
          :src="personalProject.image"
        ></v-img>
      </v-card>

      <div>いいね</div>
      <v-container class="h-full flex flex-col">
        <v-card class="h-full flex flex-col">
          <p>コメント</p>
          <template v-for="(comment, index) in comments">
            <v-divider :key="index" v-if="index >= 1" />
              <v-row class="flex-grow overflow-y-scroll mb-1" :key="comment.id">
                <v-col cols="2">
                  <v-img :src="comment.image" class="ml-5" height="80px" width="80px"></v-img>
                </v-col>
                <v-col cols="7">
                  <p>{{ comment.displayName }}</p>
                  <p>{{ comment.comment }}</p>
                </v-col>
                <v-col cols="3">
                  <span>{{ comment.date }}</span>
                </v-col>
              </v-row>
          </template>
          <v-card class="border border-gray-900 rounded mb-4">
            <v-textarea background-color="grey lighten-2" class="w-full pt-4 pl-8 outline-none" placeholder="XXXXへのメッセージ" v-model="comment"></v-textarea>
            <v-btn class="cyan text-sm white--text font-bold py-1 px-2 rouded" @click="addComment(currentUser[0].id)">送信</v-btn>
          </v-card>
        </v-card>
      </v-container>

      <v-card color="#E0F7FA" class="rounded-xl pa-5 mb-10" rounded>
        <h2 class="mx-10">クリーナーを応援しよう</h2>
        <v-row>
          <v-col cols="9">
            <v-avatar class="profile mx-10" color="grey" size="50">
              <v-img :src="personalProject.displayImage"></v-img>
            </v-avatar>
            <p class="mb-10 mx-10">{{ personalProject.displayName }}さんの行動に対してお金を送ってサポートすることが出来ます。</p>
            <v-btn color="#0D47A1" class="mx-10" rounded x-large dark>サポートする</v-btn>
          </v-col>
          <v-col cols="3">
            <v-avatar tile size="150" color="cyan" class="mr-5">
              <v-img :src="personalProject.image"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'personalProject',
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
      messages: [],
      article: {
        id: ''
      },
      messageComment: '',
      comments: [],
      comment: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    personalProject() {
      return this.$store.getters['project/personalProject']
    }
  },
  mounted() {
    this.getComment(this.currentUser[0].id);
  },
  methods: {
    getComment(id) {
      const db = firebase.firestore();
      db.collection('posts').doc(id).collection('comments')
        .orderBy('date', 'asc')
        .onSnapshot((querySnapshot) => {
          // const comments = [];
          querySnapshot.forEach((doc) => {
            this.comments.push({
              displayName: doc.data().displayName,
              // place: doc.data().place,
              comment: doc.data().comment,
              image: doc.data().image,
              // id: doc.id,
              date: doc.data().date,
            })
            console.log(doc.data());
            console.log(doc.id);
          })
          // this.comments = comments;
      })
    },
    addComment(id) {
      const db = firebase.firestore();
      db.collection('posts').doc(id).collection('comments').add({
        displayName: this.currentUser[0].displayName,
        // place: this.place,
        comment: this.comment,
        image: this.currentUser[0].image,
        date: new Date().toLocaleString()
      })
      .then(() => {
        console.log(this.comment);
        this.displayName = ''
        // this.place = ''
        this.comment = ''
        this.image = ''
        this.date = ''
        this.getComment(id);
      })
    },
  }
}
</script>

<style>

</style>
