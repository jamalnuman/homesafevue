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

    <h3 >These are the people that will join you:</h3>
    <ul>
      <li v-for="user in journey.users">{{user.first_name + " " + user.last_name}}</li>
    </ul>
    

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
        <option v-for="user in usersMap" :value="user.id">
          {{ user.first_name + " " + user.last_name }}
          
        </option>
      </select>
    <div>
      <button @click="addUser()">Add User</button>
      <button @click="deleteUser()">Delete User</button>
    </div>

    <div>
      <button @click="createMap()">Go!</button>
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
      usersMap: {},
      userId: "",
      loggedInUser: "",
      errors: [],
      journey: {
        starting_location: {},
        users: []
      }
    }
  },

  mounted: function() {
    axios
      .get('/api/journeys/' + this.$route.params.id)
      .then(response => {
        //console.log(response.data.user_journey)
        this.journey = response.data;
        console.log(this.journey);
        this.loggedInUser = this.journey.users[0].id;
      });

    axios
      .get("/api/users")
      .then(response => {
        
        const users = response.data;
        let map = {}
        for (const user of users) {
          map[user.id] = user
        }
        this.usersMap = map;
      });

  },

  methods: {
    deleteUser: function() {
      const removeId = this.userId
      const remainingUsers = this.journey.users.filter(function (user) {
        return user.id != removeId;
      })
      this.journey.users = remainingUsers;
    },
    addUser: function() {
      const user = this.usersMap[this.userId];
      this.journey.users.push(user)
      // var userJourneyParams = {
      //   user_id: this.userId
      // };

    },

    createMap: function() {
      // add our users
      const params = {
        user_ids: this.journey.users.map(user => {
          return user.id;
        })
      }
      console.log(params);
      axios
        .post(`/api/journeys/${this.$route.params.id}/add_users`, params)
        .then(response => {
          this.$router.push("/userjourney/" + this.loggedInUser)
    
        });
      }
      
  }
}
</script>