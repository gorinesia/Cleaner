<template>
  <v-app>
    <v-card height="350px" v-for="currentUser in currentUser" :key="currentUser.id">
      <v-navigation-drawer absolute permanent>
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img :src="image" width="30px" height="30px"></v-img>
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
          title: 'HOME',
          icon: 'mdi-folder',
          link: '/dashboard'
        },
        {
          title: 'プロフィール',
          icon: 'mdi-folder',
          link: '/edit/profile'
        },
        {
          title: 'メッセージ',
          icon: 'mdi-account-multiple',
          link: '/edit/message'
        },
        {
          title: 'プロジェクト管理',
          icon: 'mdi-star',
          lists: ['Colors', 'Content', 'Display'],
          link: '/edit/project'
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
          link: '/edit/sapport'
        }
      ],
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    image: {
      get() {
        return this.$store.getters['user/image']
      },
      set(value) {
        this.$store.commit('user/setImage', value)
      }
    },
  }
}
</script>

<style>

</style>
