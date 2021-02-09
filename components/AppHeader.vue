<template>
  <header>
    <v-container my-n3>
      <v-row>
        <v-app-bar color="white" style="color: #00ACC1" class="font-weight-bold">
            <v-toolbar-title>
              <span><v-icon>fas fa-lock</v-icon></span>
              <nuxt-link v-if="!loggedIn" class="font-weight-bold text-h4 cyan--text text--darken-1 text-decoration-none" to="/">
                <v-icon large color="cyan darken-1">mdi-earth</v-icon>
                Cleaner
              </nuxt-link>
              <nuxt-link  v-else class="font-weight-bold text-h4 cyan--text text--darken-1 text-decoration-none" to="/mypage">
                <v-icon large color="cyan darken-1">mdi-earth</v-icon>
                Cleaner
              </nuxt-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <nav class="mt-2">
              <v-tabs>
                <nav v-if="!loggedIn">
                  <v-btn rounded color="#1A237E" dark class="font-weight-bold orange--text text--darken-1" @click="guestLogin">ゲストログイン</v-btn>
                  <v-btn rounded outlined color="#00ACC1" class="font-weight-bold" dark to="/auth/login">ログイン</v-btn>
                  <v-btn rounded color="#00ACC1" class="font-weight-bold" dark to="/auth/signup">新規登録</v-btn>
                </nav>
                <nav v-else>
                  <v-btn rounded color="#00ACC1" class="font-weight-bold " dark @click="logOut">ログアウト</v-btn>
                </nav>
              </v-tabs>
            </nav>
          <v-app-bar-nav-icon color="#00ACC1" @click="drawer = true"></v-app-bar-nav-icon>
        </v-app-bar>
      </v-row>
    </v-container>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item>
            <nav v-if="!loggedIn">
              <ul style="list-style: none">
                <li class="ma-2">
                  <v-btn rounded color="#1A237E" dark class="font-weight-bold orange--text text--darken-1" @click="guestLogin">ゲストログイン</v-btn>
                </li>
                <li class="ma-2">
                  <v-btn rounded outlined color="#00ACC1" class="font-weight-bold" dark to="/auth/login">ログイン</v-btn>
                </li>
                <li class="ma-2">
                  <v-btn rounded color="#00ACC1" class="font-weight-bold" dark to="/auth/signup">新規登録</v-btn>
                </li>
              </ul>
            </nav>
            <nav v-else>
              <v-card class="pa-2" height="200px" width="256" v-for="currentUser in currentUser" :key="currentUser.id">
                <v-navigation-drawer permanent>
                  <template v-slot:prepend>
                    <v-list-item two-line>
                      <v-list-item-avatar>
                        <v-img :src="currentUser.image" width="30px" height="30px"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <nuxt-link class="cyan--text text--darken-1 font-weight-bold text-h5 text-decoration-none" to="/personal/profile" @click.native="getProfile(currentUser.id)">{{ currentUser.displayName }}</nuxt-link>
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
              <v-btn rounded color="#00ACC1" class="font-weight-bold " dark @click="logOut">ログアウト</v-btn>
            </nav>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  data() {
    return {
      drawer: false,
      email: 'test@test.com',
      password: '123456',
      items: [
        {
          title: 'ユーザー情報設定',
          icon: 'mdi-folder',
          link: '/edit/profile'
        },
        {
          title: 'メッセージ管理',
          icon: 'mdi-account-multiple',
          link: '/edit/message'
        },
        {
          title: 'サポート管理',
          icon: 'mdi-upload',
          link: '/edit/support'
        },
      ],
    }
  },
  computed : {
    loggedIn() {
      return this.$store.getters['user/loggedIn']
    },
    currentUser() {
      return this.$store.getters['user/currentUser']
    }
  },
  methods: {
    guestLogin() {
      this.$store.dispatch('user/logInAction', {
        email: this.email,
        password: this.password
      })
    },
    logOut() {
      this.$store.dispatch('user/logOutAction');
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 10px !important;
}

.v-app-bar__nav-icon {
  @include display_pc {
    display: none !important;
  }
}

.v-tabs {
  display: none;

  @include display_pc {
    display: block !important
  }
}
</style>
