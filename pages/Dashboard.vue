<template>
  <v-app>
    <v-system-bar height="30" color="#00ACC1" dark class="white--text  font-weight-bold justify-center"><span>まずは気軽に新規登録から！綺麗な世界は自分たちの手で創り上げていこう！</span></v-system-bar>
    <v-container fluid>
      <v-row v-for="user in users" :key="user.id">
        <v-col cols="3">
          <Navbar :user="user" />
        </v-col>

        <v-col cols="9">
          <v-main app>
            <h2 style="; color: #00ACC1;">クリーナーをみる</h2>
            <v-btn to="/list/cleaner">Cleaner</v-btn>
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
            <h2 class="cyan--text text--darken-1 mb-5" color="#00ACC1">プロジェクトをみる</h2>
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
            <h2 style=" color: #00ACC1;">イベントをみる</h2>
            <v-btn to="/list/event">Event</v-btn>
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
import Navbar from '../components/Navbar';
import firebase from 'firebase';

export default {
  components: {
    Navbar
  },
  name: 'dashboard',
  layout: 'loggedIn',
  data() {
    return {
      users: [],
      image_src: require('@/assets/img/everyone.jpg'),
      item: 0,
      messages: [
        {
          avatar: 'image_src',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          excerpt: 'Thank you for joining our comminity...',
        }
      ]
    }
  },
  created() {
    const db = firebase.firestore();
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            displayName: doc.data().displayName
          })
          console.log(doc.data())
        })
        this.users = users;
      })
  }
}
</script>

<style>

</style>
