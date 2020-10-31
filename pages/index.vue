<template>
  <v-app class="blue-grey lighten-5">
    <v-system-bar height="30" color="#00ACC1" dark class="white--text font-weight-bold justify-center"><nuxt-link class="white--text text-decoration-none" to="auth/signup">まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</nuxt-link></v-system-bar>
    <v-container class="container">
      <v-row>
        <v-col cols="6">
          <h1 style="color: navy">地球の未来のために<br>今目の前のゴミを拾おう</h1>
          <p>Cleanerは「地球の未来を考えて行動する<br>
          人々に対価を」をコンセプトとしたゴミ拾い<br>
          情報コミュニティです。</p>
          <v-btn class="mb-5" rounded outlined color="cyan darken-1" x-large to="/Auth/Signup">いますぐはじめる</v-btn><br>
          <v-btn class="text-capitalize" rounded color="primary" x-large dark to="aboutcleaner">Cleanerについて</v-btn>
        </v-col>
        <v-col cols="6">
          <HomeHero />
        </v-col>
      </v-row>
    </v-container>
    <div style="color: #0D47A1;" class="text-h4 font-weight-bold" align="center" justify="center">
      Cleanerでできること
    </div>
    <Information />
    <!-- <h2 class="mb-5 cy cyan--text text--darken-1" align="center" justify="center">クリーナーをみる</h2>
    <p style="text-align: center;">クリーナーとは、お掃除屋さん(＝ゴミを拾う人)のことです。<br>
    あなたも地球を綺麗にするための清掃員になりませんか？</p>
    <v-container>
      <v-row v-for="allUser in allUsers" :key="allUser.id">
        <v-col>
          <v-card class="mb-5">
            <v-row>
              <v-col cols="3">
                <v-col align-self="start"  cols="12">
                  <v-avatar class="profile" color="grey" size="60">
                    <v-img :src="image_src"></v-img>
                  </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="9">
                <v-list three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ allUser.displayName }}</v-list-item-title>
                    <div class="overline mb-1">{{ }}</div>
                    <v-list-item-subtitle class="overline mb-1">{{ }}</v-list-item-subtitle>
                    <p class="mb-5 font-weight-bold">{{ }}</p>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                    <img :src="image_src">
                  </v-list-item-avatar>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
    <h2 style="text-align: center; color: #00ACC1;">プロジェクトをみる</h2>
    <p style="text-align: center;">プロジェクトとは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
    あなたも日々のプロジェクトを気軽に投稿してみませんか？</p>
    <v-container>
      <v-card class="mb-5">
        <template v-for="(article, index) in articles">
          <v-divider :key="index" />
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
        </template>
      </v-card>
    </v-container>
    <h2 style="text-align: center; color: #00ACC1;" class="my-5">イベントをみる</h2>
    <p style="text-align: center;">イベントとは、みんなでゴミ拾いをするための企画のことです。<br>
    イベントを立ち上げて、みんなでゴミ拾いをしてみませんか？</p>
    <v-container>
      <v-card>
        <template v-for="(article, index) in articles">
          <v-divider :key="index" />
          <v-row  :key="article.id">
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
        </template>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import HomeHero from '@/components/HomeHero.vue'
import Information from '@/components/Information.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'home',
  components: {
    HomeHero,
    Information
  },
  data() {
    return {
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      date: this.$store.state.project.date,
      messageComment: this.$store.state.project.messageComment,
      loading: false,
      selection: 1,
      image_src: require('@/assets/img/doing3.jpg'),
      messages: [
        {
          avatar: 'image_src',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          excerpt: 'Thank you for joining our comminity...',
        }
      ]
    }
  },
  computed: {
    allUsers() {
      return this.$store.getters['user/allUsers']
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
}
</script>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
