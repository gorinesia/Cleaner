<template>
  <v-app class="mx-10" style="color: navy">
    <div  @click="$router.push('/')">Cleaner</div>
    <div @click="$router.push('/list/cleaner')">クリーナーをみる</div>
    <div @click="$router.push('/personal/profile')">John</div>
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
      <v-btn class="float-right" rounded color="#0D47A1" dark x-large>サポートする</v-btn>
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
      <p>僕たちにできることを。人もゴミを多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
      <!-- <v-expansion-panels popout> -->
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

              <v-col class="text-no-wrap" cols="5" sm="3">
                <v-chip v-if="message.new" :color="`${message.color} lighten-4`" class="ml-0 mr-2 black--text" label small>
                  {{ message.new }} new
                </v-chip>
                <strong v-html="message.title"></strong>
              </v-col>

            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text></v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      <!-- </v-expansion-panels> -->
      <v-btn rounded class="orange" dark x-large>参加する</v-btn>
    </v-card>
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
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
      messages: [
        {
          avatar: 'image_src',
          name: 'John',
          title: 'Welcome to Vuetify!',
        }
      ]
    }
  }
}
</script>

<style>

</style>
