<template>
  <v-app>
    <v-system-bar height="30" color="#00ACC1" dark class="white--text  font-weight-bold justify-center"><span>まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</span></v-system-bar>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <Sidebar />
        </v-col>

        <v-col cols="9">
          <!-- <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
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
          <v-main app>
            <nuxt-link class="text-h5 cyan--text text--darken-1 font-weight-bold text-decoration-none" to="personal/profile">クリーナーをみる</nuxt-link>
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
            </v-container>
            <nuxt-link class="float-right grey--text text--darken-1 font-weight-bold mb-10 text-decoration-none mr-5" to="/list/cleaner">もっとみる</nuxt-link>
            <nuxt-link class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" to="/list/project">プロジェクトをみる</nuxt-link>
            <v-container>
              <v-card class="mb-5">
                <template v-for="(article, index) in articles">
                  <v-divider :key="index" />
                  <v-hover v-slot="{ hover }">
                    <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
                      <v-row  :key="article.id">
                        <v-col cols="3">
                          <v-avatar tile size="130" class="ml-5">
                            <v-img :src="article.image"></v-img>
                          </v-avatar>
                        </v-col>
                        <v-col cols="9">
                          <v-col>
                            <v-avatar class="profile" color="grey" size="60">
                              <v-img :src="article.image"></v-img>
                            </v-avatar>
                            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ article.name }}</span>
                            <p class="my-5 font-weight-bold">{{ article.messageComment }}</p>
                            <span class="grey--text float-right">{{article.date }}</span>
                          </v-col>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-hover>
                </template>
              </v-card>
            </v-container>
            <span class="float-right font-weight-bold">もっとみる</span>
            <nuxt-link class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" to="/list/event">イベントをみる</nuxt-link>
            <v-container>
              <template v-for="(article, index) in articles">
                <v-divider :key="index" />
                <v-hover v-slot="{ hover }">
                  <v-card :class="{ 'on-hover': hover }">
                    <v-row :key="article.id" >
                      <v-col cols="9">
                        <v-col>
                          <v-avatar class="profile" color="grey" size="60">
                            <v-img :src="article.image"></v-img>
                          </v-avatar>
                          <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ article.name }}</span>
                          <p class="my-5 font-weight-bold">{{ article.messageComment }}</p>
                          <span class="grey--text float-right">日時： {{ article.date }}</span>
                          <span class="grey--text float-right">場所： {{ article.place}}</span>
                        </v-col>
                      </v-col>
                      <v-col cols="3">
                        <v-avatar tile size="130" class="ml-5">
                          <v-img :src="article.image"></v-img>
                        </v-avatar>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-hover>
              </template>
            </v-container>
            <span class="float-right font-weight-bold">もっとみる</span>
          </v-main>
        </v-col>
      </v-row>
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
  },
  mounted() {
    this.$store.dispatch('user/logInUserDisplay');
    this.$store.dispatch('project/getMessage');
  },
  methods: {
    getPersonalId(id) {
      this.$store.dispatch('project/getPersonalData', {
        id
      })
      console.log(id)
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
  background-color: #FAFAFA;
  // opacity: 0.6;
 }
</style>
