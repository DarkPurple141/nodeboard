<template>
 <v-app>
   <!--nav-->
   <vNavbar></vNavbar>
   <section>
      <v-container grid-list-md text-xs-center>
         <v-layout row wrap>
            <v-flex xs10>
               <RiskBoard></RiskBoard>
            </v-flex>
            <v-flex xs2>
               <Chat></Chat>
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

// just for debugging.
$(document).on('click', '.territory', (event) => {
   alert((event.target.id).split('-').map(item => {
      return item.charAt(0).toUpperCase() + item.substring(1)
   }).join(' '))
   console.log(event.target)
})

export default {

   data: function() {
      return {
         userName: "Jeff"
      }
   },

   ready() {
      this.socket = io.connect('/risk')
      this.socket.on('message', (msg) => {
         socket.emit('message', msg)
         console.log(msg)
      })
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
