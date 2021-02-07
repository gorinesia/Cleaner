<template>
  <v-app>
    <v-alert dense text type="info" :value="alertEdit" style="position: fixed; z-index: 1; right: 200px; bottom: 100px">プロジェクトの様子を編集しました</v-alert>
    <v-alert dense text type="error" :value="alertDelete" style="position: fixed; z-index: 1; right: 200px; bottom: 100px">プロジェクトの様子を削除しました</v-alert>
    <v-container v-for="personalProject in personalProject" :key="personalProject.id">
      <v-card outlined class="mb-5">
        <v-row cols="2">
          <v-col align-self="start"  cols="2">
            <v-avatar class="profile ml-5" color="grey" size="80">
              <v-img :src="personalProject.displayImage"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="5">
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <nuxt-link class="cyan--text text--darken-1 font-weight-bold title text-h4 text-decoration-none" to="/personal/profile" dark>
                  {{ personalProject.displayName }}
                </nuxt-link>
                <p class="mt-3">{{ personalProject.comment }}</p>
              </v-list-item-content>
            </v-list-item>
            <div>
              <div v-if="!applyFlag">
                <v-icon class="mb-1 white--text" rounded color="orange" medium @click="applyEvent()">mdi-thumb-up-outline</v-icon>
                <span>{{ likeSum }}</span>
              </div>
              <div v-if="applyFlag">
                <v-icon class="mb-1 white--text" rounded color="orange" medium @click="cancelEvent()">mdi-thumb-up</v-icon>
                <span>{{ likeSum }}</span>
              </div>
            </div>
          </v-col>
          <v-col cols="4">
            <span class="grey--text float-right mr-5"><v-icon>mdi-scale</v-icon>{{ personalProject.name }}・{{ personalProject.date}}</span>
          </v-col>
          <v-col cols="1" v-if="loggedIn">

            <v-menu
              v-if="currentUser[0].displayName === personalProject.displayName"
              bottom
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <!-- <v-list-item-title style="cursor: pointer" @click="openModalForEdit(personalProject.id)">投稿を編集</v-list-item-title> -->
                  <v-row justify="center">
                    <v-dialog
                      v-model="dialog"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-list-item-title
                          v-bind="attrs"
                          v-on="on"
                          @click="openModalForEdit(personalProject.id)"
                        >
                          <v-icon>mdi-pencil-plus</v-icon>
                          投稿を編集
                        </v-list-item-title>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">プロジェクトの内容を編集する</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <label class="postImage-appendBtn"></label>
                            <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
                            <v-img :src="image" width="100" height="100"></v-img>
                            <label>ゴミの量</label>
                            <v-text-field v-model="name" class="white" placeholder="例) 5kg"></v-text-field>
                            <label>日時</label>
                            <v-text-field v-model="time" class="white">{{ time }}</v-text-field>
                            <label>場所</label>
                            <v-text-field v-model="place" class="white" placeholder="例) 東京"></v-text-field>
                            <label>コメント</label>
                            <v-textarea v-model="comment" class="white" placeholder="例) 今日もたくさん拾いました。"></v-textarea>
                            <v-btn @click="editArticles(articleId)" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
                          </v-container>
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
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-icon>mdi-trash-can</v-icon>
                  <v-list-item-title style="cursor: pointer" @click="openModalForDelete(personalProject.id)">投稿を削除</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- <v-overlay :value="editOverlay"> -->
              <!-- <v-row justify="center">
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      style="position: fixed; z-index: 1; right: 250px; bottom: 100px"
                      fab
                      large
                      color="cyan darken-1"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn> -->
                  <!-- </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">プロジェクトの内容を編集する</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container> -->
                        <!-- <label class="postImage-appendBtn"></label>
                        <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
                        <v-img :src="image" width="100" height="100"></v-img>
                        <label>ゴミの量</label>
                        <v-text-field v-model="name" class="white" placeholder="例) 5kg"></v-text-field>
                        <label>日時</label>
                        <v-text-field v-model="time" type="date" class="white" placeholder="例）11月7日 9:00"></v-text-field>
                        <label>場所</label>
                        <v-text-field v-model="place" class="white" placeholder="例) 東京"></v-text-field>
                        <label>コメント</label> -->
                        <!-- <v-textarea v-model="comment" class="white" placeholder="例) 今日もたくさん拾いました。"></v-textarea>
                        <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
                      </v-container>
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
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row> -->
            <!-- </v-overlay> -->

            <v-overlay :value="deleteOverlay">
              <v-card class="pa-5">
                <p>本当に記事を削除しますか？</p>
                <v-btn @click="deleteArticles(articleId)">削除</v-btn>
                <v-btn @click="closeModalForDelete">閉じる</v-btn>
              </v-card>
            </v-overlay>

          </v-col>
        </v-row>
      </v-card>
      <v-card align="center" class="mb-10 pa-5">
        <v-row >
          <v-col cols="2">
          </v-col>
          <v-col class="font-weight-bold text-h5" cols="6">
            <p>{{ personalProject.place }}</p>
          </v-col>
        </v-row>
        <v-img
          height="300"
          width="500"
          :src="personalProject.image"
        ></v-img>
      </v-card>

      <v-container>
        <div>
          <span>{{ nameUser }}</span>
          <!-- <img :src="images" width="50px" height="50px"> -->
        </div>
        <div>いいね</div>
        <v-card>
          <v-row>
            <v-col>
              <v-avatar v-for="image in images" :key="image.id">
                <img :src="image" :key="image" width="50px" height="50px" @click="getProfile(personalProject.id)">
                <!-- <v-img :src="image.displayImage" width="50px" height="50px" @click="getProfile(personalProject.id)"></v-img> -->
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

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
            <p class="mb-3 mx-10">{{ personalProject.displayName }}さんの行動に対してお金を送ってサポートすることが出来ます。</p>
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
import firebase from 'firebase/app';
import 'firebase/firestore'

export default {
  name: 'personalProject',
  data() {
    return {
      messages: [],
      article: {
        id: ''
      },
      messageComment: '',
      comments: [],
      comment: '',
      items: [
        { title: '投稿を編集', icon: 'mdi-pencil-plus' },
        { title: '投稿を削除', icon: 'mdi-trash-can' },
      ],
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      time: new Date().toLocaleString(),
      dialog: false,
      alertEdit: false,
      alertDelete: false,
      applyUsers: [],
      applyFlag: false,
      loginUser: null,
      likeSum: 0,
      images: [],
      image_users: [],
      nameUser: [],
      name_users: [],
      error: '',
      stripe: null,
      card: null
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['user/loggedIn']
    },
    articles() {
      return this.$store.getters['project/articles']
    },
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    image: {
      get() {
        return this.$store.getters['project/image']
      },
      set(value) {
        this.$store.commit('project/setImage', value)
      }
    },
    personalProject() {
      return this.$store.getters['project/personalProject']
    },
    deleteOverlay() {
      return this.$store.getters['project/deleteOverlay']
    },
    articleId() {
      return this.$store.getters['project/articleId']
    },
    editOverlay() {
      return this.$store.getters['project/editOverlay']
    },
  },
  mounted() {
    // this.getComment(this.currentUser[0].id);
    // console.log(this.currentUser[0].displayName);
    // console.log(this.currentUser[0].id);
    // console.log(this.personalProject[0].displayName);
    // console.log(this.personalProject[0].id);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUser = user;
      }
    })
    // const db = firebase.firestore();
    // const docRef = db.collection('posts').doc(this.personalProject[0].id);
    // this.getEvent(docRef);
  },
  methods: {
    btnUploadChange(ev) {
      this.$store.dispatch('project/btnUploadChange', {
        ev
      });
    },
    getComment(id) {
      const db = firebase.firestore();
      db.collection('posts').doc(id).collection('comments')
        .orderBy('date', 'asc')
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.comments.push({
              displayName: doc.data().displayName,
              comment: doc.data().comment,
              image: doc.data().image,
              date: doc.data().date,
            })
            console.log(doc.data());
            console.log(doc.id);
          })
      })
    },
    addComment(id) {
      const db = firebase.firestore();
      db.collection('posts').doc(id).collection('comments').add({
        displayName: this.currentUser[0].displayName,
        comment: this.comment,
        image: this.currentUser[0].image,
        date: new Date().toLocaleString()
      })
      .then(() => {
        console.log(this.comment);
        this.displayName = ''
        this.comment = ''
        this.image = ''
        this.date = ''
        this.getComment(id);
      })
    },
    addMessage() {
      this.$store.dispatch('project/addMessage', {
        displayName: this.currentUser[0].displayName,
        displayImage: this.currentUser[0].image,
        name: this.name,
        place: this.place,
        comment: this.comment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.name = '';
      this.place = '';
      this.comment = '';
      this.date = '';
    },
    openModalForDelete(id) {
      this.$store.commit('project/openModalForDelete', {
        id
      });
    },
    closeModalForDelete() {
      this.$store.commit('project/closeModalForDelete');
    },
    deleteArticles(id) {
      console.log(id);
      this.$store.dispatch('project/deleteArticles', {
        id
      });
    },
    openModalForEdit(id) {
      this.$store.commit('project/openModalForEdit', {
        id
      });
    },
    closeModalForEdit() {
      this.$store.commit('project/closeModalForEdit');
    },
    editArticles(id) {
      this.$store.dispatch('project/editArticles', {
        id,
        name: this.name,
        place: this.place,
        comment: this.comment,
        image: this.image,
      });
      this.alertEdit = true;
      setTimeout(() => {
        this.alertEdit = false
      }, 3000);
      this.name = ''
      this.place = ''
      this.comment = ''
      this.image = ''
    },
    getEvent(docRef) {
      docRef.get().then(doc => {
        if (doc.exists) {
          console.log(doc.data());
          this.posts = doc.data();
          this.likeSum = this.posts.like_users.length;
          this.images = [...this.posts.image_users];
          this.nameUser = [...this.posts.name_users];
          this.applyFlag = this.posts.like_users.includes(this.loginUser.uid);
        } else {
          console.log(doc.data());
        }
      })
    },
    applyEvent() {
        const db = firebase.firestore();
        const docRef = db.collection('posts').doc(this.personalProject[0].id)
        docRef.set({
          displayImage: this.currentUser[0].image,
          like_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
          image_users: firebase.firestore.FieldValue.arrayUnion(this.currentUser[0].image),
          name_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.displayName),
        }, { merge: true })
        this.applyFlag = true;
        this.getEvent(docRef);
    },
    cancelEvent() {
        const db = firebase.firestore();
        const docRef = db.collection('posts').doc(this.personalProject[0].id)
        docRef.update({
          like_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
          image_users: firebase.firestore.FieldValue.arrayRemove(this.currentUser[0].image),
          name_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.displayName),
        })
        this.applyFlag = false;
        this.getEvent(docRef);
    },
  }
}
</script>

<style>

</style>
