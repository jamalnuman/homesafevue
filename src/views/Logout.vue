<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "axios"; //although an axios call is not being made, axios is still being used below on line 11

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    this.$router.push("/");
  }
};
</script>
