<template>
  <v-app>
    <v-container>
      <label class="postImage-appendBtn"></label>
      <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
      <v-img :src="image" width="100" height="100"></v-img>
      <label>ゴミの量</label>
      <v-text-field v-model="name" class="white"></v-text-field>
      <label>場所</label>
      <v-text-field v-model="place" class="white"></v-text-field>
      <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
      <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
    </v-container>
    <v-divider inset></v-divider>
    <v-container>
      <v-row v-for="message in articles" :key="message.id" class="ma-1">
        <v-card width="100%">
          <v-row v-for="currentUser in currentUser" :key="currentUser.id">
            <v-col cols="3">
              <v-img :src="message.image" max-height="100" max-width="200" class="ml-1"></v-img>
            </v-col>
            <v-col cols="3">
              <v-img :src="currentUser.image" width="30px" height="30px"></v-img>
              <v-card-title class="cyan--text text--darken-1">{{ currentUser.displayName }}</v-card-title>
              <p>{{ message.place }}</p>
              <p>{{ message.messageComment }}</p>
            </v-col>
            <v-col cols="4">
              <span>{{ message.date }}</span>
            </v-col>
            <v-col cols="1">
              <v-btn @click="openModalForEdit(message.id)" class="float-right">編集</v-btn>

              <v-overlay :value="editOverlay">
                <label class="postImage-appendBtn"></label>
                <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付">
                <v-img :src="image" width="100" height="100"></v-img>
                <br>
                <label for="garbage">ゴミの量</label>
                <v-text-field v-model="name"></v-text-field>
                <label for="garbage">場所</label>
                <v-text-field v-model="place"></v-text-field>
                <v-textarea v-model="messageComment" placeholder="コメントを入力"></v-textarea>
                <v-btn @click="editArticles(articleId)">編集</v-btn>
                <v-btn @click="closeModalForEdit">閉じる</v-btn>
              </v-overlay>
            </v-col>
            <v-col cols="1">
              <v-btn @click="openModalForDelete(message.id)" class="float-right">削除</v-btn>
              <v-overlay :value="deleteOverlay">
                <p>本当に記事を削除しますか？</p>
                <v-btn @click="deleteArticles(articleId)">削除</v-btn>
                <v-btn @click="closeModalForDelete">閉じる</v-btn>
              </v-overlay>

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
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      date: this.$store.state.project.date,
      messageComment: this.$store.state.project.messageComment,
    }
  },
  computed: {
    articles() {
      return this.$store.getters['project/articles']
    },
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    image: {
      get() {
        return this.$store.getters['project/image']
      },
      set(value) {
        this.$store.commit('project/setImage', value)
      }
    },
    deleteOverlay() {
      return this.$store.getters['project/deleteOverlay']
    },
    articleId() {
      return this.$store.getters['project/articleId']
    },
    editOverlay() {
      return this.$store.getters['project/editOverlay']
    },
  },
  mounted() {
    this.$store.dispatch('project/getMessage');
  },
  methods: {
    btnUploadChange(ev) {
      this.$store.dispatch('project/btnUploadChange', {
        ev
      });
    },
    getUrl(ev) {
      this.$store.dispatch('project/getUrl', {
        ev
      });
    },
    getMessage() {
      this.$store.dispatch('project/getMessage');
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
    openModalForDelete(id) {
      this.$store.commit('project/openModalForDelete', {
        id
      });
    },
    closeModalForDelete() {
      this.$store.commit('project/closeModalForDelete');
    },
    deleteArticles(id) {
      console.log(id);
      this.$store.dispatch('project/deleteArticles', {
        id
      });
    },
    openModalForEdit(id) {
      this.$store.commit('project/openModalForEdit', {
        id
      });
    },
    closeModalForEdit() {
      this.$store.commit('project/closeModalForEdit');
    },
    editArticles(id) {
      this.$store.dispatch('project/editArticles', {
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
