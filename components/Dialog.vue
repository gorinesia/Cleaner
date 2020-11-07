<template>
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
</template>

<script>
export default {

}
</script>

<style>

</style>
