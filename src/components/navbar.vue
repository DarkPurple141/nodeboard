<template>
  <v-toolbar prominent extended class="mb-5 orange-gradient">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title><nodeboard-logo></nodeboard-logo></v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-for="button in buttons">
      <router-link :to="button.link" tag="span">
        <v-btn flat>
          {{button.title}}
        </v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
import HTTP from '../http-config'
import nodeboardLogo from '../components/nodeboardLogo'

export default {
  name: 'v-navbar',
  data: function() {
  	return {
      user: "NOBODY"
    }
  },
  components: {
    nodeboardLogo
  },
  computed: {
    buttons: function(){
      let buts = [];
      // lol buts
      buts.push({title:"Play",link:"/play"});
      buts.push({title:"Create",link:"/create"});
      buts.push({title:this.user,link:"/profile"});
      return buts;
    }
  },
  mounted(){
    HTTP.get(`api/user`)
   .then(response => {
      this.user = response.data.displayName.split(" ")[0];
   })
   .catch(e => {
      throw e;
   })
  }
}
</script>

<style>
  .orange-gradient{
    background: -webkit-linear-gradient(left,
      #fdbb84,
      #fc8d59,
      #ef6548
      )
  }
</style>
