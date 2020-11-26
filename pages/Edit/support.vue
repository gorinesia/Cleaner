<template>
  <v-app class="mx-10">
    <h2 class="cyan--text text--darken-1 my-5">サポート管理</h2>
    <v-container max-width="600px">
      <v-card class="pa-5">
        <h3>サポートされた金額</h3>
        <v-text-field placeholder="製作中です"></v-text-field>
      </v-card>
      <v-card class="pa-5">
        <h3>サポートした金額</h3>
        <v-text-field placeholder="製作中です"></v-text-field>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'loggedIn'
}
</script>

<style>

</style>
