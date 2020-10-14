<template>
  <header>
    <v-app-bar app color="white" style="color: #00ACC1">
      <v-app-bar-nav-icon color="#00ACC1" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Cleaner</v-toolbar-title>
      <v-tabs color="#EF6C00">
        <v-tab v-for="(menuItem, index) in menuItems" :key="index">
          {{ menuItem.name }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn rounded color="#1A237E" dark>ゲストログイン</v-btn>
      <v-spacer></v-spacer>
      <v-btn rounded outlined color="#00ACC1" dark>ログイン</v-btn>
      <v-spacer></v-spacer>
      <v-btn rounded color="#00ACC1" dark>新規登録</v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="(menuItem, index) in menuItems" :key="index"
          >
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import constants from '../common/constants';

export default {
  name: 'AppHeader',
  data() {
    return {
      drawer: false,
      menuItems: constants.menuItems
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 10px !important;
}

.v-app-bar__nav-icon {
  @include display_pc {
    display: none !important;
  }
}

.v-tabs {
  display: none;

  @include display_pc {
    display: block !important
  }
}
</style>
