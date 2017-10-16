<template>
   <v-flex xs12 md4>
     <v-card class="elevation-0 transparent">
      <v-card-title primary-title class="layout justify-center">
         <div class="headline text-xs-center amber--text">{{ cardData.headline }}</div>
      </v-card-title>
      <v-card-text>
         {{ cardData.stub }}
      </v-card-text>
     </v-card>
   </v-flex>
</template>

<script>
export default {
  name: 'descriptionCard',
  template: "<description-card></description-card>",
  // note cardInfo tranlsates to card-info in html render.
  props: ['cardData'],
  mounted() {
      console.log('Component ready for ' + this.cardData.headline)
  }
}
</script>
