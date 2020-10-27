<template>
  <v-app class="blue-grey lighten-5">
    <v-system-bar height="30" color="#00ACC1" dark class="white--text font-weight-bold justify-center"><span>まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</span></v-system-bar>
    <v-container class="container">
      <v-row>
        <v-col cols="6">
          <h1 style="color: navy">地球の未来のために<br>今目の前のゴミを拾おう</h1>
          <p>Cleanerは「地球の未来を考えて行動する<br>
          人々に対価を」をコンセプトとしたゴミ拾い<br>
          情報コミュニティです。</p>
          <v-btn class="mb-5" rounded outlined color="cyan darken-1" x-large to="/Auth/Signup">いますぐはじめる</v-btn><br>
          <v-btn class="text-capitalize" rounded color="primary" x-large dark>Cleanerについて</v-btn>
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
    <h2 style="text-align: center; color: #00ACC1;" class="mb-5">クリーナーをみる</h2>
    <p style="text-align: center;">クリーナーとは、お掃除屋さん(＝ゴミを拾う人)のことです。<br>
    あなたも地球を綺麗にするための清掃員になりませんか？</p>
    <v-container>
      <v-row>
        <v-col cols="4" v-for="allUser in allUsers" :key="allUser.id">
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
                <v-list three-line>
                  <v-list-item-content>
                    <v-list-item-subtitle class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ allUser.name }}</v-list-item-subtitle>
                    <div class="overline mb-1">{{ allUser.date }}</div>
                    <v-list-item-subtitle class="overline mb-1">{{ allUser.place }}</v-list-item-subtitle>
                    <p class="mb-5 font-weight-bold">{{ allUser.comment }}</p>
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
    </v-container>
    <h2 style="text-align: center; color: #00ACC1;">プロジェクトをみる</h2>
    <p style="text-align: center;">プロジェクトとは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
    あなたも日々のプロジェクトを気軽に投稿してみませんか？</p>
    <v-card class="mb-5 container">
      <v-row v-for="allUser in allUsers" :key="allUser.id">
        <v-col cols="3">
          <v-avatar tile size="130" color="cyan" :src="image_src" class="ml-5">
            <img :src="image_src" alt="">
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <v-col>
            <v-avatar class="profile" color="grey" size="60">
              <v-img :src="image_src"></v-img>
            </v-avatar>
            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ allUser.name }}</span>
            <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
            <span class="grey--text float-right">{{ allUser.date }}</span>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <h2 style="text-align: center; color: #00ACC1;" class="my-5">イベントをみる</h2>
    <p style="text-align: center;">イベントとは、みんなでゴミ拾いをするための企画のことです。<br>
    イベントを立ち上げて、みんなでゴミ拾いをしてみませんか？</p>
    <v-container>
      <nuxt-link to="/list/event">
        <v-row>
          <v-col cols="4" v-for="allUser in allUsers" :key="allUser.id">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">{{ allUser.place }}</div>
                  <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ allUser.comment }}</div>
                  <p class="mb-5">僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
                  <p class="font-weight-bold">日時： 10月3日  9:00~12:00</p>
                  <p class="font-weight-bold">場所： 東京都渋谷区</p>
                </v-list-item-content>

                <v-avatar tile size="150" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" alt="">
                </v-avatar>
              </v-list-item>

              <v-container fluid>
                <v-row justify="center">
                  <v-expansion-panels popout>
                    <v-expansion-panel v-for="(message, i) in messages" :key="i" hide-actions>
                      <v-expansion-panel-header>
                        <v-row align="center" class="spacer" no-gutters>
                          <v-col cols="4" sm="2" md="1">
                            <v-avatar size="36px">
                              <img v-if="message.avatar" :src="image_src" alt="">
                              <v-icon v-else :color="message.color" v-text="message.icon"></v-icon>
                            </v-avatar>
                          </v-col>

                          <v-col class="hidden-xs-only" sm="5" md="3">
                            <strong v-html="message.name"></strong>
                            <span v-if="message.total" class="grey--text">
                              &nbsp;({{ message.total }})
                            </span>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-divider></v-divider>
                        <v-card-text></v-card-text>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </nuxt-link>
    </v-container>
  </v-app>
</template>

<script>
import HomeHero from './HomeHero.vue'
import Information from './Information.vue'
import firebase from '@/plugins/firebase'

export default {
  components: {
    HomeHero,
    Information
  },
  data() {
    return {
      allUsers: [],
      loading: false,
      selection: 1,
      image_src: require('@/assets/img/everyone.jpg'),
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
  mounted () {
    const db = firebase.firestore();
    db.collection('users')
      .get()
      .then((querySnapShot) => {
        const allUsers = [];
        querySnapShot.forEach((doc) => {
          allUsers.push({
            name: doc.data().name,
            place: doc.data().place,
            date: new Date(),
            comment: doc.data().comment
          })
        })
        console.log(allUsers)
        this.allUsers = allUsers
      })
  },
  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 50px;
}

h1 {
  margin-bottom: 20px;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
