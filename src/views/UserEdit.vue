<template>
  <div class="user-edit">
    <div class="container h-100">
    <section class="welcome_area gradient-background-overlay" style="background-image: url('https://www.gullands.com/upload/images/image_5491a41f87a78.jpg');" id="home">
        
    </section>
  </div>
    <div class="container">
      <h3>Edit your personal information</h3>


    <form v-on:submit.prevent="updateInfo()">

      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First Name</label>
        <input class="form-control" type="text" v-model="user.first_name">
      </div>
      <div>
        <label>Last Name</label>
        <input class="form-control" type="text" v-model="user.last_name">
      </div>
      <div>
        <label>Phone Number</label>
        <input class="form-control" type="text" v-model="user.phone_number">
      </div>
      <div>
        <label>Email</label>
        <input class="form-control" type="text" v-model="user.email">
      </div>
      <input id="input" class="btn btn-outline-primary btn-lg btn-block" type="submit" value="Update Info">

    </form>
  </div>
</div>
  
</template>


<script>
  var axios = require("axios")

export default  {
  data: function(){
    return{
      user: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
      },
      errors: []
    };
  },
  created: function(){
    axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        this.user = response.data;
        //console.log(response)
      });
  },
  methods: {
    updateInfo: function() {
      var userParams = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        phone_number: this.user.phone_number,
        email: this.user.email
      };

      axios
        .patch("/api/users/" + this.$route.params.id, userParams)
        .then(response => {
          //console.log(response)
          this.$router.push("/users/" + response.data.id)//..response.data.id can also be 'this.$route.params.id'..cause that id is still being used in the web address. here we are NOT getting the 'response' fron the sessions controller...but from the update action, of the user's controller.IMPORTANT TO NOTE THAT THE 'DATA' IS FROM THE PARTIAL FILE OF THE CONTROLLER BEING CALLED UPON..IN THIS CASE THE USERS CONTROLLER
        }).catch(error => {
          this.errors = error.response.data.errors;
        });

    }
  }
};
</script>
<style>
  #input{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  h3{
    color: grey;
    text-align: center;
  }
</style>