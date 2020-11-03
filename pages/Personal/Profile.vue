<template>
  <v-app class="mx-10">
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
              <v-list-item-title class="font-weight-bold title" dark>
                John
              </v-list-item-title>
              <v-list-item-subtitle class="mb-5">Network Engineer</v-list-item-subtitle>
              <p>世界が綺麗になればいいなと思って日々活動しています。よろしくお願いいたします。</p>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-tabs
        v-model="tabs"
        background-color="cyan darken-1"
        centered
        dark
        icons-and-text
      >
        <v-tab
          v-for="n in items"
          :key="n"
        >
        {{ n }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card flat>
            <v-list-item three-line>
              <v-row>
                <v-col cols="2">
                  <div class="overline">10月12日</div>
                </v-col>
                <v-col cols="8">
                  <p class="mb-5 font-weight-bold" style="color: orange">会社近くの神社です。</p>
                  <p>今日はいつも通る会社近くの神社のゴミ拾いをしました。あまりゴミ自体は多くなかったですが、綺麗になったので気持ちいいです。</p>
                </v-col>
                <v-col cols="2">
                  <v-avatar tile size="150" width="120px" :src="image_src">
                    <img :src="image_src" alt="">
                  </v-avatar>
                </v-col>
              </v-row>
            </v-list-item>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-1">1030日</div>
                <div class="headline mb-3 font-weight-bold">渋谷の路上でゴミを拾います。</div>
                <p class="mb-5">僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
                <p class="font-weight-bold">日時： 10月3日  9:00~12:00</p>
                <p class="font-weight-bold">場所： 東京都渋谷区</p>
              </v-list-item-content>

              <v-avatar tile size="200" color="cyan" :src="image_src" class="ml-5">
                <img :src="image_src" alt="">
              </v-avatar>
            </v-list-item>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'profile',
  layout: 'loggedIn',
  data() {
    return {
      tabs: null,
      items: [
        'プロジェクト', 'イベント',
      ],
      image_src: require('@/assets/img/everyone.jpg'),
    }
  }
}
</script>

<style>

</style>
