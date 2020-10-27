<template>
  <v-card height="350px" class="ml-7">
    <v-navigation-drawer absolute permanent>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="image_src">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="cyan--text text--darken-1 font-weight-bold text-h5">Akinori</v-list-item-title>
            <v-list-item-subtitle>ログイン中</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item  in items" :key="item.title">
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
</template>

<script>
export default {
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
      items: [
        {
          title: 'マイページ',
          icon: 'mdi-folder',
          lists: ['Quick Start', 'Pre-made layouts']
        },
        {
          title: 'プロジェクトを投稿',
          icon: 'mdi-account-multiple'
        },
        {
          title: 'プロジェクトを編集',
          icon: 'mdi-star',
          lists: ['Colors', 'Content', 'Display']
        },
        {
          title: 'イベントを投稿',
          icon: 'mdi-history',
          lists: ['API explorer', 'Alerts']
        },
        { title: 'イベントを編集', icon: 'mdi-upload' },
        { title: 'ログアウト', icon: 'mdi-cloud-upload' },
      ],
    }
  }
}
</script>

<style>

</style>
