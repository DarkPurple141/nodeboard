<template lang="html">
<svg
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="100%" height="100%" viewBox="10 0 1300 700">

    <g v-for="continent in continents" v-bind:id="continent.id" class="continent">
      <Region v-for="region in continent.territories"
         :id="region.id"
         :class="['territory', getOwner(region.name)]"
         :key="region.id"
         :region="region"
         @click.native="showRegion(region.name)">
      </Region>
    </g>
    </svg>
</template>

<script>
import Region from './svg-region'
import svg from './svg-data'

export default {
   props: ['board'],
   name: "riskRender",
   components: {
      Region
   },
   data: function() {
      return {
         continents: svg
      }
   },
   template: '<risk-board></risk-board>',
   methods : {
      getOwner: function(region) {
         return 'p' + (this.board[region].owner + 1)
      },
      showRegion: function(name) {
         alert(name)
      }
   }
}
</script>

<style lang="css">
text {
   font-family: "Verdana";
   stroke: none;
}

#south-america            { fill: #009999; stroke: #008888; }
#south-america .highlight { fill: #006363; }
#south-america :hover {  fill: #5ccccc; }
#australia            { fill: #9fee00; stroke: #9fee22; }
#australia .highlight { fill: #679b00; }
#australia :hover  { fill: #c9f76f; }
#africa            { fill: #ffaa00; stroke: #ffaa11; }
#africa .highlight { fill: #a66f00; }
#africa :hover  { fill: #ffd073; }
#north-america            { fill: #7109aa; stroke: #7109bb; }
#north-america .highlight { fill: #48036f; }
#north-america :hover  { fill: #ad66d5; }
#asia              { fill: #ff0000; stroke: #ff1111; }
#asia .highlight { fill: #a60000; }
#asia :hover    { fill: #ff7373; }
#europe              { fill: #1240ab; stroke: #1240bc }
#europe .highlight   { fill: #06266f; }
#europe :hover    { fill: #6c8cd5; }
</style>
