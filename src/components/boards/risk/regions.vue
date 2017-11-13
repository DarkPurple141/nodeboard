<template>
<g>
   <path v-for="path in region.paths" v-bind:d="path"></path>
</g>
</template>

<script type="text/javascript">
   export default {
      name: "Region",
      props: ['region']
   }
</script>

<style>
.territory {
  stroke-width: 1px;
  stroke: #000000;
}

.p1 {
   fill: #FF99C8;
}

.p2 {
   fill: #FCF6BD;
}

.p3 {
   fill: #D0F4DE;
}

.p4 {
   fill: #A9DEF9;
}

.p5 {
   fill: #E4C1F9;
}

</style>
