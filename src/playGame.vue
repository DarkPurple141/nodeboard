
</template>
    <div class="game">
      <h2>Game {{ $route.params.game }}</h2>
    </div>
</template>


<script>
export default {
  name: 'playGame',
  template: "<play-game></play-game>",
  // note cardInfo tranlsates to card-info in html render.
  mounted() {
      console.log('Component ready.')
  }
}
</script>
