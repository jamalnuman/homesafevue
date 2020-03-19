<template>
  <div class="journey-show">

    <h3>You are going to {{journey.starting_location.name}}</h3>
    <h3>The address you are going to is {{journey.starting_location.address}}</h3>

    <h3 >These are the people that will join you:</h3>
    <ul>
      <li v-for="user in journey.users">{{user.first_name + " " + user.last_name}}</li>
    </ul> 

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

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
      .get('/api/journeys/' + this.$route.params.id)//calling the specific journey number
      .then(response => {
        //console.log(response.data.user_journey)
        this.journey = response.data;
        //console.log(this.journey);
        this.loggedInUser = this.journey.users[0].id;//the current_user is the first user[0] in journey.users[0]..this will be used below, when being redirected to the specific user's journey show page
      });

    axios
      .get("/api/users")
      .then(response => {
        const users = response.data; //the users hash is being filled with response.data 
        let map = {}
        for (const user of users) {
          map[user.id] = user //making a hash of user id equaling the user..this step is neccessary cause of Vue.
        }
        this.usersMap = map; //once the hash is complete, the data is placed in userMap.
      });
  },

  methods: {
    deleteUser: function() {
      const removeId = this.userId //meaning the user choosed from the dropdown menu..the userid of the choosen user is stored in the userId model 
      const remainingUsers = this.journey.users.filter(function (user) {
        return user.id != removeId; //filter will return a new hash/array of those elements that passed the logic, similar to the select method in Ruby. 
      })
      this.journey.users = remainingUsers; //then we are reassigning the results from the filter to this.journey.users
    },

    addUser: function() {
      const user = this.usersMap[this.userId];//remember the usersMap is a hash
      this.journey.users.push(user) 
    },

    createMap: function() {
      const params = {
        user_ids: this.journey.users.map(user => { //map returns a new array..in this case, a new array of userids
          return user.id;
        })
      }
      //console.log(params);
      axios
        .post(`/api/journeys/${this.$route.params.id}/add_users`, params)//this will hit the route in the backend and add the list of users to the Journey
        .then(response => {
          this.$router.push(`/journeys/${this.$route.params.id}/userjourney/${this.loggedInUser}`);

          // this.$router.push("/userjourney/" + this.loggedInUser)//being redirected to the specific userjourney page.
        });
      }    
  }
}
</script>