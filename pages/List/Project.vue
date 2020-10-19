<template>
  <v-app>
  <h2 style=" color: #00ACC1;">イベントをみる</h2>
    <v-container>
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
                      <v-card-text v-text="lorem"></v-card-text>
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

}
</script>

<style>

</style>
