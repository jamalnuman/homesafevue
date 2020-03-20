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
      startCoords: { lat: 45.508, lng: -73.587 },
      endCoords: null,
      endingLocationId: "", 
      // locationName: "",
      // locationAddress: "",
      // locationPhoneNumber: "",
      locations: [],
      userJourneyId: ""
    };
  },
  mounted: function() {
    axios
      .get('/api/journeys/' + this.$route.params.journeyId)
      .then(response => {
        console.log(response)
        this.userJourneyId = response.data.user_journey[0].id;
        const data = response.data//response being stored to a variable which is being used below
        this.startCoords = { 
          lat: parseFloat(data.starting_location.latitude),//latitude and longitude are a string cause of the json return and need to be numbers when used in goodle maps 
          lng: parseFloat(data.starting_location.longitude)
        };
        // make call to get user journeys
        axios
          .get("/api/user_journeys/" + this.userJourneyId)
          .then(response => {
            console.log(response.data)
            this.endCoords = { 
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
  },
  methods: {
    
    // createLocation: function() {
    //   var locationParams = {
    //     name: this.locationName,
    //     address: this.locationAddress,
    //     phone_number: this.locationPhoneNumber
    //   };

    //   axios
    //     .post('/api/locations', locationParams)
    //     .then(response => {
    //       this.locations.push(response.data);
    //       this.endCoords = { 
    //         lat: parseFloat(data.location.latitude),
    //         lng: parseFloat(data.location.longitude)
    //     };

    //   });
    // },

    showRoute: function() {
      let endingLocationParams = {
        ending_location_id: this.endingLocationId
      };

      axios
        .patch("/api/user_journeys/" + this.userJourneyId, endingLocationParams)
        .then(response => {
          //display the route with two markers
          console.log(response.data)
          this.endCoords = { 
            lat: parseFloat(response.data.ending_location.latitude),
            lng: parseFloat(response.data.ending_location.longitude)
        };
      });
    },
  }
};
</script>