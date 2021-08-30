<template>
  <v-app>
    <v-container>
      <h2 style="color: #00acc1" class="my-5">プロジェクト</h2>
      <v-alert
        dense
        text
        type="success"
        :value="alertPost"
        style="position: fixed; z-index: 1; right: 200px; bottom: 100px"
        >プロジェクトの様子を投稿しました</v-alert
      >

      <v-row justify="center" v-if="loggedIn">
        <v-dialog v-model="dialog" persistent max-width="600px">
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
                <input
                  type="file"
                  id="btnUpload"
                  @change="btnUploadChange"
                  value="アップロード"
                  data-label="画像の添付"
                /><br />
                <v-img :src="image" width="100" height="100"></v-img>
                <label>ゴミの量</label>
                <v-text-field
                  v-model="amount"
                  class="white"
                  placeholder="例) 5kg"
                ></v-text-field>
                <label>日時</label>
                <v-text-field v-model="date" class="white" placeholder="">{{
                  date
                }}</v-text-field>
                <label>コメント</label>
                <v-textarea
                  v-model="comment"
                  class="white"
                  placeholder="例) 今日もたくさん拾いました。"
                ></v-textarea>
                <label>場所</label>
                <div class="map_section">
                  <section
                    class="ui two column centered grid"
                    style="position: relative; z-index: 1"
                  >
                    <div class="column">
                      <form class="ui segment large form">
                        <div class="ui message red" v-show="error">
                          {{ error }}
                        </div>
                        <div class="ui segment">
                          <div class="field">
                            <div
                              class="ui right icon input large"
                              :class="{ loading: spinner }"
                            >
                              <input
                                type="text"
                                placeholder="Enter your address"
                                v-model="address"
                                id="autocomplete"
                              />
                              <i
                                class="dot circle link icon"
                                @click="locatorButtonPressed"
                              ></i>
                            </div>
                          </div>
                          <!-- <button class="ui button">Go</button> -->
                        </div>
                      </form>
                    </div>
                  </section>
                  <section id="map"></section>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                閉じる
              </v-btn>
              <v-btn
                @click="addMessage"
                class="ma-3 float-right font-weight-bold"
                color="cyan"
                dark
                >投稿</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row class="article">
        <v-col>
          <div
            v-for="article in articles"
            :key="article.id"
            @click="getComponentsId(article.id, article.address)"
          >
            <ProjectArticleCopy
              :id="article.id"
              :article="article"
              :articles="articles"
              :address="article.address"
              class="personal_article"
            >
            </ProjectArticleCopy>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";
import ProjectArticleCopy from "~/components/ProjectArticleCopy.vue";

export default {
  name: "project",
  layout: "loggedIn",
  components: {
    ProjectArticleCopy,
  },
  data() {
    return {
      user: this.$store.state.user.user,
      amount: this.$store.state.project.amount,
      time: this.$store.state.project.time,
      date: new Date().toLocaleString(),
      comment: this.$store.state.project.comment,
      imageOverlay: false,
      dialog: false,
      address: "",
      error: "",
      spinner: false,
      map: "",
      applyFlag: false,
      loginUser: null,
      alertPost: false,
      posts: [],
      id: "",
      lists: "",
      article: "",
      latitude: 0,
      longitude: 0,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    uid() {
      return this.$store.getters["user/uid"];
    },
    currentUser() {
      return this.$store.getters["user/currentUser"];
    },
    articles() {
      return this.$store.getters["project/articles"];
    },
    image: {
      get() {
        return this.$store.getters["project/image"];
      },
      set(value) {
        this.$store.commit("project/setImage", value);
      },
    },
    personalProject() {
      return this.$store.getters["project/personalProject"];
    },
  },
  mounted() {
    console.log("window");
    // window.scrollTo(0, 1000);
    this.$store.dispatch("project/getMessage");
    const db = firebase.firestore();
    const docRef = db.collection("posts").where("id", "==", true);

    console.log(process.env.GOOGLE_MAPS_KEY);
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(45.4215296, -75.6971931)
        ),
      }
    );

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      console.log(place);
      this.showUserLocationOnTheMap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
  },
  methods: {
    showImage() {
      this.imageOverlay = true;
    },
    closeModalForImage() {
      this.imageOverlay = false;
    },
    btnUploadChange(ev) {
      this.$store.dispatch("project/btnUploadChange", {
        ev,
      });
    },
    getMessage() {
      this.$store.dispatch("project/getMessage", {
        displayName: this.currentUser[0].displayName,
      });
    },
    addMessage() {
      this.$store.dispatch("project/addMessage", {
        uid: this.currentUser[0].uid,
        displayName: this.currentUser[0].displayName,
        displayImage: this.currentUser[0].image,
        name: this.name,
        address: this.address,
        comment: this.comment,
        image: this.image,
        date: this.date,
        beliked: false,
        latitude: this.latitude,
        longitude: this.longitude,
      });
      this.alertPost = true;
      setTimeout(() => {
        this.alertPost = false;
      }, 3000);
      this.name = "";
      this.place = "";
      this.comment = "";
      this.date = "";
      (this.address = ""), (this.dialog = false);
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

            this.showUserLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );

            console.log(position.coords.latitude, position.coords.longitude);

            let latiValue = position.coords.latitude;
            let longiValue = position.coords.longitude;

            // let p = 3.14159265;
            // let n = NSNumber(float: Float(p));

            this.getLatitudeLongitude(latiValue, longiValue);
          },
          (error) => {
            this.error = error.message;
            this.spinner = false;
            // console.log(error.message);
          }
        );
      } else {
        this.error = error.message;
        console.log("Your browser does not support geolocation API");
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=
      + ${lat}
      + ,
      + ${long}
      + &key=${process.env.GOOGLE_MAPS_KEY}`
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            this.spinner = false;
            console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.spinner = false;
          console.log(error.message);
        });
    },
    showUserLocationOnTheMap(latitude, longitude) {
      // Create a Map object
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      // Add a marker
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },
    getLatitudeLongitude(latitude, longitude) {
      console.log(latitude, longitude);
      this.latitude = latitude;
      this.longitude = longitude;
      // return getLatitudeLongitude(latitude, longitude);
      return this.latitude, this.longitude;
    },
    async getComponentsId(id, address) {
      console.log(id, address);
      await this.$store.dispatch("project/getComponentsProject", {
        id,
        address,
      });
    },
  },
};
</script>

<style scoped>
.personal_article {
  cursor: pointer;
}
.map_section {
  margin-top: 20px;
}
#map {
  background-color: #00acc1;
  width: 500px;
  height: 350px;
  margin: 0 auto;
}

.ui[class*="two column"].grid > .column:not(.row),
.ui[class*="two column"].grid > .row > .column {
  width: 100%;
}
</style>
