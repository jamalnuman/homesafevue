<template>

  <div class="user-show">
    <h2>My Personal Info:</h2>
    <div>
      <h4>{{user.first_name}}</h4>
      <h4>{{user.last_name}}</h4>
      <h4>{{user.h4hone_number}}</h4>
      <h4>{{user.email}}</h4>  
    </div>
    <button v-on:click="editInfo()">Edit Info</button>
    <button v-on:click="createJourney()">Create Journey</button>

    <h2>My Journeys:</h2>
    <div>
      <div 
        v-for="userJourney in user.user_journeys" 
        v-bind:class="{'green': userJourney.completed }"
        @click="completeUserJourney(userJourney)"
        >
        <h4>Date: {{ userJourney.journey.created_at }}</h4>
        <h4>Starting Location: {{ userJourney.journey.starting_location.address }}</h4>
        <h4>Ending Location: {{ userJourney.ending_location.address }}</h4>
        <p>-------------------------------</p>
      </div>
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
        email: "",
      }
    }
  },
  created: function(){
    axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        this.user = response.data
      });
  },

  methods:{
    editInfo: function(){
      this.$router.push("/users/" + this.$route.params.id + "/edit");
    },
    createJourney: function(){
      this.$router.push("/journeys/" + this.$route.params.id)
    },
    completeUserJourney: function(inputUserJourney) {
      axios
        .patch("/api/user_journeys/" + inputUserJourney.id, {completed: true})
        .then(response => {
          inputUserJourney.completed = true;
        });
    }
  }
}
</script>