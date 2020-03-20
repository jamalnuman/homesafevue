<template>
  <div id="app">

    <h1>Select an ending location from the list below.</h1>
    <!-- <form @submit.prevent="createLocation()">
      Name<input type="text" v-model="locationName">
      Address<input type="text" v-model="locationAddress">
      Phone Number<input type="text" v-model="locationPhoneNumber">
      <input type="submit" value="Enter">
    </form> -->
    
    <div>
    <h3>Ending Destinations:</h3>
      <select v-model="endingLocationId">
        <option v-for="location in locations" :value="location.id">
          {{location.name}}
        </option>
      </select>
      <button @click="showRoute()">Show Route!</button>
    </div>

    <google-map
      :startingCoords="this.startCoords"
      :endingCoords="this.endCoords"
      :currentCoords="this.currentCoords"
    /> <!-- this is the link to the google maps component..we are binding (linking) the startCoords model and it's value to the google maps component to be used on the map  -->
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
      startCoords: { lat: 41.967, lng: -87.713 },
      endCoords: null,
      currentCoords: null,
      endingLocationId: "", 
      locations: [],
      userJourneyId: "",
      gps_error: ""
    };
  },
  mounted: function() {
    axios
      .get('/api/journeys/' + this.$route.params.journeyId)
      .then(response => {
        //console.log(response)
        this.userJourneyId = response.data.user_journey[0].id;
        const data = response.data//response being stored to a variable which is being used below
        this.startCoords = { 
          lat: parseFloat(data.starting_location.latitude),//latitude and longitude are a string cause of the json return and need to be numbers when used in goodle maps 
          lng: parseFloat(data.starting_location.longitude)
        };
        // make call to get user journeys
        axios
          .get("/api/user_journeys/" + this.userJourneyId)//this is to get the endcoords..see below...the endingcoords are in the userjourney model
          .then(response => {
            //console.log(response.data)
            this.endCoords = { //ending coords will not initially be available...that is why there is an if statement in the child element (google.map.vue)
              lat: parseFloat(response.data.ending_location.latitude),
              lng: parseFloat(response.data.ending_location.longitude)
            };
          });
      });
      axios
        .get('/api/locations')
        .then(response => {
          //console.log(response)
          this.locations = response.data
        });

    this.currentLocation();
  },

  methods: {

    currentLocation: function() {
        if (navigator.geolocation) {
          let options = {
                         enableHighAccuracy: false,
                         timeout: 10000,
                         maximumAge: 0
                         };
          console.log('this is working!')
          navigator.geolocation.watchPosition(this.showGps, this.showError, options); 
        } else {
          this.gps_error = "Geolocation is not supported by this browser.";
        }
      },

    showGps: function(position) {
      //console.log(position)
      this.gps_error = "";
      this.currentCoords = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude)
      }

      let offset = 0.150;

      if ((this.currentCoords.lat >= (this.endCoords.lat - offset) && this.currentCoords.lat <= (this.endCoords.lat + offset)) && (this.currentCoords.lng >= (this.endCoords.lng - offset) && this.currentCoords.lng <= (this.endcoords.lng + offset))){
        
        let completedParams = {
          completed: true
        }

        axios
          .patch("/api/user_journeys/" + this.userJourneyId, completedParams)
          .then (response => {
            console.log(response)
          });
        }
    },

    showError: function(error) {
      //console.log(error)
      switch(error.code) {
        case error.PERMISSION_DENIED:
          this.gps_error = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          this.gps_error = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          this.gps_error = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          this.gps_error = "An unknown error occurred."
          break;
      }
    },

    showRoute: function() {
      let endingLocationParams = {
        ending_location_id: this.endingLocationId
      };

      axios
        .patch("/api/user_journeys/" + this.userJourneyId, endingLocationParams)
        .then(response => {
          //console.log(response.data)
          this.endCoords = { 
            lat: parseFloat(response.data.ending_location.latitude), //the endingcoords are being populated with this call
            lng: parseFloat(response.data.ending_location.longitude)
        };
      });
    },
  }
};
</script>