<template>
  <v-app>
    <div>
      <section class="ui two column centered grid" style="position: relative; z-index: 1;">
        <div class="column">
          <form class="ui segment large form">
            <div class="ui message red" v-show="error">{{ error }}</div>
            <div class="ui segment">
              <div class="field">
                <div class="ui right icon input large" :class="{loading: spinner}">
                  <input type="text" placeholder="Enter your address" v-model="address" id="autocomplete" />
                  <i class="dot circle link icon" @click="locatorButtonPressed"></i>
                </div>
              </div>
              <button class="ui button">Go</button>
            </div>
          </form>
        </div>
      </section>
      <section id="map"></section>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      address: '',
      error: '',
      spinner: false
    }
  },
  mounted() {
    console.log(process.env.GOOGLE_MAPS_KEY);
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(45.4215296, -75.6971931)
        )
      }
    );

    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      console.log(place);
      this.showUserLocationOnTheMap(place.geometry.location.lat(), place.geometry.location.lng());
    })
  },
  methods: {
    locatorButtonPressed() {
      this.spinner = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );

            this.showUserLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            )
          },
          error => {
            this.error = error.message;
            this.spinner = false;
            // console.log(error.message);
          }
        );
      } else {
        this.error = error.message;
        console.log('Your browser does not support geolocation API');
      }
    },
    getAddressFrom(lat, long) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
      + ${lat}
      + ,
      + ${long}
      + &key=${process.env.GOOGLE_MAPS_KEY}`)
        .then(response => {
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
        .catch(error => {
          this.error = error.message;
          this.spinner = false;
          console.log(error.message);
        })
    },
    showUserLocationOnTheMap(latitude, longitude) {
      // Create a Map object
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // Add a marker
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map
      })
    }
  }
}
</script>

<style>
.ui.button,
.dot.circle.icon {
  background-color: #ff5a5f;
  color: white;
}

.pac-icon {
  display: none;
}

.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

.pac-item-query {
  font-size: 16px;
}

#map {
  position: absolute;
  top: 200px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: red;
  width: 75%;
  margin: 0 auto;
}
</style>
