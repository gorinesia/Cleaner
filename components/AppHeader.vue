<template>
  <header>
    <v-container>
      <v-row>
        <v-app-bar app color="white" style="color: #00ACC1" class="font-weight-bold">
          <v-app-bar-nav-icon color="#00ACC1" @click="drawer = true"></v-app-bar-nav-icon>
          <v-col cols="1"></v-col>
          <v-col cols="7">
              <span><v-icon>fas fa-lock</v-icon></span>
              <nuxt-link class="font-weight-bold text-h4 cyan--text text--darken-1 text-decoration-none" to="/">
                <v-icon large color="cyan darken-1">mdi-earth</v-icon>
                Cleaner
              </nuxt-link>
          </v-col>
          <!-- <v-col cols="6" class="ml-10">
            <v-tabs color="#EF6C00" class="my-5">
              <v-tab  v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.to" router exact>
                <v-icon>mdi-account</v-icon>
                {{ menuItem.name }}
              </v-tab>
            </v-tabs>
          </v-col> -->
          <v-spacer></v-spacer>
          <v-col cols="4">
            <nav>
              <BeforeLogin v-if="!loggedIn"/>
              <AfterLogin v-else />
            </nav>
          </v-col>
          <!-- <nav>
            <v-btn rounded color="#1A237E" dark class="font-weight-bold orange--text text--darken-1" @click="signInAnonymously">ゲストログイン</v-btn>
            <v-btn rounded outlined color="#00ACC1" class="font-weight-bold" dark to="/auth/login">ログイン</v-btn>
            <v-btn rounded color="#00ACC1" class="font-weight-bold" dark to="/auth/signup">新規登録</v-btn>
          </nav> -->
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
        <!-- <v-list-item-group>
          <v-list-item
            v-for="(menuItem, index) in menuItems" :key="index"
          >
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group> -->
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import firebase from 'firebase';
import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';

export default {
  name: 'app-header',
  components: {
    BeforeLogin,
    AfterLogin
  },
  data() {
    return {
      drawer: false,
      loggedIn: this.$store.state.user.loggedIn,
    //   menuItems: [
    //     {
    //       name: 'プロジェクトをみる',
    //       icon: 'mdi-account',
    //       to: '/list/project'
    //     },
    //     {
    //       name: 'イベントをみる',
    //       icon: 'mdi-account',
    //       to: '/list/event'
    //     },
    //   ]
    }
  },
  computed : {
    currentUser() {
      return this.$store.getters['user/currentUser']
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
