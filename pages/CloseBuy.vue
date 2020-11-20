<template>
  <div class="ui grid">
    <div class="six wide column red">
      <form class="ui segment large form">
        <div class="ui message cyan" v-show="error">{{ error }}</div>
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input large" :class="{loading:spinner}">
              <input type="text" placeholder="Enter your address" v-model="address" id="autocomplete" />
              <i class="dot circle link icon" @click="locatorButtonPressed"></i>
            </div>
          </div>
          <div class="field">
            <div class="two fields">
              <div class="field">
                <select v-model="type">
                  <option value="restaurant">Restraurant</option>
                </select>
              </div>
              <div class="field">
                <select v-model="radius">
                  <option value="5">5KM</option>
                  <option value="10">10KM</option>
                  <option value="15">15M</option>
                  <option value="20">20KM</option>
                </select>
              </div>
            </div>
          </div>
          <button class="ui button" @click="findCloseBuyButtonPressed">Find CloseBuy Places</button>
        </div>
      </form>
    </div>
    <div class="ten wide column blue"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      address: '',
      error: '',
      spinner: false,
      apiKey: 'AIzaSyAzighvakmvCU9UN7_yfBgJvdojhzyuCc4',
      lat: 0,
      lng: 0,
      type: '',
      radius: ''
    }
  },
  mounted() {
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(45.4215296, -75.6971931)
        )
      }
    );

    // autocomplete.addListener('place_changed', () => {
    //   let place = autocomplete.getPlace();
    //   console.log(place);
    //   this.showUserLocationOnTheMap(place.geometry.location.lat(), place.geometry.location.lng())
    // });
  },
  methods: {
    locatorButtonPressed() {
      this.spinner = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
            // this.showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude);
          },
          error => {
            this.error = 'Locator is unable to find your address. Please type your address manually.';
            this.spinner = false;
            // console.log(error.message);
          }
        );
      } else {
        this.error = error.message;
        this.spinner = false;
        console.log('Your browser does not support geolocation API');
      }
    },
    getAddressFrom(lat, long) {
      axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          lat +
          ',' +
          long +
          '&key=' + this.apiKey
      )
      .then(response => {
        if (response.data.error_message) {
          this.error = response.data.error_message;
          console.log(response.data.error_message);
        } else {
          this.address = response.data.results[0].formatted_address;
          // console.log(response.data.results[0].formatted_address);
        }
        this.spinner = false;
      })
      .catch(error => {
        this.error = error.message;
        this.spinner = false;
        console.log(error.message);
      })
    },
    // showUserLocationOnTheMap(latitude, longitude) {
    //   let map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 15,
    //     center: new google.maps.LatLng(latitude, longitude),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   });

    //   new google.maps.Marker({
    //     position: new google.maps.LatLng(latitude, longitude),
    //     map: map
    //   })
    // },
    findCloseBuyButtonPressed() {
      console.log(this.lat);
      console.log(this.lng);
      console.log(this.type);
      console.log(this.radius);
    }
  }
}
</script>

<style>
.ui.button,
.dot.circle.icon {
  background-color: teal;
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: teal;
}
</style>
