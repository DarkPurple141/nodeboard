<template>
 <v-app>
   <!--nav-->
   <vNavbar></vNavbar>
   <section>
      <object data="/images/riskMap.svg" type="image/svg+xml"
         id="alphasvg" width="100%" height="100%"></object>
   </section>
 </v-app>
</template>

<script>

import vNavbar from '../components/navbar'
//import io from '../lib/socket'
const server = io.connect('/risk')

export default {
   components: { vNavbar },
   name: 'Proto'
}

</script>

<style>
   .orbit-font{
   font-family: 'Orbitron';
   }
</style>
