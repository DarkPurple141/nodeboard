<template>
<g class="territory">
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

</style>
