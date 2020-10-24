<template>
  <v-app>
    <div>
      <label class="postImage-appendBtn">
        <input type="file" id="btnUpload" @change="btnUploadChange" value="アップロード" data-label="画像の添付">
        <v-img :src="image_update" max-height="150" max-width="250"></v-img>
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
      image_src: null,
      image_update: null
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
  },
  methods: {
    btnUploadChange(ev) {
      console.log(ev)
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const uploadRef = storageRef.child('images/doind2.jpg');
      const f = ev.target.files[0];
      console.log(f)
      uploadRef.put(f).then((snapshot) => {
        console.log('Uploaded a blob or file');
      })
      uploadRef.getDownloadURL().then((url) => {
        console.log('imgSample' + url);
        this.image_update = url;
      })
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
