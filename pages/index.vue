<template>
  <v-app class="blue-grey lighten-5">
    <v-system-bar height="30" color="#00ACC1" dark class="white--text font-weight-bold justify-center"><nuxt-link class="white--text text-decoration-none" to="auth/signup">まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</nuxt-link></v-system-bar>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" align="center" justify="center">
          <h1 style="color: navy">地球の未来のために<br>今目の前のゴミを拾おう</h1>
          <p>Cleanerは「地球の未来を考えて行動する<br>
          人々に対価を」をコンセプトとしたゴミ拾い<br>
          情報コミュニティです。</p>
          <v-btn class="mb-5" rounded outlined color="cyan darken-1" x-large to="/Auth/Signup">いますぐはじめる</v-btn><br>
          <v-btn class="text-capitalize" rounded color="primary" x-large dark to="aboutcleaner">Cleanerについて</v-btn>
        </v-col>
        <v-col cols="12" md="6" align="center" justify="center">
            <v-img fluid fill-height class="home-hero__content">
            </v-img>
        </v-col>
      </v-row>
    </v-container>
    <div style="color: #0D47A1;" class="text-h4 font-weight-bold" align="center" justify="center">
      Cleanerでできること
    </div>
    <Information />
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
        <template v-for="(article, index) in events">
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
import Information from '@/components/Information.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'home',
  components: {
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
      image_src: require('@/assets/img/top-page.jpg'),
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
}
</script>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.home-hero__content {
  background: url('../assets/img/top-page.jpg');
  background-size: cover;
  // background-position: center;
  width: 500px;
  height: 300px;
  // float: right;
  margin-right: 20px;
  border-radius: 20%;
  justify-items: center;
}
</style>
