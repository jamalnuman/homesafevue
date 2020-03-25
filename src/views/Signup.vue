<template>
  <div class="signup">
    
      <section class="welcome_area gradient-background-overlay" style="background-image: url('https://s3.amazonaws.com/financeofamerica-wordpress-content/wp-content/uploads/2016/11/hp-hero2.jpg');" id="home">
          <div class="container h-100">
          </div>
        </section>
        <div class="container">
          <form v-on:submit.prevent="submit()">
            <h3>Signup to help us safely get you home</h3>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>First Name</label> 
              <input type="text" class="form-control" v-model="first_name">
            </div>
            <div class="form-group">
              <label>Last Name</label> 
              <input type="text" class="form-control" v-model="last_name">
            </div>
            <div class="form-group">
              <label>Phone Number</label> 
              <input type="text" class="form-control" v-model="phone_number">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="form-group">
              <label>Password Confirmation</label>
              <input type="password" class="form-control" v-model="passwordConfirmation">
            </div>
            <input id="submitButton" type="submit" class="btn btn-outline-primary btn-lg btn-block" value="Submit">
          </form>
        </div>
  </div>
  
</template>

<style scoped>
  #submitButton {
    margin-bottom: 10px;
  }
  h3 {
    text-align: center;
  }
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
