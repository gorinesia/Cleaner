<template>
  <v-app>
    <AppHeader />
    <v-content>
      <Nuxt />
    </v-content>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
// import Home from '../components/Home.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    // Home,
    AppFooter,
  }
}
</script>
