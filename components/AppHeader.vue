<template>
  <header>
    <v-container my-n3 fluid>
      <v-row>
        <v-app-bar
          color="white"
          style="color: #00acc1"
          class="font-weight-bold"
        >
          <v-toolbar-title>
            <span><v-icon>fas fa-lock</v-icon></span>
            <nuxt-link
              v-if="!loggedIn"
              class="
                app-title
                font-weight-bold
                text-h4
                cyan--text
                text--darken-1 text-decoration-none
              "
              to="/"
            >
              <v-icon large color="cyan darken-1">mdi-earth</v-icon>
              Cleaner
            </nuxt-link>
            <nuxt-link
              v-else
              class="
                app-title
                font-weight-bold
                text-h4
                cyan--text
                text--darken-1 text-decoration-none
              "
              to="/mypage"
            >
              <v-icon large color="cyan darken-1">mdi-earth</v-icon>
              Cleaner
            </nuxt-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <nav>
            <v-tabs>
              <nav v-if="!loggedIn" class="mt-1">
                <button
                  class="btn--guest btn--guest--radius"
                  @click="testLogin"
                >
                  テストログイン
                </button>
                <button
                  class="btn--guest btn--guest--radius"
                  @click="guestLogin"
                >
                  ゲストログイン
                </button>
                <v-btn
                  rounded
                  outlined
                  color="#00ACC1"
                  class="font-weight-bold"
                  dark
                  to="/auth/login"
                  >ログイン</v-btn
                >
                <v-btn
                  rounded
                  color="#00ACC1"
                  class="font-weight-bold"
                  dark
                  to="/auth/signup"
                  >新規登録</v-btn
                >
              </nav>
              <nav v-else>
                <template>
                  <div v-for="currentUser in currentUser" :key="currentUser.id">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-img
                          :src="currentUser.image"
                          v-bind="attrs"
                          v-on="on"
                          width="48px"
                          height="48px"
                          style="
                            border-radius: 50%;
                            cursor: pointer;
                            float: right;
                          "
                        ></v-img>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="item in items"
                          :key="item.title"
                          :to="item.link"
                        >
                          <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>{{
                            item.title
                          }}</v-list-item-title>
                        </v-list-item>
                        <v-btn
                          rounded
                          block
                          color="#00ACC1"
                          class="font-weight-bold mt-5"
                          dark
                          @click="logOut"
                          >ログアウト</v-btn
                        >
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </nav>
            </v-tabs>
          </nav>
          <v-app-bar-nav-icon
            color="#00ACC1"
            @click="drawer = true"
          ></v-app-bar-nav-icon>
        </v-app-bar>
      </v-row>
    </v-container>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item>
            <nav v-if="!loggedIn">
              <ul style="list-style: none">
                <li class="ma-3">
                  <v-btn
                    rounded
                    color="#1A237E"
                    dark
                    class="font-weight-bold orange--text text--darken-1"
                    @click="guestLogin"
                    >ゲストログイン</v-btn
                  >
                </li>
                <li class="ma-4">
                  <v-btn
                    rounded
                    block
                    outlined
                    color="#00ACC1"
                    class="font-weight-bold"
                    dark
                    to="/auth/login"
                    >ログイン</v-btn
                  >
                </li>
                <li class="ma-3">
                  <v-btn
                    rounded
                    block
                    color="#00ACC1"
                    class="font-weight-bold"
                    dark
                    to="/auth/signup"
                    >新規登録</v-btn
                  >
                </li>
              </ul>
            </nav>
            <nav v-else>
              <v-card
                class="pa-2"
                height="250px"
                width="230"
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
                        <nuxt-link
                          class="
                            cyan--text
                            text--darken-1
                            font-weight-bold
                            text-h5 text-decoration-none
                          "
                          to="/personal/profile"
                          @click.native="getProfile(currentUser.id)"
                          >{{ currentUser.displayName }}</nuxt-link
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </template>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      :to="item.link"
                    >
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
              <v-btn
                rounded
                block
                color="#00ACC1"
                class="font-weight-bold mt-5"
                dark
                @click="logOut"
                >ログアウト</v-btn
              >
            </nav>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {
      drawer: false,
      email: "test@test.com",
      password: "123456",
      items: [
        {
          title: "プロフィール",
          icon: "mdi-folder",
          link: "/edit/ProfileCopy",
        },
        {
          title: "ユーザー情報設定",
          icon: "mdi-folder",
          link: "/edit/profile",
        },
        {
          title: "メッセージ管理",
          icon: "mdi-account-multiple",
          link: "/edit/message",
        },
        {
          title: "サポート管理",
          icon: "mdi-upload",
          link: "/edit/support",
        },
      ],
      isOpen: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    currentUser() {
      return this.$store.getters["user/currentUser"];
    },
  },
  methods: {
    guestLogin() {
      this.$store.dispatch("user/logInAction", {
        email: this.email,
        password: this.password,
      });
    },
    testLogin() {
      this.$store.dispatch("user/testLogInAction", {
        email: this.email,
        password: this.password,
      });
      this.$store.dispatch("project/getComponentsProject", {
        id,
      });
    },
    logOut() {
      this.$store.dispatch("user/logOutAction");
    },
    open() {
      console.log("right");
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-title {
  margin-left: 50px;
}
@media screen and (max-width: 650px) {
  .app-title {
    margin-left: 0;
  }
}
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 10px !important;
}
.v-app-bar__nav-icon {
  display: none;
}
.btn--guest {
  color: #fff;
  background-color: #00897b;
  opacity: 0.8;
}

.btn--guest:hover {
  opacity: 1;
}

.btn--guest--radius {
  padding: 8px;
  border-radius: 100vh;
  outline: none;
}

.header--right--icon {
  display: inline;
}

.current-user-image {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.btn--logout {
  font-weight: bold;
  color: #fff;
  background-color: #00acc1;
  padding: 8px;
  margin-bottom: -20px;
}
.btn--logout--radius {
  border-radius: 100vh;
  outline: none;
}
nav {
  margin-right: 50px;
}
nav .v-btn {
  margin-left: 15px;
}
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

#nav h1 {
  margin: 0 0 0 20px;
  color: #fff;
}

#nav > ul {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

#nav > ul > li {
  margin: 0 20px 0 0;
}

#nav > ul > li > a {
  display: block;
  height: auto;
  padding: 20px;
  color: #fff;
  text-decoration: none;
}

#nav > ul > li > span {
  position: relative;
  display: block;
  height: auto;
  padding: 20px;
  color: #fff;
  text-decoration: none;
}

#nav > ul > li > span:after {
  content: "▼";
  display: inline-block;
  transform: rotate(90deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  padding: 0;
  list-style-type: none;
  background-color: #007db9;
}

.dropdown li {
  width: 250px;
  border-bottom: 1px solid #fff;
}

.dropdown li a {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
}

.isOpen {
  display: block;
}
@media screen and (max-width: 650px) {
  header {
    box-shadow: none;
  }
  .v-sheet.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: none;
  }
  .v-btn__content {
    justify-content: end;
  }
  .v-app-bar__nav-icon {
    display: block;
  }
  .v-tabs {
    display: none;
  }
}
</style>
