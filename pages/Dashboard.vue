<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-navigation-drawer>
            <v-system-bar></v-system-bar>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="image_src"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="title grey--text text--darken-2">
                    Akinori
                  </v-list-item-title>
                  <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-menu-down</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>

            <v-list nav dense></v-list>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </v-col>

        <v-col cols="9">
          <v-main app>
            <h2 style="; color: #00ACC1;">クリーナーをみる</h2>
            <v-container class="spacing-playground mb-10">
              <v-row>
                <v-col cols="4">
                  <v-card
                    class="mx-auto"
                    max-width="275"
                  >
                    <v-img
                      height="200"
                      :src="image_src"
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
                        active-class="deep-purple accent-4 white--text"
                        column
                      >
                        <v-chip>10月12日</v-chip>
                        <v-chip>10月5日</v-chip>
                      </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                        color="cyan darken-2"
                        text
                      >
                        もっとみる
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="4">
                  <v-card
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
                      </v-row>

                      <div>London</div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-title>最近の活動</v-card-title>

                    <v-card-text>
                      <v-chip-group
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
                      >
                        もっとみる
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <v-card
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
                      </v-row>

                      <div>London</div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-title>最近の活動</v-card-title>

                    <v-card-text>
                      <v-chip-group
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
                      >
                        もっとみる
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <h2 style="; color: #00ACC1;">プロジェクトをみる</h2>
            <v-card class="container">
              <div class="row">
                <div class="">
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
            <v-container class="spacing-playground mb-10">
              <v-card>
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
            </v-container>
            <h2 style=" color: #00ACC1;">イベントをみる</h2>
            <v-btn to="/list/event">Event</v-btn>
            <v-container to="/list/event">
              <v-row>
                <v-col cols="6">
                  <v-card class="container">
                    <div class="row">
                      <div class="col-md-4 my-3">
                        <div class="card">
                          <div class="card-body">
                            <h4 class="card-title">東京を綺麗にしましょう</h4>
                            <h6 class="card-subtitle mb-2 text-muted">test articke1</h6>
                            <p class="card-text">
                              test article1, test article1, test article1, test article1, test article1
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="container">
                    <div class="row">
                      <div class="col-md-4 my-3">
                        <div class="card">
                          <div class="card-body">
                            <h4 class="card-title">渋谷を片付けましょう</h4>
                            <h6 class="card-subtitle mb-2 text-muted">test articke1</h6>
                            <p class="card-text">
                              test article1, test article1, test article1, test article1, test article1
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-1">10月18日</div>
                        <div class="headline mb-3" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
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
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
      item: 0,
      items: [
        {
          text: 'My Files',
          icon: 'mdi-folder',
          lists: ['Quick Start', 'Pre-made layouts']
        },
        {
          text: 'Shared with me',
          icon: 'mdi-account-multiple'
        },
        {
          text: 'Starred',
          icon: 'mdi-star',
          lists: ['Colors', 'Content', 'Display']
        },
        {
          text: 'Recent',
          icon: 'mdi-history',
          lists: ['API explorer', 'Alerts']
        },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
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
