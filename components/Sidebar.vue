<template>
  <v-app>
    <v-card
      class="sidebar"
      height="250px"
      v-for="currentUser in currentUser"
      :key="currentUser.id"
    >
      <v-navigation-drawer permanent>
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img
                :src="currentUser.image"
                width="30px"
                height="30px"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <div
                class="cyan--text text--darken-1 font-weight-bold text-h5 text-decoration-none"
              >
                {{ currentUser.displayName }}
              </div>
              <!-- <nuxt-link class="cyan--text text--darken-1 font-weight-bold text-h5 text-decoration-none" to="/personal/profile" @click.native="getProfile(currentUser.id)">{{ currentUser.displayName }}</nuxt-link> -->
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" :to="item.link">
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
      items: [
        {
          title: "マップ",
          icon: "mdi-folder",
          link: "/list/map",
        },
        {
          title: "プロジェクト",
          icon: "mdi-account-multiple",
          link: "/list/project",
        },
        {
          title: "イベント",
          icon: "mdi-upload",
          link: "/list/event",
        },
        {
          title: "リスト",
          icon: "mdi-upload",
          link: "/lists",
        },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/currentUser"];
    },
    image: {
      get() {
        return this.$store.getters["user/image"];
      },
      set(value) {
        this.$store.commit("user/setImage", value);
      },
    },
  },
  methods: {
    getProfile(id) {
      this.$store.dispatch("user/getProfile", {
        id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  display: block;
}
.side_wrap {
  // background: yellowgreen;
}
.sidebar {
  margin-top: 13px;
}

.sidebar .v-navigation-drawer {
  width: 100% !important;
}
@media screen and (max-width: 650px) {
  .v-application--wrap {
    min-height: none;
  }
  .v-card {
    display: none;
  }
}
</style>
