
<template>
<v-app dark>

  <!--nav-->
   <vNavbar></vNavbar>
   <section>
      <v-container grid-list-md>
      <v-layout row wrap>
         <v-flex xs12>
         <!--gameTable-->
         <gameTable v-on:join="joinGame" :table="table"></gameTable>
         </v-flex>
         <v-flex text-xs-center xs6>
           <button @click="createGame()">Create Game</button>
         </v-flex>
          <v-flex text-xs-center xs6>
             <router-link :to="{ path: '/play'}">BACK</router-link>
          </v-flex>
      </v-layout>
   </v-container>
  </section>

</v-app>
</template>

<script>

import vNavbar from '../components/navbar'
import gameTable from '../components/gameTable'
import HTTP from '../http-config'

export default {
  name: 'playGame',
  // note cardInfo tranlsates to card-info in html render.
  data: function() {
     return {
        table: {
           title: "",
           games: [],
           headers: [
             { text: 'Name', value: 'name'},
             { text: 'Host', value: 'host'},
             { text: 'Players', value: 'numPlayers' },
             { text: 'Created', value: 'createdAt' },
             { text: 'Join', value: 'id' }
          ]
       }
    }
  },
  mounted() {
      console.log('Play Game ready.')
  },

  components : {
      vNavbar,
      gameTable
  },

  created: function() {
     this.getGames()
  },

  methods: {
     // FIXME Create a modal for game creation
     createGame: function() {
        HTTP.post(`play/${this.$route.params.game}/create`, { gameName: "name" })
        .then(successObj => {
           if (successObj.data.success == false) {
             throw "Create Failed"
           }
        })
        .then(() => {
           this.getGames()
        }).catch(e => {
           throw e;
        })
     },

     getGames: function() {
        HTTP.get(`play/${this.$route.params.game}`)
       .then(response => {
          console.log(response.data)
          this.table.title = response.data.title
          this.table.games = response.data.games
       })
       .catch(e => {
          throw e;
       })
     },

     joinGame: function (id) {
         HTTP.post(`play/${this.$route.params.game}/join/${id}`)
         .then(() => {
            this.getGames()
         })
         .catch(e => {
           console.error(e)
         })
     }
  }
}
</script>
