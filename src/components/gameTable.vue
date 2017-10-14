<template>
<v-card>
 <v-card-title>
   {{ table.title }}
 </v-card-title>
   <v-data-table
      v-bind:headers="table.headers"
      v-bind:items="table.games"
      hide-actions
   >
   <template slot="items" scope="props">
      <td class="text-xs-right">{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.host }}</td>
      <td class="text-xs-right">{{ props.item.numPlayers }}</td>
      <td class="text-xs-right">{{ props.item.createdAt }}</td>
      <td class="text-xs-right">True</td>
   </template>
 </v-data-table>
</v-card>
</template>

<script>
export default {
  name: 'gameTable',
  template: "<game-table></game-table>",
  // note cardInfo tranlsates to card-info in html render.
  props: ['table'],
  mounted() {
      console.log('gameTable component loaded')
  }
}
</script>
