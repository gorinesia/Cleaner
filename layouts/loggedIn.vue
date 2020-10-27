<template>
  <v-app>
    <AppHeaderLogout />
    <v-main>
      <Nuxt class="blue-grey lighten-5" />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeaderLogout from '../components/AppHeaderLogout.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  components: {
    AppHeaderLogout,
    AppFooter,
  }
}
</script>
