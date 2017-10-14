// main app decleration

<template>
 <v-app dark>
   <section>
     <v-parallax src="/images/landing.png" height="500">
       <v-layout column align-center justify-center>
         <h1 class="white--text orbit-font">{{ title }}</h1>
         <h4 class="white--text orbit-font">Boardgames Reimagined</h4>
         <a href="/auth/facebook/">
           <img src="/images/fb.png"/>
         </a>
       </v-layout>
       <router-link to="/about">About</router-link>
     </v-parallax>
   </section>
   <section>
     <v-container grid-list-md text-xs-center>
       <v-layout column wrap align-center>
         <v-flex xs12>
           <v-container grid-list-xl>
             <v-layout row wrap align-center>
               <description-card v-for="item in cards" :cardData="item" :key="item.headline">
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
   name: 'Home',
   data: function(){
     return {
       title: "NodeBoard",
       subtitle: "Boardgames Reimagined",
       cards : [
          {
            headline: "Play!",
            stub: "Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.\
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\
            Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti."
          },
          {
            headline: "Create!",
            stub: "Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.\
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\
            Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti."
          },
          {
            headline: "Compete!",
            stub: "Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.\
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\
            Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti."
          }
       ]
     };
   },
   components: {
    descriptionCard
   }
 }
</script>

<style>
   .orbit-font{
   font-family: 'Orbitron';
   }
</style>
