<template>
  <div class="journey-show">
   <!--  <form v-on:submit.prevent="getLocation()">
      <h2> Your current latitude: {{lat}}</h2>
      <h2> Your current longitude: {{long}}</h2>
      <h2>{{gps_error}}</h2>
      <input type="submit" value="Get Coordinates">
    </form> -->

    <h3>You are going to {{journey.starting_location.name}}</h3>
    <h3>The address you are going to is {{journey.starting_location.address}}</h3>
    

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <!-- <h1>Lets create a Trip!</h1>

    <h3>Please enter a starting point for your trip:</h3> -->
      <!-- Starting Address: <input type="text" v-model="starting_address"> -->
    <!-- <h3>Your starting latitude: {{latitude}}</h3>
    <h3>Your starting longitude: {{longitude}}</h3> -->

    <!-- <h3>Please enter an ending location for your trip:</h3>
      Ending Address: <input type="text" v-model="ending_address"> -->

    <h3>Select from the following users to join you:</h3>
      <select v-model="userId">
        <option v-for="user in users" :value="user.id">
          {{ user.first_name + " " + user.last_name }}
        </option>
      </select>
    <div>
      <button v-on:submit="addUser()">Add User</button>
    </div>

    <div>
      <!-- <button @click="createJourney()">Create Journey!</button> -->
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
      users: [],
      userId: "",
      latitude:"",
      longitude:"",
      errors: [],
      gps_error: "",
      journey: {
        starting_location: {}
      }
    }
  },

  created: function() {

    axios
      .get('/api/journeys/' + this.$route.params.id)
      .then(response => {
        //console.log(response.data)
        this.journey = response.data;
      })

    axios
      .get("/api/users")
      .then(response => {
        console.log(response)
        this.users = response.data;
      });

    // window.setInterval(() => {
    // this.getLocation();
    // }, 5000)
  
    // if (navigator.geolocation) {
    //   var options = {
    //                  enableHighAccuracy: false,
    //                  timeout: 20000,
    //                  maximumAge: 0
    //                  };
    //   console.log('this worked!')
    //   this.watch_id = navigator.geolocation.watchPosition(this.showGps, this.showError);
    //   console.log(this.watch_id)
    // } else {
    //   this.gps_error = "Geolocation is not supported by this browser.";
    // }
  },

  methods:{

    


  
  }
}
</script>