<template>
  <div class="user-edit">
    <form v-on:submit.prevent="updateInfo()">

      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        <label>First Name:</label>
        <input type="text" v-model="user.first_name">
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" v-model="user.last_name">
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" v-model="user.phone_number">
      </div>
      <div>
        <label>Email:</label>
        <input type="text" v-model="user.email">
      </div>
      <input type="submit" value="Update Info">

    </form>
  </div>
  
</template>

<style></style>

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
          console.log(response)
          this.$router.push("/users/" + response.data.user_id)//here we are NOT getting the 'response' fron the sessions controller...but from the update action, of the user's controller.IMPORTANT TO NOTE THAT THE 'DATA' IS FROM THE PARTIAL FILE OF THE CONTROLLER BEING CALLED UPON..IN THIS CASE THE USERS CONTROLLER
        }).catch(error => {
          this.errors = error.response.data.errors;
        });

    }
  }
};
</script>