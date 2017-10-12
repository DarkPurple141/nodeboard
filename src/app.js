/*
This is the main inpoint for the app
*/
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './routes'

// apparently required for rendering as well as including the script.
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(VueRouter)

const router = new VueRouter({
   routes: routes
})

// create a root instance
new Vue({
  router,
  template : `
  <v-app>
     <router-view></router-view>
  </v-app>`
}).$mount('#app');
