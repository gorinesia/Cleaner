<template>
  <v-app>
    <v-container>
      <h2 style="text-align: center; color: #00ACC1;" class="my-5">プロジェクトをみる</h2>
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
              style="position: fixed; z-index: 1; right: 250px; bottom: 100px"
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
                <v-text-field v-model="time" type="date" class="white" placeholder="例）11月7日 9:00"></v-text-field>
                <label>場所</label>
                <v-text-field v-model="place" class="white" placeholder="例) 東京"></v-text-field>
                <label>コメント</label>
                <v-textarea v-model="comment" class="white" placeholder="例) 今日もたくさん拾いました。"></v-textarea>
                <!-- <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn> -->
              </v-container>
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
                @click="addMessage"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row>
        <v-col>
          <v-card v-for="article in articles" :key="article.id">
            <template >
              <v-divider />
              <v-hover v-slot ="{ hover }">
                <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
                  <v-row>
                    <v-col cols="3">
                      <v-avatar tile size="100" class="ml-5">
                        <v-img :src="article.image"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="4">
                      <v-avatar class="profile" color="grey" size="60">
                        <v-img :src="article.displayImage"></v-img>
                      </v-avatar>
                      <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ article.displayName }}</span>
                      <span>{{ article.place}}</span>
                      <p class="my-5 font-weight-bold">{{ article.comment }}</p>
                    </v-col>
                    <v-col cols="5">
                      <span class="grey--text float-right mr-5"><v-icon>mdi-scale</v-icon>{{ article.name }}・{{ article.date}}</span>
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

export default {
  name: 'project',
  data() {
    return {
      user: this.$store.state.user.user,
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      time: this.$store.state.project.time,
      date: this.$store.state.project.date,
      comment: this.$store.state.project.comment,
      image_src: require('@/assets/img/top-page.jpg'),
      imageOverlay: false,
      dialog: false,
      // loggedIn: this.$store.state.user.loggedIn,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['user/loggedIn']
    },
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
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
        displayName: this.currentUser[0].displayName,
        displayImage: this.currentUser[0].image,
        name: this.name,
        place: this.place,
        comment: this.comment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.name = '';
      this.place = '';
      this.comment = '';
      this.date = '';
    },
    getPersonalId(id) {
      this.$store.dispatch('project/getPersonalProject', {
        id
      })
    },
  },
}
</script>

<style>

</style>
