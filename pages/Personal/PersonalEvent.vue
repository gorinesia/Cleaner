<template>
  <v-app class="mx-10" style="color: navy">
    <v-card outlined class="cyan mb-10">
      <v-row  class="fill-height">
        <v-col align-self="start"  cols="2">
          <v-avatar class="profile" color="grey" size="100">
            <v-img :src="image_src"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold title text-h4" dark>
                John
              </v-list-item-title>
              <v-list-item-subtitle class="mb-5">Network Engineer</v-list-item-subtitle>
              <p>世界が綺麗になればいいなと思って日々活動しています。よろしくお願いいたします。</p>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
    <h2 class="mb-5">Johnさんの発案中のイベント</h2>
    <v-card align="center" class="mb-10">
      <v-row>
        <v-col cols="2">
          <p>10月30日</p>
        </v-col>
        <v-col class="font-weight-bold text-h5" cols="6">
          <p>渋谷の路上でゴミを拾います。</p>
        </v-col>
        <v-col cols="2">
          <p>日時：10月30日 9:00~12:00</p>
        </v-col>
        <v-col cols="2">
          <p>場所：東京都渋谷区</p>
        </v-col>
      </v-row>
      <v-img
        height="200"
        :src="image_src"
      ></v-img>
      <p class="ma-2">僕たちにできることを。人もゴミを多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
      <v-btn class="float-right ma-5" rounded color="orange" dark x-large>参加する</v-btn>
    </v-card>
    <v-container clss="h-full flex flex-col ml-6">
      <v-card class="border border-gray-900 rounded mb-4">
        <v-textarea background-color="grey lighten-2" class="w-full pt-4 pl-8 outline-none" placeholder="XXXXへのメッセージ"></v-textarea>
        <v-btn class="cyan text-sm white--text font-bold py-1 px-2 rouded">送信</v-btn>
      </v-card>
    </v-container>
    <v-card color="#E0F7FA" class="rounded-xl pa-5 mb-10" rounded>
      <h2 class="mx-10">クリーナーを応援しよう</h2>
      <v-row>
        <v-col cols="9">
          <v-avatar class="profile mx-10" color="grey" size="50">
            <v-img :src="image_src"></v-img>
          </v-avatar>
          <p class="mb-10 mx-10">Johnさんの行動に対してお金を送ってサポートすることが出来ます。</p>
          <v-btn color="#0D47A1" class="mx-10" rounded x-large dark>サポートする</v-btn>
        </v-col>
        <v-col cols="3">
          <v-avatar tile size="200" color="cyan" :src="image_src" class="mx-5">
            <img :src="image_src" alt="">
          </v-avatar>
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'personalEvent',
  layout: 'loggedIn',
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
    }
  }
}
</script>

<style>

</style>
