<template>
  <v-app>
    <v-system-bar height="30" color="#00ACC1" dark class="white--text  font-weight-bold justify-center"><span>まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</span></v-system-bar>
    <v-container fluid>
      <v-row v-for="currentUser in currentUser" :key="currentUser.id">
        <v-col cols="3">
          <v-card height="350px" class="ml-7">
            <v-navigation-drawer absolute permanent>
              <template v-slot:prepend>
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <img :src="image_src">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="cyan--text text--darken-1 font-weight-bold text-h5">{{ currentUser.displayName }}</v-list-item-title>
                    <v-list-item-subtitle>ログイン中</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="item  in items" :key="item.title" :to="item.link">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  large
                  color="cyan darken-1"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Article</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <label class="postImage-appendBtn"></label>
                    <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
                    <label>名前</label>
                    <v-text-field v-model="name" class="white"></v-text-field>
                    <label>場所</label>
                    <v-text-field v-model="place" class="white"></v-text-field>
                    <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
                    <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-main app>
            <nuxt-link class="text-h5 cyan--text text-darken-1 font-weight-bold text-decoration-none" to="personal/profile">クリーナーをみる</nuxt-link>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-card class="mb-5">
                    <v-row>
                      <v-col cols="2">
                        <v-col align-self="start"  cols="12">
                          <v-avatar class="profile" color="grey" size="60">
                            <v-img :src="image_src"></v-img>
                          </v-avatar>
                        </v-col>
                      </v-col>
                      <v-col cols="10">
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-list-item-title class="headline mb-3 font-weight-bold" style="color: #00ACC1;" to="/personal/profile">John</v-list-item-title>
                            <div class="overline mb-1">10月18日</div>
                            <p class="mb-5 font-weight-bold">ロンドンを綺麗にしましょう。</p>
                          </v-list-item-content>

                          <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                            <img :src="image_src" alt="">
                          </v-avatar>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="mb-5">
                    <v-row>
                      <v-col cols="2">
                        <v-col align-self="start"  cols="12">
                          <v-avatar class="profile" color="grey" size="60">
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

                          <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                            <img :src="image_src" alt="">
                          </v-avatar>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="mb-5">
                    <v-row>
                      <v-col cols="2">
                        <v-col align-self="start"  cols="12">
                          <v-avatar class="profile" color="grey" size="60">
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

                          <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                            <img :src="image_src" alt="">
                          </v-avatar>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="mb-5">
                    <v-row>
                      <v-col cols="2">
                        <v-col align-self="start"  cols="12">
                          <v-avatar class="profile" color="grey" size="60">
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

                          <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                            <img :src="image_src" alt="">
                          </v-avatar>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <div class="float-right font-weight-bold mb-10">もっとみる</div>
            <nuxt-link class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" to="/list/project">プロジェクトをみる</nuxt-link>
            <v-card class="mb-5">
              <v-row>
                <v-col cols="3">
                  <v-avatar tile size="130" color="cyan" :src="image_src" class="ml-5">
                      <img :src="image_src" alt="">
                    </v-avatar>

                </v-col>
                <v-col cols="9">
                  <v-col>
                    <v-avatar class="profile" color="grey" size="60">
                      <v-img :src="image_src"></v-img>
                    </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</span>
                    <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
                    <span class="grey--text float-right">10分前</span>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-5">
              <v-row>
                <v-col cols="3">
                  <v-avatar tile size="130" color="cyan" :src="image_src" class="ml-5">
                      <img :src="image_src" alt="">
                    </v-avatar>

                </v-col>
                <v-col cols="9">
                  <v-col>
                    <v-avatar class="profile" color="grey" size="60">
                      <v-img :src="image_src"></v-img>
                    </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</span>
                    <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
                    <span class="grey--text float-right">10分前</span>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-5">
              <v-row>
                <v-col cols="3">
                  <v-avatar tile size="130" color="cyan" :src="image_src" class="ml-5">
                      <img :src="image_src" alt="">
                    </v-avatar>

                </v-col>
                <v-col cols="9">
                  <v-col>
                    <v-avatar class="profile" color="grey" size="60">
                      <v-img :src="image_src"></v-img>
                    </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</span>
                    <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
                    <span class="grey--text float-right">10分前</span>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mb-5">
              <v-row>
                <v-col cols="3">
                  <v-avatar tile size="130" color="cyan" :src="image_src" class="ml-5">
                      <img :src="image_src" alt="">
                    </v-avatar>

                </v-col>
                <v-col cols="9">
                  <v-col>
                    <v-avatar class="profile" color="grey" size="60">
                      <v-img :src="image_src"></v-img>
                    </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">John</span>
                    <p class="my-5 font-weight-bold">会社の近くの神社です。</p>
                    <span class="grey--text float-right">10分前</span>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
            <span class="float-right font-weight-bold">もっとみる</span>
            <nuxt-link class="cyan--text text--darken-1 text-h5 font-weight-bold text-decoration-none" to="/list/event">イベントをみる</nuxt-link>
            <v-container to="/list/event">
              <v-row>
                <v-col cols="6">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-1">10月18日</div>
                        <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
                        <p class="mb-5">僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
                        <p class="font-weight-bold">日時： 10月3日  9:00~12:00</p>
                        <p class="font-weight-bold">場所： 東京都渋谷区</p>
                      </v-list-item-content>

                      <v-avatar tile size="150" color="cyan" :src="image_src" class="ml-5">
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
                <v-col cols="6">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-1">10月18日</div>
                        <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
                        <p class="mb-5">僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
                        <p class="font-weight-bold">日時： 10月3日  9:00~12:00</p>
                        <p class="font-weight-bold">場所： 東京都渋谷区</p>
                      </v-list-item-content>

                      <v-avatar tile size="150" color="cyan" :src="image_src" class="ml-5">
                        <img :src="image_src">
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
                <v-col cols="6">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-1">10月18日</div>
                        <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
                        <p class="mb-5">僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
                        <p class="font-weight-bold">日時： 10月3日  9:00~12:00</p>
                        <p class="font-weight-bold">場所： 東京都渋谷区</p>
                      </v-list-item-content>

                      <v-avatar tile size="150" color="cyan" :src="image_src" class="ml-5">
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
                <v-col cols="6">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-1">10月18日</div>
                        <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;">東京を綺麗にしましょう。</div>
                        <p class="mb-5">僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
                        <p class="font-weight-bold">日時： 10月3日  9:00~12:00</p>
                        <p class="font-weight-bold">場所： 東京都渋谷区</p>
                      </v-list-item-content>

                      <v-avatar tile size="150" color="cyan" :src="image_src" class="ml-5">
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
            <span class="float-right font-weight-bold">もっとみる</span>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'dashboard',
  layout: 'loggedIn',
  data() {
    return {
      users: [],
      image_src: require('@/assets/img/everyone.jpg'),
      item: 0,
      items: [
        {
          title: 'マイページ',
          icon: 'mdi-folder',
          lists: ['Quick Start', 'Pre-made layouts'],
          link: '/text'
        },
        {
          title: 'プロジェクトを投稿',
          icon: 'mdi-account-multiple'
        },
        {
          title: 'プロジェクトを編集',
          icon: 'mdi-star',
          lists: ['Colors', 'Content', 'Display']
        },
        {
          title: 'イベントを投稿',
          icon: 'mdi-history',
          lists: ['API explorer', 'Alerts']
        },
        { title: 'イベントを編集', icon: 'mdi-upload' },
        { title: 'ログアウト', icon: 'mdi-cloud-upload' },
      ],
      messages: [
        {
          avatar: 'image_src',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          excerpt: 'Thank you for joining our comminity...',
        }
      ],
      dialog: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    }
  },
  mounted() {
    this.$store.dispatch('user/logInUserDisplay');
  }
}
</script>

<style>

</style>
