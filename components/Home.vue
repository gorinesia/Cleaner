<template>
  <v-app class="blue-grey lighten-5">
    <v-system-bar height="30" color="#00ACC1" dark><span style="text-align: center;">まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</span></v-system-bar>
    <v-container class="container">
      <v-row>
        <v-col cols="6">
          <h1 style="color: navy">地球の未来のために<br>今目の前のゴミを拾おう</h1>
          <p>Cleanerは「地球の未来を考えて行動する<br>
          人々に対価を」をコンセプトとしたゴミ拾い<br>
          情報コミュニティです。</p>
          <v-btn class="mb-5" rounded outlined color="cyan darken-1" x-large to="/Auth/Signup">いますぐはじめる</v-btn><br>
          <v-btn rounded color="primary" x-large dark>Cleanerについて</v-btn>
        </v-col>
        <v-col cols="6">
          <HomeHero />
        </v-col>
      </v-row>
    </v-container>
    <div style="text-align: center; color: #0D47A1;" class="text-h4 font-weight-bold">
      Cleanerでできること
    </div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <div>誰でもできる</div>
          <img src="~/assets/img/lonly.jpg">
          <p>あなた自身がクリーナー(掃除屋)となり、ゴミ<br>拾いを「プロジェクト」として、はじめること<br>
          ができます。<br>
          マイページで日々のプロジェクトを気軽に投稿<br>
          できます。</p>
        </v-col>
        <v-col cols="4">
          <div>みんなでできる</div>
          <img src="~/assets/img/everyone.jpg">
          <p>イベントを企画して、自分のプロジェクトに仲間を<br>募ったり、誰かのプロジェクトに参加することもで<br>
          きます。</p>
        </v-col>
        <v-col cols="4">
          <div>誰かをサポートできる</div>
          <img src="~/assets/img/support.jpg">
          <p>あなたのプロフィールページやあなたの企画したプロ<br>ジェクトに対して、<br>
          ”あなたのその行動には価値がある。”<br>
          そう思ってくれた人は、あなたに対して金銭的なサポ<br>
          ートを渡すことができます。</p>
        </v-col>
      </v-row>
    </v-container>
    <h2 style="text-align: center; color: #00ACC1;" class="mb-5">クリーナーをみる</h2>
    <p style="text-align: center;">クリーナーとは、お掃除屋さん(＝ゴミを拾う人)のことです。<br>
    あなたも地球を綺麗にするための清掃員になりませんか？</p>
    <v-container>
      <v-row>
        <v-col cols="4">
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
                    <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</div>
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
        <v-col cols="4">
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
                    <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</div>
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
        <v-col cols="4">
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
                    <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</div>
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
    <h2 style="text-align: center; color: #00ACC1;">プロジェクトをみる</h2>
    <p style="text-align: center;">プロジェクトとは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
    あなたも日々のプロジェクトを気軽に投稿してみませんか？</p>
    <v-card class="mb-5 container">
      <v-row>
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
            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</span>
            <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
            <span class="grey--text float-right">10分前</span>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mb-5 container">
      <v-row>
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
            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</span>
            <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
            <span class="grey--text float-right">10分前</span>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mb-5 container">
      <v-row>
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
            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</span>
            <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
            <span class="grey--text float-right">10分前</span>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <h2 style="text-align: center; color: #00ACC1;" class="my-5">イベントをみる</h2>
    <p style="text-align: center;">イベントとは、みんなでゴミ拾いをするための企画のことです。<br>
    イベントを立ち上げて、みんなでゴミ拾いをしてみませんか？</p>
    <v-container to="/list/event">
      <v-row>
        <v-col cols="4">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-1">10月18日</div>
                <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
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
        <v-col cols="4">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-1">10月18日</div>
                <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
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
        <v-col cols="4">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-1">10月18日</div>
                <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
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
    </v-container>
  </v-app>
</template>

<script>
import HomeHero from './HomeHero.vue'

export default {
  components: {
    HomeHero
  },
  data: () => ({
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
  }),

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
