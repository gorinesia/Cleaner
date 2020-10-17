<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <p style="color: #00ACC1">ログアウトしました</p>
      <p>ログインはこちら</p>
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
