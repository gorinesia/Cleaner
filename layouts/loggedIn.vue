<template>
  <div>
  <v-app>
    <AppHeader />
    <v-spacer></v-spacer>
    <Nuxt />
    <AppFooter />
    <!-- <LoggedInHeader class="mb-5" />
    <v-container class="blue-grey lighten-5">
      <v-row>
        <v-col cols="3">
          <Sidebar class="blue-grey lighten-5" />
        </v-col>
        <v-col cols="9">
          <Nuxt class="blue-grey lighten-5" />
        </v-col>
      </v-row>
    </v-container>
    <AppFooter /> -->
  </v-app>
  </div>
</template>

<script>
import LoggedInHeader from '@/components/LoggedInHeader.vue'
import AppFooter from '../components/AppFooter.vue'
// import Sidebar from '../components/Sidebar.vue'

export default {
  components: {
    LoggedInHeader,
    AppFooter,
    // Sidebar
  }
}
</script>
