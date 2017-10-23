<template>
 <v-app>
   <section>
    stuff
   </section>
 </v-app>
</template>

<script>

//import io from '../lib/socket'

io.connect('/risk')

export default {
   name: 'Proto'
}

</script>

<style>
   .orbit-font{
   font-family: 'Orbitron';
   }
</style>
