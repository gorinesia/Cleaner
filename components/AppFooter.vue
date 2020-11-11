<template>
  <v-footer class="white">
    <v-row justify="center">
      <v-btn v-for="menuItem in menuItems" :key="menuItem.id" :to="menuItem.to" color="black" text rounded class="my-2">{{ menuItem.name }}</v-btn>
      <v-col class=" py-2 text-center black--text" cols="12">
        &copy; 2020 Akinori Sakakibara. All Right Reserved.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    menuItems: [
        {
          name: 'マイページ',
          icon: 'mdi-account',
          to: '/mypage'
        },
        {
          name: 'プロジェクト',
          icon: 'mdi-account',
          to: '/list/project'
        },
        {
          name: 'イベント',
          icon: 'mdi-account',
          to: '/list/event'
        },
      ]
  }),
}
</script>
