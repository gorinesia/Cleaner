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
import AppHeader from '../components/AppHeader.vue'
import Toolbar from '@/components/Toolbar.vue'

export default {
  components: {
    AppHeader,
    Toolbar,
  },
  mounted() {
    console.log('window')
    window.scrollTo(0, 1000)
  },
  computed: {
    loggedIn() {
        return this.$store.getters['user/loggedIn']
      },
    currentUser() {
      return this.$store.getters['user/currentUser']
    }
  }
}
</script>

<style>
/* .v-main {
  background: #CFD8DC;
  padding: 100px;
} */

.v-main__wrap {
  background: #CFD8DC;
  /* margin: 0 100px 0; */
}

.v-application--wrap {
  background: #CFD8DC;
}

.v-main__wrap .v-application {
  margin: auto;
  max-width: 1200px;
}

/* .v-application {
  background: #CFD8DC;
} */
</style>
