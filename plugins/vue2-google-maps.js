import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAzighvakmvCU9UN7_yfBgJvdojhzyuCc4',
    libraries: 'places'
  }
})
