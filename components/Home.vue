<template>
  <v-app>
    <v-system-bar height="30" color="#00ACC1" style="text-align: center;" dark><span>まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</span></v-system-bar>
    <v-container class="container">
      <v-row>
        <v-col cols="6">
          <h1 style="color: navy">地球の未来のために<br>今目の前のゴミを拾おう</h1>
          <p>Cleanerは「地球の未来を考えて行動する<br>
          人々に対価を」をコンセプトとしたゴミ拾い<br>
          情報コミュニティです。</p>
          <v-btn rounded outlined color="cyan darken-1" large to="/Auth/Signup">いますぐはじめる</v-btn>
          <v-btn rounded color="primary" large dark>Cleanerについて</v-btn>
        </v-col>
        <v-col cols="6">
          <HomeHero />
        </v-col>
      </v-row>
    </v-container>
    <div style="text-align: center; color: #0D47A1; font-size: 30px">
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
    <h2 style="text-align: center; color: #00ACC1;">クリーナーをみる</h2>
    <p style="text-align: center;">クリーナーとは、お掃除屋さん(＝ゴミを拾う人)のことです。<br>
    あなたも地球を綺麗にするための清掃員になりませんか？</p>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card
            :loading="loading"
            class="mx-auto"
            max-width="275"
          >
            <!-- <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template> -->

            <v-img
              height="200"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title color="cyan darken-2">John</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
              </v-row>

              <div>London</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>最近の活動</v-card-title>

            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>10月12日</v-chip>
                <br>
                <v-chip>10月5日</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="cyan darken-2"
                text
                @click="reserve"
              >
                もっとみる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            :loading="loading"
            class="mx-auto"
            max-width="275"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="200"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title color="cyan darken-2">John</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <!-- <v-rating
                  :value="4"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating> -->

                <!-- <div class="grey--text ml-4">
                  4.5 (413)
                </div> -->
              </v-row>

              <!-- <div class="my-4 subtitle-1">
                $ • Italian, Cafe
              </div> -->

              <div>London</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>最近の活動</v-card-title>

            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>10月12日</v-chip>
                <br>
                <v-chip>10月5日</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="cyan darken-2"
                text
                @click="reserve"
              >
                もっとみる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            :loading="loading"
            class="mx-auto"
            max-width="275"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="200"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title color="cyan darken-2">John</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <!-- <v-rating
                  :value="4"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating> -->

                <!-- <div class="grey--text ml-4">
                  4.5 (413)
                </div> -->
              </v-row>

              <!-- <div class="my-4 subtitle-1">
                $ • Italian, Cafe
              </div> -->

              <div>London</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>最近の活動</v-card-title>

            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>10月12日</v-chip>
                <br>
                <v-chip>10月5日</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="cyan darken-2"
                text
                @click="reserve"
              >
                もっとみる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <h2 style="text-align: center; color: #00ACC1;">プロジェクトをみる</h2>
    <p style="text-align: center;">プロジェクトとは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
    あなたも日々のプロジェクトを気軽に投稿してみませんか？</p>
    <v-card class="container">
      <div class="row">
        <div class="col-md-4 my-3">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">test article1</h4>
              <h6 class="card-subtitle mb-2 text-muted">test articke1</h6>
              <p class="card-text">
                test article1, test article1, test article1, test article1, test article1
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-card>
    <h2 style="text-align: center; color: #00ACC1;">イベントをみる</h2>
    <p style="text-align: center;">イベントとは、みんなでゴミ拾いをするための企画のことです。<br>
    イベントを立ち上げて、みんなでゴミ拾いをしてみませんか？</p>
    <v-card class="container">
      <div class="row">
        <div class="col-md-4 my-3">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">test article1</h4>
              <h6 class="card-subtitle mb-2 text-muted">test articke1</h6>
              <p class="card-text">
                test article1, test article1, test article1, test article1, test article1
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-card>
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
