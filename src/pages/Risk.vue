<template>
 <v-app>
   <!--nav-->
   <vNavbar></vNavbar>
   <section>
      <v-container grid-list-md text-xs-center>
         <v-layout row wrap>
            <v-flex xs10 style="border:1px solid black;">
               <div style="position: relative;">
                  <!-- Modal start button -->
                  <div class="start" v-if="!game.state.running">
                     <v-btn large dark @click="startGame"
                       color="primary">Start</v-btn>
                  </div>
               <div :class="disabledControls()">
                  <!-- eventually should be an sub component-->
                     <div class="stats">
                        <div v-for="i in game.state.numPlayers"
                        :class="'players ' + 'p'+(i) + ' ' + boldPlayer(isMyTurn(i-1))"
                        :style="{ width :99/(game.state.numPlayers)+'%' }">
                           Player {{i}}: {{ numTerritories(i - 1) }}
                        </div>
                     </div>
                  <RiskBoard :board="game.board"></RiskBoard>
               </div>
            </div>
            </div>
            </v-flex>
            <v-flex xs2>
               <Chat :socket="socket" :user="user.name"></Chat>
            </v-flex>
            <!-- Temporary controls for testing
                 eventually should be a sub component -->
            <div class="controls" v-if="isMyTurn(user.playerID) && game.state.running">
               <v-btn @click="startGame"
                 color="primary">Start</v-btn>
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
         url: this.$route.params.id,
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
            return total + (risk.game.board[item].owner === player ? 1 : 0);
         }, 0)
      },

      // checks whether controls are active
      isMyTurn : function(player) {
         return this.game.state.turn === player
      },

      boldPlayer: function(bool) {
         return bool ? "active" : ""
      },

      disabledControls: function() {
         return !this.game.state.running ? "disabled" : ''
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

      risk.socket.on('user', userID => {
         console.log("USER #" + userID)
         risk.user.playerID = userID
      })

      risk.socket.on('start', initData => {
         console.log("Getting game state for setup...")
         risk.game.state.running = true
         risk.game.state.turn = initData.turn
         risk.game.state.numPlayers = initData.numPlayers
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

   .disabled {
     pointer-events: none;
     opacity: 0.4;
  }

   .start {
      position: absolute;
      top: 45%;
      left: 45%;
   }

   /* Player specific colours */
   .players {
      float: left;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 7%;
      padding-right: 7%;
   }

   .players.active {
      font-weight: bold;
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
