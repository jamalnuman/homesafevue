<template>
  <div>
    <gmap-map
      :center="startingCoords"
      :zoom="16"
      style="width:100%;height:1000px;"
      ref="map"
    >
      <gmap-marker
        :position="startingCoords"
      ></gmap-marker>
      <gmap-marker
        v-if="endingCoords"
        :position="endingCoords"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'

export default {
  name: "GoogleMap",
  data() {
    return {
      markers: []
    };
  },
  props: {
    startingCoords: Object,
    endingCoords: Object
  },
  mounted() {
    console.log(gmapApi)
    // var directionsService = new gmapApi.maps.DirectionsService();
    // var directionsDisplay = new gmapApi.maps.DirectionsRenderer();
    // directionsDisplay.setMap(this.$refs.map.$mapObject);
    // // get starting location for journey (props)
    // if(this.startingCoords && this.endingCoords) {
    //   directionsService.route({
    //     origin: this.startingCoords,
    //     destination: this.endingCoords,
    //     travelMode: 'DRIVING'
    //   }, function(response, status) {
    //     console.log(response);
    //     if (status === 'OK') {
    //       directionsDisplay.setDirections(response);
    //     } else {
    //       window.alert('Directions request failed due to ' + status);
    //     }
    //   });
    // }
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