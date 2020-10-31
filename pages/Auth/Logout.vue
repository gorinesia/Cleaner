<template>
  <v-app>
    <v-card width="400px" height="200" class="mx-auto mt-10">
      <v-card-title color="#00ACC1" class="grey--text ma-5">ログアウトしました</v-card-title>
      <v-card-subtitle class="ma-5"><nuxt-link class="cyan--text text--darken-1 text-decoration-none" to='/auth/login'>ログインはこちら</nuxt-link></v-card-subtitle>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'logout',
  data: () => ({
    showPassword: false
  })
};
</script>

<style>

</style>
