<template>
  <v-app>
    <AppHeader />
    <v-main>
      <Nuxt class="blue-grey lighten-5" />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import BeforeLogin from '../components/BeforeLogin.vue'
import firebase from 'firebase'

export default {
  components: {
    AppHeader,
    AppFooter,
    BeforeLogin,
  },
  currentUser() {
    return this.$store.getters['user/currentUser']
  }
}
</script>
