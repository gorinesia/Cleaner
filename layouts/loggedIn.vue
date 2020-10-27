<template>
  <v-app>
    <AppHeaderLogout class="mb-10" />
    <!-- <v-main> -->
      <Nuxt class="blue-grey lighten-5" />
    <!-- </v-main> -->
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
