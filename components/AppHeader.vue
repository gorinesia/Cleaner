<template>
  <header>
    <v-container>
      <v-row>
        <v-app-bar app color="white" style="color: #00ACC1" class="font-weight-bold">
          <v-app-bar-nav-icon color="#00ACC1" @click="drawer = true"></v-app-bar-nav-icon>
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
      // loggedIn: this.$store.state.user.loggedIn,
      email: 'test@test.com',
      password: '123456',
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
