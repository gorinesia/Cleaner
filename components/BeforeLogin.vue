<template>
  <nav>
    <v-btn rounded color="#1A237E" dark class="font-weight-bold orange--text text--darken-1" @click="signInAnonymously">ゲストログイン</v-btn>
    <v-btn rounded outlined color="#00ACC1" class="font-weight-bold" dark to="/auth/login">ログイン</v-btn>
    <v-btn rounded color="#00ACC1" class="font-weight-bold" dark to="/auth/signup">新規登録</v-btn>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
