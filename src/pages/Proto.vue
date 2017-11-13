<template>
 <v-app>
   <!--nav-->
   <vNavbar></vNavbar>
   <section>
      <v-container grid-list-md text-xs-center>
         <v-layout row wrap>
            <v-flex xs10>
               <RiskBoard :gameState="game"></RiskBoard>
            </v-flex>
            <v-flex xs2>
               <Chat v-on:message="chatMessage" :messages="messages"></Chat>
            </v-flex>
        </v-layout>
      </v-container>
   </section>

 </v-app>
</template>

<script>

import vNavbar from '../components/navbar'
import Chat from '../components/chat/main'
import RiskBoard from '../components/boards/risk/main'

export default {

   data: function() {
      return {
         userName: this.$root.$data.user.name || "Jeff",
         url: this.$route.query.id || "PROTO",
         messages: [],
         game: null,
         socket: null
      }
   },

   mounted() {
      console.log("getting connection")

      let socket = io.connect('/risk')

      socket.on('message', msg => {
         // Incoming message added to current data.
         this.messages.push(msg)
      })

      socket.on('connectionReport', () => {
         console.log("Sending server info..")
         socket.emit('connectionReport',
            {
               room: this.url,
               user: this.userName
            }
         )
      })

      socket.on('update', () => {
         console.log("Update front..")
      })

      this.socket = socket

   },
   methods: {
      // event handler for message chat
      chatMessage: function(msg) {
         let chatMessage = {
            from: this.userName,
            msg: msg
         }
         this.messages.push(chatMessage)
         this.socket.emit('message', chatMessage)
      }
   },
   components: { vNavbar, Chat, RiskBoard },
   name: 'Prototype'
}

</script>

<style>

   .orbit-font {
      font-family: 'Orbitron';
   }

</style>
