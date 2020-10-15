<template>
  <v-app>
    <v-container class="container">
      <v-row>
        <v-col cols="6">
          <h1 class+display-3 style="color: navy">地球の未来のために<br>今目の前のゴミを拾おう</h1>
          <p>Cleanerは「地球の未来を考えて行動する<br>
          人々に対価を」をコンセプトとしたゴミ拾い<br>
          情報コミュニティです。</p>
          <v-btn rounded outlined color="cyan darken-1" large>いますぐはじめる</v-btn>
          <v-btn rounded color="primary" large dark>Cleanerについて</v-btn>
        </v-col>
        <v-col cols="6">
          <HomeHero />
        </v-col>
      </v-row>
    </v-container>
    <div style="text-align: center; color: navy; font-size: 30px">
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
  }
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
