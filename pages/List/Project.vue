<template>
  <v-app>
    <v-container>
      <v-tabs color="#EF6C00" class="mb-10" centered>
        <v-tab  v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.to" router exact>
          <v-icon>{{ menuItem.icon }}</v-icon>
          {{ menuItem.name }}
        </v-tab>
      </v-tabs>
      <h2 style="text-align: center; color: #00ACC1;">プロジェクトをみる</h2>
      <p style="text-align: center;">プロジェクトとは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
      あなたも日々のプロジェクトを気軽に投稿してみませんか？</p>
      <v-row justify="center" v-if="loggedIn">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="position: fixed; z-index: 1; right: 200px; bottom: 100px"
              fab
              large
              color="cyan darken-1"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">プロジェクトの様子を投稿する</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                  <label class="postImage-appendBtn"></label>
                  <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
                  <v-img :src="image" width="100" height="100"></v-img>
                  <label>ゴミの量</label>
                  <v-text-field v-model="name" class="white" placeholder="例) 5kg"></v-text-field>
                  <label>日時</label>
                  <v-text-field v-model="time" class="white" placeholder="例）11月7日 9:00"></v-text-field>
                  <label>場所</label>
                  <v-text-field v-model="place" class="white" placeholder="例) 東京"></v-text-field>
                  <label>コメント</label>
                  <v-textarea v-model="comment" class="white" placeholder="例) 今日もたくさん拾いました。"></v-textarea>
                  <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
              </v-container>
              <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row v-for="article in articles" :key="article.id">
        <v-col>
          <v-card class="mb-5">
            <template v-for="(article, index) in articles">
              <v-divider :key="index" />
              <v-hover v-slot ="{ hover }">
                <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
                  <v-row  :key="article.id">
                    <v-col cols="3">
                      <v-avatar tile size="100" class="ml-5">
                        <v-img :src="article.image"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="4">
                      <v-avatar class="profile" color="grey" size="60">
                        <v-img :src="article.image"></v-img>
                      </v-avatar>
                      <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ article.name }}</span>
                      <p class="my-5 font-weight-bold">{{ article.messageComment }}</p>
                    </v-col>
                    <v-col cols="5">
                      <span class="grey--text float-right">{{ article.date}}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </template>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'project',
  data() {
    return {
      user: this.$store.state.user.user,
      name: this.$store.state.project.name,
      displayName: this.$store.state.project.displayName,
      place: this.$store.state.project.place,
      date: this.$store.state.project.date,
      messageComment: this.$store.state.project.messageComment,
      image_src: require('@/assets/img/doing3.jpg'),
      imageOverlay: false,
      dialog: false,
      loggedIn: this.$store.state.user.loggedIn,
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
  },
  computed: {
    articles() {
      return this.$store.getters['project/articles']
    },
    image: {
      get() {
        return this.$store.getters['project/image']
      },
      set(value) {
        this.$store.commit('project/setImage', value)
      }
    },
  },
  mounted() {
    this.$store.dispatch('project/getMessage');
  },
  methods: {
    showImage() {
      this.imageOverlay = true;
    },
    closeModalForImage() {
      this.imageOverlay = false;
    },
    btnUploadChange(ev) {
      this.$store.dispatch('project/btnUploadChange', {
        ev
      });
    },
    addMessage() {
      this.$store.dispatch('project/addMessage', {
        name: this.name,
        place: this.place,
        comment: this.messageComment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.name = '';
      this.place = '';
      this.messageComment = '';
      this.date = '';
    },
    getPersonalId(id) {
      this.$store.dispatch('project/getPersonalData', {
        id
      })
    },
  },
}
</script>

<style>

</style>
