// main app decleration

<template>
 <v-app dark>
   <section>
     <v-parallax src="/images/landing.png" height="500">
       <v-layout column align-center justify-center>
         <h1 class="white--text orbit-font">{{ title }}</h1>
         <h4 class="white--text orbit-font">Boardgames Reimagined</h4>
         <a href="/auth/facebook/">
           <img src="images/fb.png"/>
         </a>
       </v-layout>
     </v-parallax>
   </section>
   <section>
     <v-container grid-list-md text-xs-center>
       <v-layout column wrap align-center>
         <v-flex xs12>
           <v-container grid-list-xl>
             <v-layout row wrap align-center>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-xs-center amber--text">Play!</div>
                   </v-card-title>
                   <v-card-text>
                     Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                     Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                     Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                   </v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-xs-center amber--text">Create!</div>
                   </v-card-title>
                   <v-card-text>
                     Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                     Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                     Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                   </v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-xs-center amber--text">Compete!</div>
                   </v-card-title>
                   <v-card-text>
                     Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                     Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                     Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                   </v-card-text>
                 </v-card>
               </v-flex>
             </v-layout>
           </v-container>
         </v-flex>

       </v-layout>
     </v-container>
   </section>
 </v-app>
 </template>

 <script>

 export default {
   name: 'App',
   data: function(){
     return {
       title: "NodeBoard"
     };
   }
 }
</script>

<style>
   .orbit-font{
   font-family: 'Orbitron';
   }
</style>
