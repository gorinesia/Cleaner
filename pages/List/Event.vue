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
                <v-text-field v-model="time" type="date" class="white" placeholder="例）11月7日 9:00"></v-text-field>
                <label>場所</label>
                <v-text-field v-model="place" class="white" placeholder="例）東京"></v-text-field>
                <label>イベント説明</label>
                <v-textarea v-model="comment" class="white" placeholder="例）渋谷を綺麗にしましょう"></v-textarea>
                <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
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
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row>
        <v-col>
          <v-card v-for="event in events" :key="event.id">
            <template>
                <v-divider />
                <v-hover v-slot="{ hover }">
                  <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(event.id)">
                      <v-row :key="event.id" >
                        <v-col cols="9">
                          <v-col>
                            <v-avatar class="profile" color="grey" size="60">
                              <v-img :src="event.displayImage"></v-img>
                            </v-avatar>
                            <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ event.name }}</span>
                            <p class="my-5 font-weight-bold">{{ event.comment }}</p>
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
            </template>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'event',
  data() {
    return {
      name: this.$store.state.event.name,
      time: this.$store.state.event.time,
      place: this.$store.state.event.place,
      date: this.$store.state.event.date,
      comment: this.$store.state.event.comment,
      image_src: require('@/assets/img/top-page.jpg'),
      imageOverlay: false,
      dialog: false,
      loggedIn: this.$store.state.user.loggedIn,
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    events() {
      return this.$store.getters['event/events']
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
    getPersonalId(id) {
      this.$store.dispatch('event/getPersonalEvent', {
        id
      })
    },
  },
}
</script>

<style>

</style>
