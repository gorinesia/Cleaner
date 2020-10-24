<template>
  <v-app>
    <AppHeader />
    <v-main>
      <Nuxt class="blue-grey lighten-5" />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>
