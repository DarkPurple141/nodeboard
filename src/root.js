/*
This is the main inpoint for the app
*/

import Vuetify from 'vuetify'
import login from './login'

Vue.use(Vuetify)
Vue.use(login)

// create a root instance
new Vue({
  el: '#root'
});
