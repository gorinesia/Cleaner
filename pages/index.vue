<template>
  <v-app class="blue-grey lighten-5">
    <v-system-bar height="35" color="#00ACC1" dark class="white--text font-weight-bold justify-center pa-5"><nuxt-link class="white--text text-decoration-none" to="auth/signup">綺麗な世界は自分たちの手で創り上げていこう！</nuxt-link></v-system-bar>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" align="center" justify="center">
          <h1 style="color: navy">地球の未来のために<br>今目の前のゴミを拾おう</h1>
          <p>Cleanerは「地球の未来を考えて行動する<br>
          人々に対価を」をコンセプトとしたゴミ拾い<br>
          情報コミュニティです。</p>
          <v-btn class="mb-5" rounded outlined color="cyan darken-1" x-large to="/Auth/Signup">いますぐはじめる</v-btn><br>
          <v-btn class="text-capitalize" rounded color="primary" x-large dark to="/About">Cleanerについて</v-btn>
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

    <v-container class="mb-10">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="cyan darken-1"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider color="orange"></v-tabs-slider>

          <v-tab>
            プロジェクト
            <v-icon>mdi-tooltip</v-icon>
          </v-tab>

          <v-tab>
            イベント
            <v-icon>mdi-calendar</v-icon>
          </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
          >
            <v-card flat align="center" justify="center">
              <p class="my-5"><span class="font-weight-bold">プロジェクト</span>とは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
              あなたも日々のプロジェクトを気軽に投稿してみませんか？</p>
              <v-btn class="mb-5" color="cyan darken-1" align="center" justify="center" rounded  large dark to="/list/project">プロジェクトをみる</v-btn>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat align="center" justify="center">
              <p class="my-5"><span class="font-weight-bold">イベント</span>とは、みんなでゴミ拾いをするための企画のことです。<br>
              イベントを立ち上げて、みんなでゴミ拾いをしてみませんか？</p>
              <v-btn class="mb-5" color="cyan darken-1"  rounded  large dark to="/list/event">イベントをみる</v-btn>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>

  </v-app>
</template>

<script>
import Information from '@/components/Information.vue'

export default {
  name: 'home',
  components: {
    Information
  },
  data() {
    return {
      menuItems: [
        {
          name: 'プロジェクトをみる',
          icon: 'mdi-tooltip',
        },
        {
          name: 'イベントをみる',
          icon: 'mdi-calendar',
        },
      ],
      tab: null
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

.home-hero__content {
  background: url('../assets/img/top-page.jpg');
  background-size: cover;
  width: 500px;
  height: 300px;
  margin-right: 20px;
  border-radius: 20%;
  justify-items: center;
}
</style>
