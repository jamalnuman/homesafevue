<template>
  <div class="user-show">
    <section class="welcome_area gradient-background-overlay" style="background-image: url('https://georgianewsdaily.com/wp-content/uploads/2018/04/2781692552_f380b09e6f_z.jpg');" id="home">
      <div class="container h-100">
      </div>
    </section>
    <div id="info" class="col-sm-4 mb-2">
      <div class="card">
        <div class="card-body text-info">
        <h5 class="card-title">First Name: {{user.first_name}}</h5>
        <h5 class="card-title">Last Name: {{user.last_name}}</h5>
        <h5 class="card-title">Phone Number: {{user.phone_number}}</h5>
        <h5 class="card-title">Email: {{user.email}}</h5>  
        </div>
      <button class="btn btn-outline-danger" v-on:click="editInfo()">Edit Info</button>
      </div>
    </div>
    <br>
    <div><h2>My Previous Journeys</h2></div>
    <br>
    <div class="row">
      <div class="col-sm-4 mb-2" 
       v-for="userJourney in user.user_journeys"
       v-bind:class="{'green': userJourney.completed }"
       >
        <div class="card">
          <div class="card-body text-info">
            <h5 class="card-title">User Journey ID: {{userJourney.journey.id}}</h5>
            <h5 class="card-title">Date Created: {{ userJourney.journey.created_at }}</h5>
            <h5 class="card-title">Starting Location: {{ userJourney.journey.starting_location.address }}</h5>
            <h5 class="card-title">Ending Location: {{ userJourney.ending_location.address }}</h5>
            <button class="btn btn-outline-danger" @click="deleteUserJourney(userJourney)">Delete User Journey!</button>
          </div>
        </div>
      </div>
    </div>

    <br>
    <br>

    <h5 id="list">If the drop-down list does NOT include your starting and/or ending location, please create them.</h5>
    <div class="container selectDiv1">
      <form @submit.prevent="createLocation()">
        <div class="form-group">
          <label for="formGroupExampleInput">Name</label>
          <input v-model="locationName" type="text" class="form-control" id="formGroupExampleInput">
          <!-- <input type="text" v-model="locationName"> -->
          <!-- Address: <input type="text" v-model="locationAddress"> -->
          <label for="formGroupExampleInput2">Address</label>
          <input v-model="locationAddress" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Example: 4845 N Kimball Ave Chicago Il">
          <label for="formGroupExampleInput3">Phone Number</label>
          <input v-model="locationPhoneNumber" type="text" class="form-control" id="formGroupExampleInput3" placeholder="If possible: 555 555 5555">
          <!-- Phone Number: <input type="text" v-model="locationPhoneNumber"> -->
        </div>
        <div>
          <input class="btn btn-outline-success btn-lg btn-block" type="submit" value="Enter">
        </div>
      </form>
    </div>
      <br>
      <br>
   
   

    <h5 id="h5">Select your starting location:</h5>
    <div class=" container selectDiv2">
      <!-- <label id="startingLabel">Starting Locations</label> -->
      <div align="center"> 
        <select v-model="startingLocationId">
          <option v-for="location in locations" :value="location.id">
            {{location.name}}
          </option>
        </select>
      </div>
    <div>
      <button id="lastButton" class="btn btn-outline-success btn-lg btn-block" v-on:click="createJourney()">Create Journey</button>
    </div>
    </div>

    <br>
  </div>
  
</template>

<style scoped>
/*#startingLabel {
  padding-left: 470px;
}*/
select {
  width: 350px;
  margin: 10px;
    }
#lastButton{
  margin-top: 5px;
}
.selectDiv1{
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
.selectDiv2{
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
h5, h2{
  color: grey;
}
.green {
  color: green;
}
#info{
  margin: auto;
}
h2{
  text-align: center;
}
#h5 {
  text-align: center;
}
#list {
  text-align: center;
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


    // completeUserJourney: function(inputUserJourney) {
    //   axios
    //     // console.log(inputUserJourney)
    //     .patch("/api/user_journeys/" + inputUserJourney.id, {completed: true})
    //     .then(response => {
    //       inputUserJourney.completed = true;
    //     });
    // },

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