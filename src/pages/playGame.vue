
<template>
   <v-app dark>
       <div class="game">
         <h2>Game {{ title }}</h2>
         <table v-if="games.length > 0">
           <thead>
             <th>Id</th>
             <th>Players</th>
             <th>Created</th>
             <th>Click</th>
           </thead>
         <tbody>
            <tr v-for="item in games">
             <td>{{ item.id }} </td>
             <td>{{ item.numPlayers }}</td>
             <td>{{ item.createdAt }}</td>
             <td>
             <form :action=`join/${item.id}` method = "post">
                 <input type="submit" name="Join">
             </form>
             </td>
            </tr>
         </tbody>
         </table>
       </div>
       <!-- HACK for now -->
       <router-link :to="{ path: '/play'}">BACK</router-link>
    </v-app dark>
</template>


<script>
export default {
  name: 'playGame',
  // note cardInfo tranlsates to card-info in html render.
  data: function() {
     return {
        title: "",
        games: []
     }
  },
  mounted() {
      console.log('Play Game ready.')
  },

  created: function() {
     this.$http.get(`http://localhost:3000/play/${this.$route.params.game}`)
     .then(response => {
        console.log(response.data)
        this.title = response.data.title
        this.games = response.data.games
     })
     .catch(e => {
        throw e;
     })
  }
}
</script>
