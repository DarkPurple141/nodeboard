// main app decleration

<template>
 <v-app dark>
   <section>
      <v-container grid-list-md text-xs-center>
       <v-layout column wrap align-center>
         <v-flex xs12>
           <v-container grid-list-xl>
             <v-layout row wrap align-center>
               <description-card v-for="item in games" :cardData="item" :key="item._id">
               </description-card>
             </v-layout>
           </v-container>
         </v-flex>

       </v-layout>
     </v-container>
   </section>
 </v-app>
 </template>

 <script>
 import descriptionCard from '../components/descriptionCard'

 export default {
   name: 'Play',
   data: function(){
     return {
       title: "Play",
       games: [],
     };
   },
   components: {
    descriptionCard
  },
  created: function() {
   this.$http.get(`http://localhost:3000/play/`)
   .then(response => {
     this.games = response.data.games.map(item => {
        let game = {
           id : item._id,
           headline: item.name,
           stub: item.description.substring(0, 80) + "...",
           url: item.urlkey
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
