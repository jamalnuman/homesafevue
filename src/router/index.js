import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import UserShow from "../views/UserShow.vue"
import UserEdit from "../views/UserEdit.vue"
import JourneyShow from "../views/JourneyShow.vue"




Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  // { path: "/about", name: "about", component: About },
  { path: "/signup", name: "signup", component: Signup },  
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/users/:id", name: "user-show", component: UserShow },
  { path: "/users/:id/edit", name: "user-edit", component: UserEdit },
  { path: "/journeys/:id", name: "journey-show", component: JourneyShow }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
