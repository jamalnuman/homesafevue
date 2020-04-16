<template>
  <div class="login">
    <section class="welcome_area gradient-background-overlay" style="background-image: url('https://www.povertylaw.org/wp-content/uploads/2019/12/keys-900x558.jpg');" id="home">
        <div class="container h-100">
        </div>
      </section>
    <div class="container">
      <h3>With security and technology improvments, HomeSafe is dedicated to get you to your destination safely</h3>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <input id="loginButton" type="submit" class="btn btn-outline-primary btn-lg btn-block" value="Submit">
      </form>
    </div>
  </div>
</template>

<style scoped>
  #loginButton {
    margin-bottom: 10px;
  }
  h3, h5 {
    text-align: center;
  }
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      let params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          //console.log(response)
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;

          //this.$parent.userid = response.data.user_id;
            
          localStorage.setItem("jwt", response.data.jwt);
          //console.log(response.data.jwt)
          this.$router.push("/users/" + response.data.user_id);//this is cause sessions returns a key of user_id..refer to the controller's session on the backend


        })
        .catch(error => {
          //console.log(error)
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
          });
        }
      }
    };
</script>

