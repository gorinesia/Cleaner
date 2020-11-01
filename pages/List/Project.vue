<template>
  <v-app>
    <v-container>
      <h2 style="color: #00ACC1; margin-bottom: 10px">プロジェクトをみる</h2>
      <v-row justify="center">
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
              <span class="headline">User Article</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <label class="postImage-appendBtn"></label>
                <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
                <label>名前</label>
                <v-text-field v-model="name" class="white"></v-text-field>
                <label>場所</label>
                <v-text-field v-model="place" class="white"></v-text-field>
                <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
                <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
              </v-container>
              <small>*indicates required field</small>
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
            <v-row>
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" @click="showImage">
                  <v-overlay :value="imageOverlay">
                    <v-img :src="image_src" width="300" height="300"></v-img>
                    <v-btn @click="closeModalForImage">閉じる</v-btn>
                  </v-overlay>
                </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-avatar class="profile" color="grey" size="60">
                  <v-img :src="image_src"></v-img>
                </v-avatar>
                  <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/personalproject')">{{ article.name }}</span>
                  <span class="overline mb-1 float-right grey--text">{{ article.date }}</span>
                  <p class="ma-5">{{ article.comment }}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'project',
  layout: 'loggedIn',
  data() {
    return {
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      date: this.$store.state.project.date,
      messageComment: this.$store.state.project.messageComment,
      image_src: require('@/assets/img/doing3.jpg'),
      imageOverlay: false,
      dialog: false

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
    }
  }
}
</script>

<style>

</style>
