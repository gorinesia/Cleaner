<template>
  <v-app>
    <v-container fluid>
      <v-main app>
        <!-- <nuxt-link class="text-h5 cyan--text text--darken-1 font-weight-bold text-decoration-none" to="personal/profile">クリーナーをみる</nuxt-link>
        <v-container>
          <v-row v-for="loginUser in loginUsers" :key="loginUser.id">
            <v-col md="6">
              <v-card class="mb-5">
                <v-row>
                  <v-col cols="2">
                    <v-col align-self="start"  cols="12">
                      <v-avatar class="profile" color="grey" size="60">
                        <v-img :src="image_src"></v-img>
                      </v-avatar>
                    </v-col>
                  </v-col>
                  <v-col cols="10">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-3 font-weight-bold" style="color: #00ACC1;" to="/personal/profile">{{ loginUser. displayName }}</v-list-item-title>
                        <div class="overline mb-1">10月18日</div>
                        <p class="mb-5 font-weight-bold">ロンドンを綺麗にしましょう。</p>
                      </v-list-item-content>

                      <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                        <img :src="image_src" alt="">
                      </v-avatar>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container> -->
        <!-- <nuxt-link class="float-right grey--text text--darken-1 font-weight-bold mb-10 text-decoration-none mr-5" to="/list/cleaner">もっとみる</nuxt-link> -->
        <nuxt-link class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" to="/list/project">プロジェクト</nuxt-link>
        <v-container>
          <v-card class="mb-5">
            <template v-for="(article, index) in articles">
              <v-divider :key="index" />
              <v-hover v-slot="{ hover }">
                <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
                  <v-row  :key="article.id">
                    <v-col cols="3">
                      <v-avatar tile size="100" class="ml-5">
                        <v-img :src="article.image"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="4">
                      <!-- <v-col> -->
                        <v-avatar class="profile" color="grey" size="60">
                          <v-img :src="article.image"></v-img>
                        </v-avatar>
                        <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ article.name }}</span>
                        <p class="my-5 font-weight-bold">{{ article.messageComment }}</p>
                      <!-- </v-col> -->
                    </v-col>
                    <v-col cols="5">
                      <span class="grey--text float-right">{{ article.date}}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </template>
          </v-card>
        </v-container>
        <nuxt-link class="float-right font-weight-bold grey--text text--darken-1 text-decoration-none" to="/list/project">もっとみる</nuxt-link>
        <nuxt-link class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" to="/list/event">イベント</nuxt-link>
        <v-container>
          <v-row>
            <template v-for="(event, index) in events">
              <v-col :key="index" cols="12">
                <v-hover v-slot="{ hover }">
                  <v-card :class="{ 'on-hover': hover }" @click="getPersonalEvent(event.id)">
                    <!-- <v-divider :key="index" /> -->
                      <v-row :key="event.id" >
                        <v-col cols="9">
                          <v-col>
                            <v-avatar class="profile" color="grey" size="60">
                              <v-img :src="event.image"></v-img>
                            </v-avatar>
                            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ event.name }}</span>
                            <p class="my-5 font-weight-bold">{{ event.messageComment }}</p>
                            <span class="grey--text float-right">日時： {{ event.date }}</span>
                            <span class="grey--text float-right">場所： {{ event.place}}</span>
                          </v-col>
                        </v-col>
                        <v-col cols="3">
                          <v-avatar tile size="130">
                            <v-img :src="event.image"></v-img>
                          </v-avatar>
                        </v-col>
                      </v-row>
                  </v-card>
                </v-hover>
              </v-col>
            </template>
          </v-row>
        </v-container>
        <nuxt-link class="float-right font-weight-bold grey--text text--darken-1 text-decoration-none" to="/list/event">もっとみる</nuxt-link>
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
      dialog: false
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
    getPersonalId(id) {
      this.$store.dispatch('project/getPersonalData', {
        id
      })
      console.log(id)
    },
    getPersonalEvent(id) {
      this.$store.dispatch('event/getPersonalEvent', {
        id
      })
    }
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
