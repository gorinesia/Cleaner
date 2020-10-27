<template>
  <header>
    <v-container>
      <v-row>
        <v-app-bar app color="white" style="color: #00ACC1" class="font-weight-bold">
          <v-app-bar-nav-icon color="#00ACC1" @click="drawer = true"></v-app-bar-nav-icon>
          <v-col cols="1" class="mr-10">
              <nuxt-link class="font-weight-bold text-h4 cyan--text text--darken-1 text-decoration-none" to="/">
                Cleaner
              </nuxt-link>
          </v-col>
          <v-col cols="6">
            <v-tabs color="#EF6C00">
              <v-icon>mdi-account</v-icon>
              <v-tab v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.to" router exact>
                {{ menuItem.name }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-spacer></v-spacer>
          <TheNavigation />
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
import TheNavigation from './TheNavigation';

export default {
  name: 'app-header',
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
