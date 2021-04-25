<template>
  <v-app class="app_wrap">
    <v-card class="sidebar">
      <v-navigation-drawer permanent>
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
.sidebar {
  // height: 250px;
  margin-top: 13px;
}
.app_wrap[data-v-1d2bff26] {
  background: purple;
}

.sidebar .v-navigation-drawer {
  width: 100% !important;
}
@media screen and (max-width: 650px) {
  .app_wrap[data-v-1d2bff26] {
    background: teal;
    ::v-deep .v-application--wrap {
      min-height: 0vh;
    }
  }
}
</style>
