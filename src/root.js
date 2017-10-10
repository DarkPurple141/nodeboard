/*
This is the main inpoint for the app
*/
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//import routes from './routes'
import Home from './Home'
import Play from './Play'
import playGame from './playGame'

// apparently required for rendering as well as including the script.
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(VueRouter)

const router = new VueRouter({
   routes: [
      {
         path: '/',
         component : Home,
      },
      {
         path: '/play',
         component : Play,
         children: [
            {
               path: '/:game',
               component: playGame
            }
         ]
      }
   ]
})

// create a root instance
new Vue({
  router,
  template : `
  <v-app>
     <router-view></router-view>
  </v-app>`
}).$mount('#app');
