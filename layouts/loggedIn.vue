<template>
  <div>
    <AppHeader />
    <v-main>
      <v-row>
        <v-col cols="12" md="3">
          <Sidebar />
        </v-col>
        <v-col cols="12" md="9">
          <Nuxt />
        </v-col>
      </v-row>
    </v-main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "../components/AppFooter.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    AppFooter,
    Sidebar,
  },
  data() {
    return {
      loggedIn: this.$store.state.user.loggedIn,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
