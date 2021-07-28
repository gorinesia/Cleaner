<template>
  <v-app>
    <v-container>
      <v-row class="article">
        <v-col>
          <div
            v-for="article in articles"
            :key="article.id"
            @click="getComponentsId(article.id)"
          >
            <ProjectArticleCopy
              :id="article.id"
              :article="article"
              :articles="articles"
              class="personal_article"
            >
            </ProjectArticleCopy>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ProjectArticleCopy from "~/components/ProjectArticleCopy.vue";

export default {
  name: "profile",
  layout: "loggedIn",
  middleware: "authenticated",
  components: {
    ProjectArticleCopy,
  },
  data() {
    return {
      tabs: null,
      items: ["プロジェクト", "イベント"],
      image_src: require("@/assets/img/everyone.jpg"),
      // id: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    currentUser() {
      return this.$store.getters["user/currentUser"];
    },
    uid() {
      return this.$store.getters["user/uid"];
    },
    image: {
      get() {
        return this.$store.getters["project/image"];
      },
      set(value) {
        this.$store.commit("project/setImage", value);
      },
    },
    personalDatas() {
      return this.$store.getters["user/personalDatas"];
    },
    articles() {
      return this.$store.getters["project/articles"];
    },
    personalProjectId() {
      return this.$store.getters["project/personalProjectId"];
    },
    personalComponent() {
      return this.$store.getters["project/personalComponent"];
    },
    currentUserComponent() {
      return this.$store.getters["project/currentUserComponent"];
    },
  },
  mounted() {
    this.$store.dispatch("project/getCurrentUserMessage", {
      uid: this.uid,
    });
  },
  methods: {
    getPersonalProjectId(id) {
      this.$store.dispatch("project/getPersonalProjectId", {
        id,
      });
    },
    getPersonalEvent(id) {
      this.$store.dispatch("event/getPersonalEvent", {
        id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  .v-main {
    margin: 0 100px;
  }
}
</style>
