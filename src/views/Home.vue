<template>
  <div class="home">
    <h1>{{ "Welcome to HomeSafe" }}</h1>
    <h2>{{"Would you like to Signup or Login?"}}</h2>
    <router-link to="/signup"><h3>Signup</h3></router-link>
    <router-link to="/login"><h3>Login</h3></router-link>
  </div>
</template>

<style>
</style>

<script>
  export default{
    data: function() {
      return {};
    },
  created: function() {},
  methods:{}
};
</script>

