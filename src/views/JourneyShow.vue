<template>
  <div class="journey-show">
    <section class="welcome_area gradient-background-overlay" style="background-image: url('https://paragon-training.com/images/products/680/20160315180525.jpg');" id="home">
        <div class="container h-100">
        </div>
    </section>
    <div class="container">
      <div id="box1">
        <h3>You're going to {{journey.starting_location.name}}</h3>
        <h3>The address is {{journey.starting_location.address}}</h3>

        <h3 >The following are those who will join you</h3>
        <ul>
          <li v-for="user in journey.users"><h5>{{user.first_name + " " + user.last_name}}</h5></li>
        </ul> 
      </div>

      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
        <h5>Select from the following users to join you</h5>
      <div id="box" align="center"> 
          <select id="option" v-model="userId">
            <option  v-for="user in usersMap" :value="user.id">
              {{ user.first_name + " " + user.last_name }}  
            </option>
          </select>
      
        <div>
          <button id="add" class="btn btn-outline-success btn-lg btn-block" @click="addUser()">Add User</button>
          <button class="btn btn-outline-success btn-lg btn-block" @click="deleteUser()">Delete User</button>
        </div>

        <div>
          <button id="go" class="btn btn-outline-success btn-lg btn-block" @click="createMap()">Go!</button>
        </div>
      </div>
    </div>

  </div>
  
</template>

<style scoped>
  h5 {
    color: grey;
    text-align: center;
  }
  select {
    width: 350px;
    margin: 10px;
  }
  #add {
    margin-top: 5px;
  }
  #go {
    margin-top: 5px;
  }
  ul {
    list-style-type: none;
    text-align: center;
  }
  #box1 {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
  #box{
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    margin-bottom: 15px;
  }
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
        console.log(response.data.user_journey)
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
          //being redirected to the journeys show page that was just created which has a userjourney that is linked to it..the userjourney is linked to the logged in user. 

          // this.$router.push("/userjourney/" + this.loggedInUser)//being redirected to the specific userjourney page.
        });
      }    
  }
}
</script>