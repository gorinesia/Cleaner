<template>
  <v-app>
    <v-container>
      <div>イベントを作成する</div>
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
      <v-textarea v-model="messageComment" class="white" placeholder="例）渋谷を綺麗にしましょう"></v-textarea>
      <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
    </v-container>
    <v-divider inset></v-divider>
    <v-container>
      <v-row v-for="message in articles" :key="message.id" class="ma-1">
        <v-spacer></v-spacer>

        <v-btn @click="openModalForEdit(message.id)" class="float-right">編集</v-btn>

        <v-overlay :value="editOverlay">
          <v-card>
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
          <v-textarea v-model="messageComment" class="white" placeholder="例）渋谷を綺麗にしましょう"></v-textarea>
          <v-btn @click="editArticles(articleId)">編集</v-btn>
          <v-btn @click="closeModalForEdit">閉じる</v-btn>
          </v-card>
        </v-overlay>

        <v-btn @click="openModalForDelete(message.id)" class="float-right mb-1">削除</v-btn>
          <v-overlay :value="deleteOverlay">
            <p>本当に記事を削除しますか？</p>
            <v-btn @click="deleteArticles(articleId)">削除</v-btn>
            <v-btn @click="closeModalForDelete">閉じる</v-btn>
          </v-overlay>


        <v-card width="100%">
          <v-row v-for="currentUser in currentUser" :key="currentUser.id">
            <v-col cols="2">
              <p class="pa-5">{{ message.place }}</p>
            </v-col>
            <v-col cols="3">
              <v-img :src="currentUser.image" width="30px" height="30px"></v-img>
              <v-card-title class="cyan--text text--darken-1">{{ currentUser.displayName }}</v-card-title>
              <span>{{ message.time }}</span>
            </v-col>
            <v-col cols="4">
              <span>{{ message.date }}</span>
            </v-col>
            <v-col cols="3">

              <v-img :src="message.image" max-height="200" max-width="200" class="pa-5 mt-5"></v-img>

            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'loggedIn',
  data() {
    return {
      name: this.$store.state.event.name,
      place: this.$store.state.event.place,
      time: this.$store.state.event.time,
      date: this.$store.state.event.date,
      messageComment: this.$store.state.event.messageComment,
    }
  },
  computed: {
    articles() {
      return this.$store.getters['event/articles']
    },
    currentUser() {
      return this.$store.getters['user/currentUser']
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
    articleId() {
      return this.$store.getters['event/articleId']
    },
    editOverlay() {
      return this.$store.getters['event/editOverlay']
    },
  },
  mounted() {
    this.$store.dispatch('event/getMessage');
  },
  methods: {
    btnUploadChange(ev) {
      this.$store.dispatch('event/btnUploadChange', {
        ev
      });
    },
    getUrl(ev) {
      this.$store.dispatch('event/getUrl', {
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
        time: this.time,
        comment: this.messageComment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.name = '';
      this.place = '';
      this.time = ','
      this.messageComment = '';
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
  }
};
</script>
