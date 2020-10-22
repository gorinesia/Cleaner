<template>
  <v-app>
    <AppHeader />
    <v-content>
      <Nuxt class="blue-grey lighten-5" />
    </v-content>
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
