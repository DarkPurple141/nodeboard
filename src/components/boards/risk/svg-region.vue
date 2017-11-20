<template>
<g>
   <path v-for="path in region.paths"
         v-bind:d="path"
         v-bind:id="'p_'+region.id"></path>
   <text :x=x :y=y fill="black">
      <tspan text-anchor="middle">{{ region.name }}</tspan>
   </text>
   <circle :cx="x" :cy="y" fill="black" r="2"></circle>
</g>
</template>

<script type="text/javascript">
   export default {
      name: "Region",
      props: ['region'],
      data: function() {
         return {
            x: 0,
            y: 0
         }
      },
      mounted: function() {
         // to manage labels
         let p = document.getElementById('p_' + this.region.id)
         var bbox = p.getBBox();
         this.x = Math.floor(bbox.x + bbox.width/2.0)
         this.y = Math.floor(bbox.y + bbox.height/2.0)
         if (this.region.name === "Western Australia") {
            this.y += 20
            this.x -= 20
         }
      }
   }
</script>

<style>
.territory {
  stroke-width: 1px;
  stroke: #000000;
}

</style>
