<template>
  <v-app>
    <v-container>
      <h2 style="text-align: center; color: #00ACC1;" class="my-5">プロジェクトをみる</h2>
      <p style="text-align: center;">プロジェクトとは、ゴミ拾いを意味するクリーナーが起こす日々の行動のことです。<br>
      あなたも日々のプロジェクトを気軽に投稿してみませんか？</p>
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
                  <label>google maps</label>
                  <input type="text" v-model="address" placeholder="例) Enter your address" id="autocomplete"><br>
                  <v-btn @click="locatorButtonPressed">検索</v-btn>
                  <div id="map"></div>
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
              <v-btn
                color="blue darken-1"
                text
                @click="addMessage"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row>
        <v-col>
          <v-card v-for="article in articles" :key="article.id">
            <template >
              <v-divider />
              <v-hover v-slot ="{ hover }">
                <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-avatar tile size="100" class="ml-5">
                        <v-img :src="article.image"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-avatar class="profile" color="grey" size="60">
                        <v-img :src="article.displayImage"></v-img>
                      </v-avatar>
                      <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ article.displayName }}</span>
                      <p class="my-2 grey--text text--darken-1">{{ article.place}}</p>
                      <p class="my-2 font-weight-bold">{{ article.comment }}</p>
                      <div v-for="post in posts" :key="post.id">
                        <div v-if="!applyFlag">
                          <v-icon color="orange" @click.stop="applyEvent(articles[0].id)" outlined>mdi-thumb-up-outline</v-icon>
                          <span>{{ post.likeSum }}</span>
                        </div>
                        <div v-if="applyFlag">
                          <v-icon  color="orange" @click.stop="cancelEvent(articles[0].id)">mdi-thumb-up</v-icon>
                          <span>{{ post.likeSum }}</span>
                        </div>
                      </div>

                    </v-col>
                    <v-col cols="12" md="5">
                      <span class="grey--text float-right mr-5"><v-icon>mdi-scale</v-icon>{{ article.name }}・{{ article.date}}</span>
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
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: 'project',
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
      likeSum: 0,
      alertPost: false,
      posts: []
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
    // this.$store.dispatch('project/getMessage', {
    // //   displayName: this.currentUser[0].displayName,
    // });
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.loginUser = user;
    //   }
    // })
    // const db = firebase.firestore();
    // // const docRef = db.collection('posts').doc(this.articles[0].id);
    // this.getEvent()
    // // this.getEvent(docRef)

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

    this.$store.dispatch('project/getMessage');

  },
  methods: {
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
        date: this.date
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
      // console.log(this.currentUser[0].email);
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
    getEvent(docRef) {
      docRef.get().then(doc => {
        if (doc.exists) {
          console.log(doc.data());
          this.posts = doc.data();
          const posts = this.posts;
          this.likeSum = this.posts.like_users.length;
          this.applyFlag = this.posts.like_users.includes(this.loginUser.uid);
        } else {
          console.log(doc.data());
        }
      });
    },
    applyEvent(id) {
      const db = firebase.firestore();
      const docRef = db.collection('posts').doc(id);
      docRef.set({
        like_users: firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
      }, { merge: true })
      this.getEvent(docRef);
    },
    cancelEvent(id) {
      const db = firebase.firestore();
      const docRef = db.collection('posts').doc(id);
      docRef.update({
        like_users: firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
      })
      this.getEvent(docRef);
    }
  }
}
</script>
