<template>
  <header>
    <v-container>
      <v-row>
        <v-app-bar app color="white" style="color: #00ACC1" class="font-weight-bold">
          <v-app-bar-nav-icon color="#00ACC1" @click="drawer = true"></v-app-bar-nav-icon>
          <v-col cols="1"></v-col>
          <v-col cols="7">
              <span><v-icon>fas fa-lock</v-icon></span>
              <nuxt-link v-if="!loggedIn" class="font-weight-bold text-h4 cyan--text text--darken-1 text-decoration-none" to="/">
                <v-icon large color="cyan darken-1">mdi-earth</v-icon>
                Cleaner
              </nuxt-link>
              <nuxt-link  v-else class="font-weight-bold text-h4 cyan--text text--darken-1 text-decoration-none" to="/dashboard">
                <v-icon large color="cyan darken-1">mdi-earth</v-icon>
                Cleaner
              </nuxt-link>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <nav>
              <BeforeLogin v-if="!loggedIn"/>
              <AfterLogin v-else />
            </nav>
          </v-col>
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
          <v-list-item
            v-for="(menuItem, index) in menuItems" :key="index"
          >
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
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
      menuItems: [
        {
          name: 'ゲストログイン',
          url: '#'
        },
        {
          name: 'ログイン',
          url: '#'
        },
        {
          name: '新規登録',
          url: '#'
        },
      ]
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
