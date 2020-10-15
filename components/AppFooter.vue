<template>
  <v-footer>
    <v-row justify="center">
      <v-btn v-for="link in links" :key="link" color="black" text rounded class="my-2">{{ link }}</v-btn>
      <v-col class=" py-2 text-center black--text" cols="12">
        &copy; 2020 Akinori Sakakibara. All Right Reserved.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Cleanerとは',
      'クリーナーをみる',
      'プロジェクトをみる',
      'イベントをみる',
      'お問い合わせ',
    ],
  }),
}
</script>
