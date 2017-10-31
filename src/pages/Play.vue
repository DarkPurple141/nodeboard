
<template>
 <v-app dark>
   <vNavbar></vNavbar>
   <section>
      <v-container grid-list-md text-xs-center>
       <v-layout column wrap align-center>
         <v-flex xs12>
           <v-container grid-list-xl>
             <v-layout row wrap align-center>
               <game-card v-for="item in games" :cardData="item" :key="item._id">
               </game-card>
             </v-layout>
           </v-container>
         </v-flex>
       </v-layout>
     </v-container>
   </section>
 </v-app>
 </template>

 <script>
 import gameCard from '../components/gameCard'
 import vNavbar from '../components/navbar'
 import HTTP from '../http-config'

 export default {
   name: 'Play',
   data: function(){
     return {
       title: "Play",
       games: [],
     };
   },
   components: {
    vNavbar,
    gameCard
  },
  created: function() {
   HTTP.get(`play`)
   .then(response => {
     this.games = response.data.games.map(item => {
        let game = {
           id : item._id,
           headline: item.name,
           imgSrc: item.image,
           stub: item.stub,
           description: item.description,
           url: `/play/${item.urlkey}`
        }
        return game
     })
   })
   .catch(e => {
      throw e;
   })
  }
 }
</script>

<style>
   .orbit-font {
      font-family: 'Orbitron';
   }
</style>
