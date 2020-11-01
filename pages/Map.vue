<template>
  <div>
    <v-btn @click="onClickCurrent">getCurrentPosition</v-btn>
    <p>{{ currentLoc.coords }}</p>
      <GmapMap
        class="map-panel" map-type-id="terrain"
        style="width: 500px; height: 300px;"
        :draggable="true"
        :center="maplocation"
        :zoom="15"
        ref="mmm"
      >
        <GmapMarker
          :position="maplocation"
          ></GmapMarker>
      </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // maplocation: {lat: 0, lng: 0},
      currentLoc: {},
      maplocation: {lng: 0, lat: 0}
    }
  },
  methods:{
    async onClickCurrent(){
        console.log('--onClickCurrent')
        try{
            let data =await getPosition();
            console.log('--success',data)
            console.log('typeof', typeof(data))

            let data2={};
            data2.lat = data.coords.latitude ;
            data2.lng = data.coords.longitude ;
            data2.alt = data.coords.altitude ;
            data2.accLatlng = data.coords.accuracy ;
            data2.accAlt = data.coords.altitudeAccuracy ;
            data2.heading = data.coords.heading ;           //0=北,90=東,180=南,270=西
            data2.speed = data.coords.speed ;

            // Object.assign(data2,data.coords); // not work
            // this.$set(this.currentLoc,"data2",data.coords);//not work
            console.log('data2',data2)
            this.$set(this.currentLoc,"coords",data2);

            //set Googlemap
            this.maplocation.lat = data2.lat;
            this.maplocation.lng = data2.lng;
            this.$refs.mmm.panTo(this.maplocation );

        }catch(e){
            console.log('--error',e);
        }
    }
  },
}
var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
</script>

<style>

</style>
