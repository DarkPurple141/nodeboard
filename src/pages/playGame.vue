
<template>
<v-app dark>

  <!--nav-->
   <nodeboardNav></nodeboardNav>
   <section>
      <v-container grid-list-md>
      <v-layout row wrap>
         <v-flex xs12>
         <!--gameTable-->
         <gameTable :table="table"></gameTable>
         </v-flex>
         <v-flex text-xs-center xs6>
           <button @click="createGame()">Create Game</button>
         </v-flex>
          <v-flex text-xs-center xs6>
             <router-link :to="{ path: '/'}">BACK</router-link>
          </v-flex>
      </v-layout>
   </v-container>
  </section>

</v-app>
</template>

<script>

import nodeboardNav from '../components/navbar'
import gameTable from '../components/gameTable'
import HTTP from '../http-config'

export default {
  name: 'playGame',
  // note cardInfo tranlsates to card-info in html render.
  data: function() {
     return {
        table: {
           title: "",
           games: [{
              id : 1,
              host: "test person",
              numPlayers: "2",
              createdAt: Date(),
              value: false
           }],
           headers: [
             {
               text: 'ID',
               sortable: false,
               value: 'id'
             },
             { text: 'host', value: 'host'},
             { text: 'numPlayers', value: 'players' },
             { text: 'Created', value: 'createdAt' },
             { text: 'Join', value: 'join' },
          ]
       },
       user: "anon"
     }
  },
  mounted() {
      console.log('Play Game ready.')
  },

  components : {
      nodeboardNav,
      gameTable
  },

  created: function() {
     this.getGames()
  },

  methods: {
     createGame: function() {
        HTTP.post(`play/${this.$route.params.game}/create`)
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
          this.table.games = response.data.games.map(
             item => {
                item.host = "Holding"
                item.join = false
                return item;
             }
          )
          console.log(this.games)
       })
       .catch(e => {
          throw e;
       })
     }
  }
}
</script>
