<template>
  <div class="journey-show">

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <h1>Lets create a Journey!</h1>

    <h3>Please enter a starting point</h3>
    Starting Address: <input type="text" v-model="starting_address">
    <h3>Your Latitude is: {{latitude}}</h3>
    <h3>Your Longitude is: {{longitude}}</h3>

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
      errors: []
    }
  },
  created: function() {},
  methods:{
    createJourney: function(){
      var journeyParams = {
        address: this.starting_address
      };

      axios
        .post('/api/locations', journeyParams)
        .then(response => {
          console.log(response)
          this.latitude = response.data.latitude;
          this.longitude = response.data.longitude;

          var latLong = {
                         lat: this.latitude, 
                         long: this.longitude
                         };

          var error = function(err) {
                        if (err.code == 1) {
                         alert("Error: Access is denied!");
                        } else if (err.code == 2) {
                         alert("Error: Position is unavailable!");
                        }
                      };
    
    
          if(navigator.geolocation) {            
             var options = {
                            enableHighAccuracy: true,
                            timeout: 60000,
                            maximumAge: 1000 * 60 * 60
                            };

             navigator.geolocation.watchPosition(latLong, error, options);
          } else {
             alert("Sorry, browser does not support geolocation!");
          }
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};




</script>