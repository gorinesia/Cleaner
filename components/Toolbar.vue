<template>
  <v-tabs color="#EF6C00" class="mb-10" centered>
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
          name: 'プロジェクト',
          icon: 'mdi-tooltip',
          to: '/list/project'
        },
        {
          name: 'イベント',
          icon: 'mdi-calendar',
          to: '/list/event'
        },
        {
          name: 'マイページ',
          icon: 'mdi-account',
          to: '/dashboard'
        },
      ]
    }
  }
}
</script>
