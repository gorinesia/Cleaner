<template>
  <div>
    <v-app>
      <AppHeader app />
      <v-main>
        <Nuxt />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    currentUser() {
      return this.$store.getters["user/currentUser"];
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  height: auto;
}
header {
  position: fixed;
  width: 100%;
  top: 0;
  display: block;
  z-index: 100;
}
.v-toolbar__content {
  height: 64px;
}
.v-main {
  background: #eceff1;
  padding: 0 100px;

  .v-main__wrap {
    padding: 0 100px;
  }
}
@media screen and (max-width: 650px) {
  .v-main__wrap {
    padding: 80px 10px 50px;
  }
}
</style>
