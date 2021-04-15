<template>
  <div>
    <v-app>
      <AppHeader app />
      <v-main>
        <Toolbar v-if="loggedIn" />
        <Nuxt />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import Toolbar from "@/components/Toolbar.vue";

export default {
  components: {
    AppHeader,
    Toolbar,
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
}
.v-main__wrap {
  background: #eceff1;
  padding: 80px 80px 50px;
}
.v-application--wrap {
  background: #eceff1;
}
.v-main__wrap .v-application {
  margin: auto;
  max-width: 1200px;
}
@media screen and (max-width: 650px) {
  .v-main__wrap {
    padding: 80px 10px 50px;
  }
  .v-application--wrap {
    min-height: 50vh;
  }
}
</style>
