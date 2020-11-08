<template>
  <v-app>
    <v-container>
      <v-main app>
        <!-- <v-tabs color="#EF6C00" class="mb-10" centered>
          <v-tab  v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.to" router exact>
            <v-icon>{{ menuItem.icon }}</v-icon>
            {{ menuItem.name }}
          </v-tab>
        </v-tabs> -->
        <!-- <h2 class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" align="center" justify="center">プロジェクト</h2>
        <v-container>
          <p style="text-align: center;">プロジェクトとは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
          あなたも日々のプロジェクトを気軽に投稿してみませんか？</p> -->

          <!-- <v-row justify="center" v-if="loggedIn">
            <v-dialog
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
              <v-card>
                <v-card-title>
                  <span class="headline">User Article</span>
                </v-card-title>
                <v-card-text>
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
            </v-dialog>
          </v-row> -->

          <!-- <v-card class="mb-5">
            <template v-for="(article, index) in articles">
              <v-divider :key="index" />
              <v-hover v-slot="{ hover }">
                <v-card :class="{ 'on-hover': hover }" @click="getPersonalProjectId(article.id)">
                  <v-row  :key="article.id">
                    <v-col cols="3">
                      <v-avatar tile size="100" class="ml-5">
                        <v-img :src="article.image"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="4">
                      <v-avatar class="profile" color="grey" size="60">
                        <v-img :src="article.image"></v-img>
                      </v-avatar>
                      <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ article.name }}</span>
                      <p class="my-5 font-weight-bold">{{ article.messageComment }}</p>
                    </v-col>
                    <v-col cols="5">
                      <span class="grey--text float-right">{{ article.date}}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </template>
          </v-card> -->
        <!-- </v-container> -->
        <!-- <nuxt-link class="float-right font-weight-bold grey--text text--darken-1 text-decoration-none" to="/loggedIn/project">もっとみる</nuxt-link> -->
        <!-- <nuxt-link class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" to="/loggedIn/event">イベント</nuxt-link> -->
        <!-- <v-container> -->
          <!-- <v-row>
            <template v-for="(event, index) in events">
              <v-col :key="index" cols="12">
                <v-hover v-slot="{ hover }">
                  <v-card :class="{ 'on-hover': hover }" @click="getPersonalEvent(event.id)">
                    <v-divider :key="index" /> -->
                      <!-- <v-row :key="event.id" >
                        <v-col cols="9">
                          <v-col>
                            <v-avatar class="profile" color="grey" size="60">
                              <v-img :src="event.image"></v-img>
                            </v-avatar>
                            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ event.name }}</span>
                            <p class="my-5 font-weight-bold">{{ event.messageComment }}</p>
                            <span class="grey--text">日時： {{ event.date }}</span>
                            <span class="grey--text float-right">場所： {{ event.place}}</span>
                          </v-col>
                        </v-col>
                        <v-col cols="3">
                          <v-avatar tile size="130">
                            <v-img :src="event.image"></v-img>
                          </v-avatar>
                        </v-col>
                      </v-row> -->
                  <!-- </v-card>
                </v-hover>
              </v-col>
            </template>
          </v-row> -->
        <!-- </v-container> -->
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'dashboard',
  layout: 'loggedIn',
  components: {
    Sidebar
  },
  data() {
    return {
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      date: this.$store.state.project.date,
      messageComment: this.$store.state.project.messageComment,
      users: [],
      image_src: require('@/assets/img/everyone.jpg'),
      item: 0,
      dialog: false,
      loggedIn: this.$store.state.user.loggedIn,
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    loginUsers() {
      return this.$store.getters['user/loginUsers']
    },
    articles() {
      return this.$store.getters['project/articles']
    },
    image: {
      get() {
        return this.$store.getters['project/image']
      },
      set(value) {
        this.$store.commit('project/setImage', value)
      }
    },
    events() {
      return this.$store.getters['event/articles']
    },
    image: {
      get() {
        return this.$store.getters['event/image']
      },
      set(value) {
        this.$store.commit('event/setImage', value)
      }
    }
  },
  mounted() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log(user)
    //   }
    // })
    this.$store.dispatch('user/logInUserDisplay');
    this.$store.dispatch('project/getMessage');
    this.$store.dispatch('event/getMessage');
  },
  methods: {
    getPersonalProjectId(id) {
      this.$store.dispatch('project/getPersonalProjectId', {
        id
      })
    },
    getPersonalEvent(id) {
      this.$store.dispatch('event/getPersonalEvent', {
        id
      })
    },
    btnUploadChange(ev) {
      this.$store.dispatch('project/btnUploadChange', {
        ev
      });
    },
    addMessage() {
      this.$store.dispatch('project/addMessage', {
        name: this.name,
        place: this.place,
        comment: this.messageComment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.name = '';
      this.place = '';
      this.messageComment = '';
      this.date = '';
    },
    getPersonalId(id) {
      this.$store.dispatch('project/getPersonalData', {
        id
      })
    },
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.v-card.on-hover {
  background-color: #ECEFF1;
  // opacity: 0.6;
 }
</style>
