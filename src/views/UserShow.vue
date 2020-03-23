<template>

  <div class="user-show">
    <h2>My Personal Info:</h2>
    <div>
      <h4>{{user.first_name}}</h4>
      <h4>{{user.last_name}}</h4>
      <h4>{{user.phone_number}}</h4>
      <h4>{{user.email}}</h4>  
    </div>
    <button v-on:click="editInfo()">Edit Info</button>
    

    <h2>My Journeys:</h2>
    <div>
      <div 
        v-for="userJourney in user.user_journeys" 
        v-bind:class="{'green': userJourney.completed }"
        @click="completeUserJourney(userJourney)"
        >
        <h4>User Journey ID: {{userJourney.journey.id}}</h4>
        <h4>Date: {{ userJourney.journey.created_at }}</h4>
        <h4>Starting Location: {{ userJourney.journey.starting_location.address }}</h4>
        <h4>Ending Location: {{ userJourney.ending_location.address }}</h4>
        <button @click="deleteUserJourney(userJourney)">Delete User Journey!</button>
        <p>-------------------------------</p>

      </div>
    </div>

    <h3>If the drop-down list, does not include your starting and/or ending location, please create them.</h3>
    <form @submit.prevent="createLocation()">
      Name<input type="text" v-model="locationName">
      Address<input type="text" v-model="locationAddress">
      Phone Number<input type="text" v-model="locationPhoneNumber">
      <input type="submit" value="Enter">
    </form>

    <h3>Select your starting location:</h3>
    <div>
      <label>Starting Locations: </label>
      <select v-model="startingLocationId">
        <option v-for="location in locations" :value="location.id">
          {{location.name}}
        </option>
      </select>
    </div>

    <div>
      <button v-on:click="createJourney()">Create Journey</button>
    </div>

  </div>
  
</template>

<style>
.green {
  color: green;
}
</style>

<script>
  var axios = require ('axios')


export default{
  data: function(){
    return{
      user: {
        user_id: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
      },
      journeyID: "",
      startingLocationId: "",
      locationName: "",
      locationAddress: "",
      locationPhoneNumber: "",
      locations: []
    };
  },
  created: function() {
    //console.log(this.$route.params.id)
    axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        //console.log(response.data)
        this.user = response.data;
      });

    axios
      .get('/api/locations')
      .then(response => {
        //console.log(response)
        this.locations = response.data
      });
  },

  methods:{
    editInfo: function() {
      this.$router.push("/users/" + this.$route.params.id + "/edit");
    },

    createLocation: function() {
      var locationParams = {
        name: this.locationName,
        address: this.locationAddress,
        phone_number: this.locationPhoneNumber
      };

      axios
        .post('/api/locations', locationParams)
        .then(response => {
          //console.log(response)
          this.locations.push(response.data);
        }).catch(error => {
          console.log(error);
        });
    },


    createJourney: function() {
      var journeyParams = {
        starting_location_id: this.startingLocationId
      };

      axios
        .post('/api/journeys', journeyParams)
        .then(response => {
          //console.log(response)
          this.$router.push("/journeys/" + response.data.id);
        });
      
    },


    completeUserJourney: function(inputUserJourney) {
      axios
        // console.log(inputUserJourney)
        .patch("/api/user_journeys/" + inputUserJourney.id, {completed: true})
        .then(response => {
          inputUserJourney.completed = true;
        });
    },

    deleteUserJourney: function(input){
      //console.log(input)
      axios
        .delete('/api/user_journeys/' + input.id)
        .then(response => {
          var index = this.user.user_journeys.indexOf(input);
          this.user.user_journeys.splice(index, 1);
        });
    }
  }
}
</script>