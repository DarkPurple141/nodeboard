<template>
  <v-flex xs12 md4>
    <v-card class="elevation-1">
      <!-- IMG -->
      <v-card-media :src="cardData.imgSrc" height="200px"></v-card-media>

      <!-- TITLE -->
      <div class="mt-3">
        <div class="headline">{{cardData.headline}}</div>
        <span class="grey--text">{{cardData.stub}}</span>
      </div>

      <!-- BUTTONS -->
      <v-layout row wrap>
        <v-flex xs6>
           <router-link :to="cardData.url" tag="div">
             <v-btn outline class="orange">Play</v-btn>
           </router-link>
        </v-flex>
        <v-flex xs6>
          <v-btn outline class="orange">Info</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'gameCard',
  // note cardInfo tranlsates to card-info in html render.
  props: ['cardData'],
  mounted() {
      console.log('Component ready for ' + this.cardData.headline)
  }
}
</script>
