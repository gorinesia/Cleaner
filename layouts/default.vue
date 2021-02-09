<template>
  <div>
    <v-app>
      <AppHeader app />
      <v-main>
        <Toolbar v-if="loggedIn" />
        <Nuxt class="blue-grey lighten-5" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import Toolbar from '@/components/Toolbar.vue'

export default {
  components: {
    AppHeader,
    Toolbar,
  },
  computed: {
    loggedIn() {
        return this.$store.getters['user/loggedIn']
      },
    currentUser() {
      return this.$store.getters['user/currentUser']
    }
  }
}
</script>
