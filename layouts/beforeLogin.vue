<template>
  <div>
  <v-app>
    <AppHeader />
    <v-main>
      <!-- <Toolbar /> -->
      <v-row>
        <v-col cols="12" md="3">
          <BeforeLoginSidebar />
        </v-col>
        <v-col cols="12" md="9">
          <Nuxt />
        </v-col>
      </v-row>
    </v-main>
    <AppFooter />
  </v-app>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import BeforeLoginSidebar from '../components/BeforeLoginSidebar.vue';
// import Sidebar from '../components/Sidebar.vue'
// import Toolbar from '@/components/Toolbar.vue'

export default {
  components: {
    AppFooter,
    BeforeLoginSidebar
    // Sidebar,
    // Toolbar,
  },
  data() {
    return {
      loggedIn: this.$store.state.user.loggedIn
    }
  }
}
</script>
