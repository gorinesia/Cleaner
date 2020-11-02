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
          name: 'Home',
          icon: 'mdi-account',
          url: '#',
          to: '/dashboard'
        },
        // {
        //   name: 'クリーナーをみる',
        //   icon: 'mdi-account',
        //   url: '#',
        //   to: '/list/cleaner'
        // },
        {
          name: 'プロジェクトをみる',
          icon: 'mdi-account',
          url: '#',
          to: '/loggedIn/project'
        },
        {
          name: 'イベントをみる',
          icon: 'mdi-account',
          url: '#',
          to: '/loggedIn/event'
        },
      ]
  }),
}
</script>
