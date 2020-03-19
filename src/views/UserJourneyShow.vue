<template>

  <!-- <div class="userjourney-show">
    
  <h1>this is the user journey show page</h1>
  </div> -->
  <div id="app">
    <!-- <pick-location/ > -->
    <google-map
      :startingCoords="this.startCoords"

    />
  </div>
</template>

<script>
import axios from 'axios';
import GoogleMap from "../components/GoogleMap";

export default {
  name: "UserJourneyShow",
  components: {
    GoogleMap
  },
  data() {
    return {
      startCoords: { lat: 45.508, lng: -73.587 },
      endCoords: {}
    };
  },
  mounted: function() {
    axios
      .get('/api/journeys/' + this.$route.params.journeyId)
      .then(response => {
        console.log(response.data);
        const data = response.data
        this.startCoords = { 
          lat: parseFloat(data.starting_location.latitude), 
          lng: parseFloat(data.starting_location.longitude) 
        };
        
      });
  },
  methods: {

  }
};
</script>