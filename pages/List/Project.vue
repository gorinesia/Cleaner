<template>
  <v-app>
    <v-container>
      <h2 style="color: #00ACC1;" class="my-5">プロジェクト</h2>
      <v-alert dense text type="success" :value="alertPost" style="position: fixed; z-index: 1; right: 200px; bottom: 100px">プロジェクトの様子を投稿しました</v-alert>

      <v-row justify="center" v-if="loggedIn">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="position: fixed; z-index: 1; right: 20%; bottom: 5%"
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
                <v-text-field v-model="date" class="white" placeholder="">{{ date }}</v-text-field>
                <label>場所</label>
                <v-text-field v-model="place" class="white" placeholder="例) 東京"></v-text-field>
                <label>コメント</label>
                <v-textarea v-model="comment" class="white" placeholder="例) 今日もたくさん拾いました。"></v-textarea>
                <!-- <section style="position:relative; z-index:1;"> -->
                  <!-- <label>google maps</label> -->
                  <!-- <input type="text" v-model="address" placeholder="例) Enter your address" id="autocomplete"><br>
                  <v-btn @click="locatorButtonPressed">検索</v-btn>
                  <div id="map"></div> -->
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
              <v-btn @click="addMessage" class=" ma-3 float-right font-weight-bold" color="cyan" dark>投稿</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row class="article">
        <v-col>
          <ProjectArticle v-for="(article, index) in articles" :key="index" :id="article.id" :article="article" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ProjectArticle from '~/components/ProjectArticle.vue';

export default {
  name: 'project',
  layout: 'loggedIn',
  components: {
    ProjectArticle
  },
  data() {
    return {
      user: this.$store.state.user.user,
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      time: this.$store.state.project.time,
      date: new Date().toLocaleString(),
      comment: this.$store.state.project.comment,
      imageOverlay: false,
      dialog: false,
      address: '',
      map: '',
      applyFlag: false,
      loginUser: null,
      // likeSum: 0,
      alertPost: false,
      // article: {
      //   beLiked: false,
      // },
      posts: [],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['user/loggedIn']
    },
    uid() {
      return this.$store.getters['user/uid']
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
    personalProject() {
      return this.$store.getters['project/personalProject']
    }
  },
  mounted() {
    this.$store.dispatch('project/getMessage');
    const db = firebase.firestore();
    const docRef = db.collection('posts').where('id', '==', true);
    // this.getEvent(this.article.id)
    // this.getEvent(docRef)

    // let autocomplete = new google.maps.places.Autocomplete(
    //   document.getElementById('autocomplete'),
    //   {
    //     bounds: new google.maps.LatLngBounds(
    //       new google.maps.LatLng(45.4215296, -75.6971931)
    //     ),
    //   }
    // );
    // autocomplete.addListener('place_changed', () => {
    //   let place = autocomplete.getPlace();
    //   console.log(place);
    //   this.showLocationOnTheMap(
    //     place.geometry.location.lat(),
    //     place.geometry.location.lng())
    // });
  },
  methods: {
    // async like(id) {
    //     console.log(id);
    //   const likeRef = firebase.firestore().collection('posts').doc(id).collection('likes');
    //   await likeRef.doc(this.currentUser[0].uid).set({
    //     like_users: firebase.firestore.FieldValue.arrayUnion(this.currentUser[0].uid),
    //   }, { merge: true })
    //   this.beLiked(id);
    // },
    // async beLiked(id) {
    //   const likeRef = firebase.firestore().collection('projects');
    //   await likeRef.doc(id).update({
    //     beLiked: true
    //   })
    // },
    // async unlike(id) {
    //   const likeRef = firebase.firestore().collection('posts').doc(id).collection('likes');
    //   console.log(likeRef)
    //   await likeRef.doc(this.currentUser[0].uid).update({
    //     like_users: firebase.firestore.FieldValue.arrayRemove(this.currentUser[0].uid),
    //   })
    //   this.deleteBeLiked(id);
    // },
    // async deleteBeLiked(id) {
    //   const likeRef = firebase.firestore().collection('projects');
    //   await likeRef.doc(id).update({
    //     beLiked: false
    //   })
    // },
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
    getMessage() {
      this.$store.dispatch('project/getMessage', {
        displayName: this.currentUser[0].displayName,
      })
    },
    addMessage() {
      this.$store.dispatch('project/addMessage', {
        uid: this.currentUser[0].uid,
        displayName: this.currentUser[0].displayName,
        displayImage: this.currentUser[0].image,
        name: this.name,
        place: this.place,
        comment: this.comment,
        image: this.image,
        date: this.date,
        beliked: false
      });
      this.alertPost = true;
      setTimeout(() => {
        this.alertPost = false
      }, 3000);
      this.name = '';
      this.place = '';
      this.comment = '';
      this.date = '';
      this.dialog = false;
    },
    getPersonalId(id) {
      console.log(id);
      this.$store.dispatch('project/getPersonalProject', {
        id
      })
    },
    locatorButtonPressed() {
      this.spinner = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
            this.showLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            this.error =
              'Locator is unable to find your address. Please type your address manually.';
          }
        );
      } else {
        this.error = error.message;
        console.log('Your browser does not support geolocation API');
      }
    },
    getAddressFrom(lat, long) {
      axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          lat +
          ',' +
          long +
          '&key=AIzaSyAzighvakmvCU9UN7_yfBgJvdojhzyuCc4'
      )
      .then((response) => {
        if (response.data.error_message) {
          this.error = response.data.error_message;
          console.log(response.data.error_message);
        } else {
          this.address = response.data.results[0].formatted_address;
        }
      })
      .catch((error) => {
        this.error = error.message;
        console.log(error.message);
      })
    },
    showLocationOnTheMap(latitude, longitude) {
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map
      })
    },
    async getEvent(docRef) {
      await docRef.get().then(doc => {
        if (doc.exists) {
          console.log(doc.data());
          this.posts = doc.data();
          const posts = this.posts;
          this.likeSum = this.posts.uid.length;
          this.applyFlag = this.posts.uid.includes(this.loginUser.uid);
        } else {
          console.log(doc.data());
        }
      });
    },
    async applyEvent(id) {
      const db = firebase.firestore();
      const docRef = await db.collection('posts').doc(id);
      docRef.set({
        uid: this.currentUser[0].uid
        // like_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
      }, { merge: true })
      await this.getEvent(docRef);
      this.applyEvent = true;
    },
    async cancelEvent(id) {
      const db = firebase.firestore();
      const docRef = await db.collection('posts').doc(id);
      docRef.delete()
      // docRef.update({
      //   like_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
      // })
      await this.getEvent(docRef);
      this.applyEvent = false;
    }
  }
}
</script>

<style lang="scss" scoped>

.article {
  margin: 6px;
}

.user--name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #00ACC1;
  margin-bottom: 3px;
}

.user--place {
  margin: 2px 0px;
  margin-left: 5px;
  color: #757575;
  // display: inline-block
}
</style>
