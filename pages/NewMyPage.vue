<template>
  <v-app>
    <v-container v-for="currentUser in currentUser" :key="currentUser.id">
      <v-card>
        <v-tabs
          v-model="tabs"
          background-color="cyan darken-1"
          centered
          dark
          icons-and-text
        >
          <v-tab v-for="n in items" :key="n">
            {{ n }}
          </v-tab>
        </v-tabs>

        <div class="main_article">
          <ProjectArticleCopy :article="currentUserComponent[0]">
          </ProjectArticleCopy>
        </div>

        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card>
              <template>
                <v-divider />
                <v-hover v-slot="{ hover }">
                  <!-- <div class="main_article">
                    <ProjectArticleCopy :article="personalComponent[0]">
                    </ProjectArticleCopy>
                  </div> -->
                </v-hover>
              </template>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">1030日</div>
                  <div class="headline mb-3 font-weight-bold">
                    渋谷の路上でゴミを拾います。
                  </div>
                  <p class="mb-5">
                    僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？
                  </p>
                  <p class="font-weight-bold">日時： 10月3日 9:00~12:00</p>
                  <p class="font-weight-bold">場所： 東京都渋谷区</p>
                </v-list-item-content>

                <v-avatar
                  tile
                  size="200"
                  color="cyan"
                  :src="image_src"
                  class="ml-5"
                >
                  <img :src="image_src" alt="" />
                </v-avatar>
              </v-list-item>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
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
    this.$store.dispatch("user/logInUserDisplay", {
      uid: this.uid,
      image: this.image,
    });
    console.log(this.currentUser);
    this.$store.dispatch("project/getMessage", {
      uid: this.uid,
      image: this.image,
    });
    const docRef = db.collection("posts").where("id", "==", true);
    // this.$store.dispatch("event/getEvent");
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
