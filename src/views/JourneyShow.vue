<template>
  <div class="journey-show">
    <form v-on:submit.prevent="getLocation()">
      <h2> Your current latitude: {{lat}}</h2>
      <h2> Your current longitude: {{long}}</h2>
      <h2>{{gps_error}}</h2>
      <input type="submit" value="Get Coordinates">
    </form>

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <h1>Lets create a Journey!</h1>

    <h3>Please enter a starting point</h3>
      Starting Address: <input type="text" v-model="starting_address">
    <h3>Your starting latitude: {{latitude}}</h3>
    <h3>Your ending longitude: {{longitude}}</h3>

    <div>
      <button @click="createJourney()">Create Journey!</button>
    </div>

  </div>
  
</template>

<style>
  
</style>

<script>
var axios = require('axios')

export default {
  data: function(){
    return {
      starting_address: "",
      latitude:"",
      longitude:"",
      errors: [],
      lat: "",
      long: "",
      gps_error: ""
    }
  },

  created: function() {},
  methods:{

  getLocation: function() {
    if (navigator.geolocation) {
      var options = {
                     enableHighAccuracy: true,
                     timeout: 20000,
                     maximumAge: 0
                     };
      navigator.geolocation.watchPosition(this.showGps, this.showError, options); 
    } else {
      this.gps_error = "Geolocation is not supported by this browser.";
    }
  },

  showGps: function(position) {
    console.log(position)
    this.gps_error = "";
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
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

  createJourney: function(){
    var journeyParams = {
      address: this.starting_address
    };

    axios
      .post('/api/locations', journeyParams)
      .then(response => {
        //console.log(response)
        this.latitude = response.data.latitude;
        this.longitude = response.data.longitude;    
        
        if(navigator.geolocation) {            
           var options = {
                          enableHighAccuracy: true,
                          timeout: 20000,
                          maximumAge: 0
                          };

           navigator.geolocation.watchPosition(this.showGps, this.showError, options);
        } else {
           alert("Sorry, browser does not support geolocation!");
        }
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
  }
}
</script>