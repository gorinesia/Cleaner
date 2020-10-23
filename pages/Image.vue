<template>
  <v-app>
    <div>
      <label class="postImage-appendBtn">
        <input type="file" data-label="画像の添付">
      </label>
      <v-img :src="image_src" max-height="150" max-width="250"></v-img>
    </div>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      image_src: null
    }
  },
  mounted() {
    const storage = firebase.storage()
    const storageRef = storage.ref()
    const downRef = storageRef.child('images/doing1.jpg')
    console.log(downRef)
    downRef.getDownloadURL().then((url) => {
      this.image_src = url
    });
  }
}
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
