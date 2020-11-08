<template>
  <div>
  <v-app>
    <AppHeader />
    <v-main>
      <v-row>
        <v-col cols="3">
          <Sidebar />
        </v-col>
        <v-col cols="9">
          <Nuxt />
        </v-col>
      </v-row>
    </v-main>
    <AppFooter />
  </v-app>
  </div>
</template>

<script>
import LoggedInHeader from '@/components/LoggedInHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
  components: {
    LoggedInHeader,
    AppFooter,
    Sidebar,
  }
}
</script>
