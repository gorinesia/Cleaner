<template>
  <v-app class="mx-10">
    <h2>プロフィール編集</h2>
    <v-alert dense text type="success" :value="alert">プロフィール情報を更新しました</v-alert>
    <v-container max-width="600px">
    <h2 class="grey--text">ユーザー情報</h2>
      <label class="postImage-appendBtn block">プロフィール画像</label>
      <input class="d-block" type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付"><br>
      <label>ユーザー名</label>
      <v-text-field v-model="name" class="white"></v-text-field>
      <label>場所</label>
      <v-text-field v-model="place" class="white"></v-text-field>
      <label>ひとこと</label>
      <v-textarea v-model="messageComment" class="white" placeholder="コメントを入力"></v-textarea>
      <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>更新</v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'loggedIn'
}
</script>

<style>

</style>
