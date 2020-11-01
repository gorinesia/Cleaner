<template>
  <div class="page">
    <GmapMap
      :center="{lat: 35.5814366, lng: 139.767157}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
        ></GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [{ position: { lat: 10, ing: 10 } }]
    }
  }
}
</script>

<style>

</style>
