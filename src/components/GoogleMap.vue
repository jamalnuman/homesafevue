<template>
  <div>
    <gmap-map
      :center="startingCoords"
      :zoom="14"
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
      <gmap-marker
        :position="currentCoords"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'


let directionsService;
let directionsDisplay;
export default {
  name: "GoogleMap",
  data() {
    return {
      markers: []
    };
  },
  props: {
    startingCoords: Object,
    endingCoords: Object,
    currentCoords: Object
  },
  mounted() {
    //console.log(gmapApi)
    console.log('mounted start');
    this.$gmapApiPromiseLazy().then(() => { 
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();
    });

    // center map and create marker on starting location
    
    // create marker for user's end location

    // optional: create markers for other users on journey
  },

  methods: {
    showRoute() {
      this.$gmapApiPromiseLazy().then(() => { 
        directionsDisplay.setMap(this.$refs.map.$mapObject);
        
        // get starting location for journey (props)
        console.log(this.startingCoords);
        console.log(this.endingCoords);

        if(this.startingCoords && this.endingCoords) {
          const start = new google.maps.LatLng(this.startingCoords.lat, this.startingCoords.lng);
          const end = new google.maps.LatLng(this.endingCoords.lat, this.endingCoords.lng);
          console.log(this.startingCoords);
          console.log(this.endingCoords);
          directionsService.route({
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        }
      });
    },
    addMarker() {
      // Later
    }
  }
};
</script>