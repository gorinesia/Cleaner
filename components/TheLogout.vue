<template>
  <nav>
    <v-btn rounded color="#00ACC1" class="font-weight-bold " dark @click="logOut">ログアウト</v-btn>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch('user/logOutAction');
    }
  }
}
</script>
