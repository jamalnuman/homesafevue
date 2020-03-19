<template>
  <div>
    <gmap-map
      :center="startingCoords"
      :zoom="16"
      style="width:100%;height:1000px;"
    >
      <!-- <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m"
        @click="center=m"
      ></gmap-marker> -->
      <gmap-marker
        :position="startingCoords"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      markers: []
    };
  },
  props: {
    startingCoords: Object
  },
  mounted() {
    // get starting location for journey (props)
    console.log(this.startingCoords);
    // center map and create marker on starting location
    
    // create marker for user's end location

    // optional: create markers for other users on journey
  },

  methods: {
    addMarker() {
      // Later
    }
  }
};
</script>