import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import * as VueGoogleMaps from "vue2-google-maps";



Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA6OCFMUtMU0OCDQ4jL9JkhUOkewxAToWY",
    libraries: "directions"
    }
  });

axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/"

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}


Vue.config.productionTip = false

new Vue({ //this is the instance that controls the entire application..this is connected to App.vue with the id of 'app' below. all other views are connected to App.vue via the <router-link>
  router,
  render: h => h(App)
}).$mount('#app')





