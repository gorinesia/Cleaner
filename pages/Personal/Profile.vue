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
    <h2 class="mb-5" style="color: navy">Johnさんの発案中のイベント</h2>
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

                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <v-chip v-if="message.new" :color="`${message.color} lighten-4`" class="ml-0 mr-2 black--text" label small>
                      {{ message.new }} new
                    </v-chip>
                    <strong v-html="message.title"></strong>
                  </v-col>

                  <v-col v-if="message.excerpt" class="grey--text text-truncate hidden-sm-and-down">
                    &mdash;
                    {{ message.excerpt }}
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
    <h2 class="mb-5" style="color: navy">Johnさんのこれまでのプロジェクト</h2>
    <v-card class="mb-10">
      <v-col cols="10">
        <v-list-item three-line>
          <v-list-item-content>
            <v-row>
              <v-col cols="2">
                <div class="overline mb-1">10月12日</div>
              </v-col>
              <v-col cols="7">
                <p class="mb-5 font-weight-bold" style="color: orange">会社近くの神社です。</p>
              </v-col>
              <v-col cols="3">
                <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" alt="">
                </v-avatar>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-col>
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
