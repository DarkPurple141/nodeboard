<template>
 <v-app>
   <!--nav-->
   <vNavbar></vNavbar>
   <section>
      <v-container grid-list-md text-xs-center>
         <v-layout row wrap>
            <v-flex xs10>
               <div class="stats">
                     <div v-for="i in [0, 1, 2, 3, 4]"
                     :class="'players ' + 'p'+(i+1)">
                        Player {{i}}: {{ numTerritories(i) }}</div>
               </div>
               <RiskBoard :board="game.board"></RiskBoard>
            </v-flex>
            <v-flex xs2>
               <Chat :socket="socket" :user="user.name"></Chat>
            </v-flex>
            <!-- Temporary controls for testing -->
            <div class="controls">
               <v-btn @click="startGame"
               v-if="!game.state.running"  color="primary">Start</v-btn>
            </div>
        </v-layout>
      </v-container>
   </section>

 </v-app>
</template>

<script>

import vNavbar from '../components/navbar'
import Chat from '../components/chat/main'
import RiskBoard from '../components/boards/risk/render'
import GameState from '../components/boards/risk/main'

export default {

   data: function() {
      return {
         user: {
            name: this.$root.$data.user.name || "Jeff",
            playerID: -1,
         },
         url: this.$route.query.id || "PROTO",
         game: GameState,
         socket: io.connect('/risk')
      }
   },

   methods: {

      // launch and setup the game
      startGame: function() {
         this.game.state.running = true
         this.socket.emit('start')
      },

      // how many terrs does each player have
      numTerritories: function(player) {
         let risk = this
         return (Object.keys(risk.game.board)).reduce((total, item) => {
            return total + risk.game.board[item].owner === player ? 1 : 0
         }, 0)
      }
   },

   mounted() {
      let risk = this
      risk.socket.on('connectionReport', () => {
         console.log("Sending server info..")
         risk.socket.emit('connectionReport',
            {
               room: risk.url,
               user: risk.user.name
            }
         )
      })

      risk.socket.on('start', initData => {
         console.log("Getting game state for setup...")
         risk.game.state.running = true
         for (let key in initData.board) {
            let loadedRegion = initData.board[key]
            risk.game.board[key].owner = loadedRegion.owner
            risk.game.board[key].units = loadedRegion.units
         }
      })

      risk.socket.on('update', data => {
         console.log(data)
         console.log("Update front..")
      })

   },
   components: { vNavbar, Chat, RiskBoard },
   name: 'Risk'
}

</script>

<style>
   .orbit-font {
      font-family: 'Orbitron';
   }

   /* Player specific colours */
   .players {
      float: left;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 7%;
      padding-right: 7%;
   }

   .p1 {
      fill: #FF99C8;
      background-color: #FF99C8;
   }

   .p2 {
      fill: #FCF6BD;
      background-color: #FCF6BD;
   }

   .p3 {
      fill: #D0F4DE;
      background-color: #D0F4DE;
   }

   .p4 {
      fill: #A9DEF9;
      background-color: #A9DEF9;
   }

   .p5 {
      fill: #E4C1F9;
      background-color: #E4C1F9;
   }

</style>
