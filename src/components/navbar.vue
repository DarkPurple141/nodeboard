<template>
  	<div v-bind:style="navbarContainer">
      <div v-bind:style="brand">
        Nodeboard
      </div>
   </div>
</template>

<script>
export default {
   name: 'v-navbar',
   template: "<v-navbar></v-navbar>",
   data: function() {
   	return {
   		navbarContainer: {
   			width: "100%",
   			height: "5%",
   			position: "fixed",
   			top: "0",
   			left: "0",
   			background: "-webkit-linear-gradient(left,#84fab0,#8fd3f4)",
   			boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)"
   		},
         brand: {
           color: "white",
           fontFamily: "Orbitron",
           fontSize: "1.5em",
           paddingTop: "0.3em",
           paddingLeft: "0.3em"
        }
	    }
   }
}
</script>
