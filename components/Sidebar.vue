<template>
  <v-app>
    <v-card height="350px" v-for="currentUser in currentUser" :key="currentUser.id">
      <v-navigation-drawer absolute permanent>
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img :src="image_src">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="cyan--text text--darken-1 font-weight-bold text-h5">{{ currentUser.displayName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item  in items" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      image_src: require('@/assets/img/doing3.jpg'),
      items: [
        {
          title: 'プロフィール',
          icon: 'mdi-folder',
          lists: ['Quick Start', 'Pre-made layouts'],
          link: '/text'
        },
        {
          title: 'メッセージ',
          icon: 'mdi-account-multiple',
          link: '/edit/comment'
        },
        {
          title: 'プロジェクト管理',
          icon: 'mdi-star',
          lists: ['Colors', 'Content', 'Display'],
          link: '/text'
        },
        {
          title: 'イベント管理',
          icon: 'mdi-history',
          lists: ['API explorer', 'Alerts'],
          link: '/edit/event'
        },
        {
          title: 'サポート管理',
          icon: 'mdi-upload',
          link: '/text'
        }
      ],
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
  }
}
</script>

<style>

</style>
