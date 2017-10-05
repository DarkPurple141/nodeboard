/*
This is the main inpoint for the app
*/
import Vue from 'vue'
import Vuetify from 'vuetify'
import Home from './Home'

// apparently required for rendering as well as including the script.
Vue.use(Vuetify)

// create a root instance
new Vue({
  el: '#app',
  template: '<Home/>',
  components: { Home }
});
