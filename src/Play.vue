// main app decleration

<template>
 <v-app dark>
   <section>
      <h2>Games</h2>
      <ul class="gameList">
         <li v-for="item in games">{{ item }}</li>
      </ul>
   </section>
 </v-app>
 </template>

 <script>
 import descriptionCard from './components/descriptionCard'

 export default {
   name: 'Play',
   data: function(){
     return {
       title: "Play",
       games: []
     };
   },
   components: {
    descriptionCard
  },
  created: function() {
     this.games = []
  }
 }
</script>

<style>
   .orbit-font {
      font-family: 'Orbitron';
   }
</style>
