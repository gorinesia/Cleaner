<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-navigation-drawer>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title grey--text text--darken-2">
                  Navigation lists
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-group v-for="nav_list in nav_lists" :key="nav_list.name" :prepend-icon="nav_list.icon" no-action :append-icon="nav_list.lists ? undefined : ''">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="list in nav_list.lists" :key="list">
                  <v-list-item-content>
                    <v-list-item-title>{{ list }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col cols="10">
          <v-main app>
            <Home />
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Home from '../components/Home';

export default {
  name: 'dashboard',
  components: {
    Home
  },
  data() {
    return {
      nav_lists: [
        {
          name: 'Getting started',
          icon: 'mdi-speedometer',
          lists: ['Quick Start', 'Pre-made layouts']
        },
        {
          name: 'Customization',
          icon: 'mdi-cogs'
        },
        {
          name: 'Styles & animations',
          icon: 'mdi-palette',
          lists: ['Colors', 'Content', 'Display']
        },
        {
          name: 'UI Components',
          icon: 'mdi-view-dashboard',
          lists: ['API explorer', 'Alerts']
        },
        { name: 'Directives', icon: 'mdi-function' },
        { name: 'Premium themes', icon: 'mdi-vuetify' },
      ]
    }
  }
}
</script>

<style>

</style>
