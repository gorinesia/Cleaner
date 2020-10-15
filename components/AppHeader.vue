<template>
  <header>
    <v-container>
      <v-row>
        <v-app-bar app color="white" style="color: #00ACC1" class="font-weight-bold font-size-2rem">
          <v-app-bar-nav-icon color="#00ACC1" @click="drawer = true"></v-app-bar-nav-icon>
          <v-col cols="1">
            <v-toolbar-title class="font-size-2rem">Cleaner</v-toolbar-title>
          </v-col>
          <v-col cols="6">
            <v-tabs color="#EF6C00">
              <v-tab v-for="(menuItem, index) in menuItems" :key="index">
                {{ menuItem.name }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1.5">
            <v-btn rounded color="#1A237E" dark class="orange-text">ゲストログイン</v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1.5">
            <v-btn rounded outlined color="#00ACC1" dark>ログイン</v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1.5">
            <v-btn rounded color="#00ACC1" dark>新規登録</v-btn>
          </v-col>
        </v-app-bar>
      </v-row>
    </v-container>
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
