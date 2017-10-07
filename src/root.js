/*
This is the main inpoint for the app
*/

// vue base imports
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import  VueResource from 'vue-resource'

// attach our frameworks
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueResource)

// setup routes
import Home from './Home'
import Dash from './Dashboard'

// ask the server if we are logged in
// and set up the routes accordingly
Vue.http.get('api/authStatus').then(function (res) {

  if (!res.body) {
    // not logged in, you literally only have 1 route
    routes.push({ path: '/', component: Home });
  } else {
    // you are logged in! you now get more options
    // TODO: Add more options lol
    routes.push({ path: '/', component: Dash });
  }


  const router = new VueRouter({
    routes // short for `routes: routes`
  })

  // create a root instance
  const app = new Vue({
    router
  }).$mount('#app')
});
