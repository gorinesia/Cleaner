<template>
  <v-app>
    <v-container>
      <h2 style="text-align: center; color: #00ACC1;" class="my-5">イベントをみる</h2>
      <p style="text-align: center;">イベントとは、みんなでゴミ拾いをするための企画のことです。<br>
      イベントを立ち上げて、みんなでゴミ拾いをしてみませんか？</p>

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
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">イベントを作成する</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <label class="postImage-appendBtn"></label>
                <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
                <v-img :src="image" width="100" height="100"></v-img>
                <label>イベント名</label>
                <v-text-field v-model="name" class="white" placeholder="例）東京を綺麗にしよう大作戦"></v-text-field>
                <label>日時</label>
                <v-text-field v-model="time" class="white" placeholder="例）11月7日 9:00"></v-text-field>
                <label>場所</label>
                <v-text-field v-model="place" class="white" placeholder="例）東京"></v-text-field>
                <label>イベント説明</label>
                <v-textarea v-model="comment" class="white" placeholder="例）渋谷を綺麗にしましょう"></v-textarea>
                <v-btn @click="editArticles(articleId)">編集</v-btn>
                <v-btn @click="closeModalForEdit">閉じる</v-btn>
              </v-container>

              <v-btn @click="openModalForDelete(message.id)" class="float-right mb-1">削除</v-btn>
              <v-overlay :value="deleteOverlay">
                <p>本当に記事を削除しますか？</p>
                <v-btn @click="deleteArticles(articleId)">削除</v-btn>
                <v-btn @click="closeModalForDelete">閉じる</v-btn>
              </v-overlay>

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

      <v-row>
        <template v-for="(event, index) in events">
          <v-col :key="index" cols="12">
            <v-hover v-slot="{ hover }">
              <v-card :class="{ 'on-hover': hover }" @click="getPersonalEvent(event.id)">
                <v-divider :key="index" />
                  <v-row :key="event.id" >
                    <v-col cols="9">
                      <v-col>
                        <v-avatar class="profile" color="grey" size="60">
                          <v-img :src="event.image"></v-img>
                        </v-avatar>
                        <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ event.name }}</span>
                        <p class="my-5 font-weight-bold">{{ event.messageComment }}</p>
                        <span class="grey--text">日時： {{ event.date }}</span>
                        <span class="grey--text float-right">場所： {{ event.place}}</span>
                      </v-col>
                    </v-col>
                    <v-col cols="3">
                      <v-avatar tile size="130">
                        <v-img :src="event.image"></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>

      <!-- <v-row v-for="article in articles" :key="article.id">
        <v-col>
          <v-card class="mb-5">
            <v-row>
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                <v-avatar tile size="100" color="cyan" class="ml-5">
                  <img :src="article.image" @click="showImage">
                  <v-overlay :value="imageOverlay">
                    <v-img :src="article.image" width="300" height="300"></v-img>
                    <v-btn @click="closeModalForImage">閉じる</v-btn>
                  </v-overlay>
                </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-avatar class="profile" color="grey" size="60">
                  <v-img :src="article.image"></v-img>
                </v-avatar>
                  <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/personalEvent')">{{ article.displayName }}</span>
                  <span class="overline mb-1 float-right grey--text">{{ article.date }}</span>
                  <p class="ma-5">{{ article.comment }}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row> -->

    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'event',
  data() {
    return {
      name: this.$store.state.event.name,
      displayName: this.$store.state.event.displayName,
      time: this.$store.state.event.time,
      place: this.$store.state.event.place,
      date: this.$store.state.event.date,
      comment: this.$store.state.event.comment,
      image_src: require('@/assets/img/doing3.jpg'),
      imageOverlay: false,
      dialog: false,
      loggedIn: this.$store.state.user.loggedIn,
    }
  },
  computed: {
    events() {
      return this.$store.getters['event/articles']
    },
    image: {
      get() {
        return this.$store.getters['event/image']
      },
      set(value) {
        this.$store.commit('event/setImage', value)
      }
    },
    deleteOverlay() {
      return this.$store.getters['event/deleteOverlay']
    },
  },
  mounted() {
    this.$store.dispatch('event/getMessage');
  },
  methods: {
    showImage() {
      this.imageOverlay = true;
    },
    closeModalForImage() {
      this.imageOverlay = false;
    },
    btnUploadChange(ev) {
      this.$store.dispatch('event/btnUploadChange', {
        ev
      });
    },
    getMessage() {
      this.$store.dispatch('event/getMessage');
    },
    addMessage() {
      this.$store.dispatch('event/addMessage', {
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
    openModalForDelete(id) {
      this.$store.commit('event/openModalForDelete', {
        id
      });
    },
    closeModalForDelete() {
      this.$store.commit('event/closeModalForDelete');
    },
    deleteArticles(id) {
      console.log(id);
      this.$store.dispatch('event/deleteArticles', {
        id
      });
    },
    openModalForEdit(id) {
      this.$store.commit('event/openModalForEdit', {
        id
      });
    },
    closeModalForEdit() {
      this.$store.commit('event/closeModalForEdit');
    },
    editArticles(id) {
      this.$store.dispatch('event/editArticles', {
        id,
        name: this.name,
        place: this.place,
        comment: this.messageComment,
        image: this.image,
      });
      this.name = ''
      this.place = ''
      this.messageComment = ''
      this.image = ''
    },
    getPersonalEvent(id) {
      this.$store.dispatch('event/getPersonalEvent', {
        id
      })
    },
  },
}
</script>

<style>

</style>
