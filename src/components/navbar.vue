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
      user: "",
      buttons: [
         {
            title: "Play",
            link: "/play"
         },
         {
            title: "Create",
            link: "/create"
         },
         {
            title: this.user,
            link:"/profile"
         }
      ]
    }
  },
  components: {
    nodeboardLogo
  },
  mounted() {
    HTTP.get(`api/user`)
   .then(response => {
      // just get firstName
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
