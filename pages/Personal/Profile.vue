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
    <h2 class="mb-5" style="color: navy" @click="$router.push('/personal/personalEvent')">Johnさんの発案中のイベント</h2>
    <v-card class="mb-10" outlined>
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
    <h2 class="mb-5" style="color: navy" @click="$router.push('/personal/personalProject')">Johnさんのこれまでのプロジェクト</h2>
    <v-card class="mb-10">
      <v-col cols="10">
        <v-list-item three-line>
          <!-- <v-list-item-content> -->
            <v-row>
              <v-col cols="2">
                <div class="overline">10月12日</div>
              </v-col>
              <v-col cols="8">
                <p class="mb-5 font-weight-bold" style="color: orange">会社近くの神社です。</p>
                <p>今日はいつも通る会社近くの神社のゴミ拾いをしました。あまりゴミ自体は多くなかったですが、綺麗になったので気持ちいいです。</p>
              </v-col>
              <v-col cols="2">
                <v-avatar tile size="150" width="300px" :src="image_src">
                  <img :src="image_src" alt="">
                </v-avatar>
              </v-col>
            </v-row>
          <!-- </v-list-item-content> -->
        </v-list-item>
      </v-col>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'profile',
  layout: 'loggedIn',
  data() {
    return {
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
  }
}
</script>

<style>

</style>
