<template>
  <div id="app">
    <div id="route" class="container">
      <h3>Select an ending location from the list below</h3>
      <div align="center">
        <select v-model="endingLocationId">
          <option v-for="location in locations" :value="location.id">
            {{location.name}}
          </option>
        </select>
        <div>
          <button id="showroute" class="btn btn-outline-success btn-lg btn-block" @click="showRoute()">Display Route!</button>
        </div>
        <div>
          <button id="delete" class="btn btn-outline-success btn-lg btn-block" @click="deleteRoute()">Cancel Route!</button>
          <!-- <button class="btn btn-outline-success btn-lg btn-block" @click="completeRoute()">Completed Route!</button> -->
        </div>
      </div>
    </div>

    <google-map
      :startingCoords="this.startCoords"
      :endingCoords="this.endCoords"
      :currentCoords="this.currentCoords"
      ref="googleMap"
    /> <!-- this is the link to the google maps component..we are binding (linking) the startCoords model and it's value to the google maps component to be used on the map  -->
  </div>
</template>

<style scoped>
  select {
    width: 350px;
    margin: 10px;
  }
  #showroute {
    margin-top: 5px;
  }
  #delete {
    margin-top: 5px;
  }
  #route {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    margin-bottom: 5px;
  }
</style>

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
      gps_error: "",
      journeyCompleted: true
    };
  },
  mounted: function() {
    axios
      .get('/api/journeys/' + this.$route.params.journeyId)
      .then(response => {
        const data = response.data//response being stored to a variable which is being used below
        data.user_journey.forEach(uj => {
          if (uj.user_id.toString() === this.$route.params.id) {
            this.userJourneyId = uj.id;
          }
        });

        this.startCoords = { 
          lat: parseFloat(data.starting_location.latitude),//latitude and longitude are a string cause of the json return and need to be numbers when used in goodle maps 
          lng: parseFloat(data.starting_location.longitude)
        };
        // make call to get user journeys
        axios
          .get("/api/user_journeys/" + this.userJourneyId)//this is to get the endcoords..see below...the endingcoords are in the userjourney model
          .then(response => {
            if(response.data.ending_location.latitude) {
              this.journeyCompleted = response.data.completed;
              console.log(response.data.ending_location.latitude);
              this.endCoords = { //ending coords will not initially be available...that is why there is an if statement in the child element (google.map.vue)
                lat: parseFloat(response.data.ending_location.latitude),
                lng: parseFloat(response.data.ending_location.longitude)
              };
              this.$refs.googleMap.showRoute();
            }
            
          }).catch(error => {
            console.log(error);
          });
      });
      axios
        .get('/api/locations')
        .then(response => {
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
          navigator.geolocation.watchPosition(this.showGps, this.showError, options); 
        } else {
          this.gps_error = "Geolocation is not supported by this browser.";
        }
      },

    showGps: function(position) {
      this.gps_error = "";
      this.currentCoords = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude)
      }

      // this.currentCoords = {
      //   lat: 41.89,
      //   lng: -87.63
      //   //latitude: 0.418923e2, longitude: -0.8763443e2
      // }

      let offset = 0.150;

      if (this.currentCoords && this.endCoords) {
        if ((this.currentCoords.lat >= (this.endCoords.lat - offset) && 
          this.currentCoords.lat <= (this.endCoords.lat + offset)) && 
          (this.currentCoords.lng >= (this.endCoords.lng - offset) && 
            this.currentCoords.lng <= (this.endCoords.lng + offset))) {

          let completedParams = {
            completed: true
          }
          if (!this.journeyCompleted) {
            axios
              .patch("/api/user_journeys/" + this.userJourneyId, completedParams)
              .then (response => {
                console.log(response);
                this.journeyCompleted = true;
                alert('Trip has completed!')
              });
            }
          }
          
      }
    },

    showError: function(error) {
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
          this.endCoords = { 
            lat: parseFloat(response.data.ending_location.latitude), //the endingcoords are being populated with this call
            lng: parseFloat(response.data.ending_location.longitude)
          };
          this.$refs.googleMap.showRoute();
        }).catch(error => {
          console.log(error);
        });
    },

    deleteRoute: function() {
      this.$router.push('/users/' + this.$route.params.id)
    },
    // completeRoute: function() {
    //   this.$router.push('/users/' + this.$route.params.id)
    // },
  }
};
</script>