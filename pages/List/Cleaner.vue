<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-card class="mx-auto" outlined>
            <v-row align="end" class="fill-height">
              <v-col align-self="start"  cols="12">
                <v-avatar class="profile" color="grey" size="164">
                  <v-img :src="image_src"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)">
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold title" style="color: #00ACC1">
                      AKI
                    </v-list-item-title>
                    <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="10">
          <h2 style="color: #00ACC1; margin-bottom: 10px">クリーナーをみる</h2>
          <v-card class="mb-5">
            <v-row>
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                  <v-avatar class="profile" color="grey" size="120">
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

                  <v-avatar tile size="200" color="cyan" :src="image_src" class="ml-5">
                    <img :src="image_src" alt="">
                  </v-avatar>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">John</div>
                <div class="overline mb-1">10月18日</div>
                <p class="mb-5">ロンドンを綺麗にしましょう。</p>
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
        </v-col>
      </v-row>
    </v-container>
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
      ],
    }
  }
}
</script>

<style>

</style>
