<template>
  <v-app>
    <LoggedInHeader class="mb-5" />
    <v-container>
      <v-row>
        <v-col cols="3">
          <Sidebar />
        </v-col>
        <v-col cols="9">
          <Nuxt class="blue-grey lighten-5" />
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-main> -->

    <!-- </v-main> -->
    <AppFooter />
  </v-app>
</template>

<script>
import LoggedInHeader from '@/components/LoggedInHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
  components: {
    LoggedInHeader,
    AppFooter,
    Sidebar
  }
}
</script>
