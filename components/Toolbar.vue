<template>
  <v-tabs color="#EF6C00" class="mb-3" centered>
    <v-tab  v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.to" router exact>
      <v-icon>{{ menuItem.icon }}</v-icon>
      {{ menuItem.name }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'toolbar',
  data() {
    return {
      menuItems: [
        {
          name: 'マイページ',
          icon: 'mdi-account',
          to: '/mypage'
        },
        {
          name: 'プロジェクト',
          icon: 'mdi-tooltip',
          to: '/list/project'
        },
        {
          name: 'イベント',
          icon: 'mdi-calendar',
          to: '/list/event'
        },
      ]
    }
  }
}
</script>
