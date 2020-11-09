<template>
  <v-app>
    <AppHeader />
    <v-main>
      <Toolbar v-if="loggedIn" />
      <Nuxt class="blue-grey lighten-5" />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import BeforeLogin from '../components/BeforeLogin.vue'
import Toolbar from '@/components/Toolbar.vue'
import firebase from 'firebase'

export default {
  components: {
    AppHeader,
    BeforeLogin,
    Toolbar,
  },
  data() {
    return {
      loggedIn: this.$store.state.user.loggedIn
    }
  },
  currentUser() {
    return this.$store.getters['user/currentUser']
  }
}
</script>
