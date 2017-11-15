<template>
   <v-app dark>
   <div class="container">
     <h1>{{ error.code }}</h1>

     <p><strong>Error</strong></p>
     <p>Oops! It looks like something went wrong!</p>
     <pre>{{ error.description }}</pre>
   </div>
</v-app>
</template>

<script>

export default {
   name: 'errorPage',
   data: function () {
      return {
         error : {
            description: "",
            code: 0
         }
      }
   },
   mounted: function() {
      this.error.code = this.$route.query.code || 500
      this.setDescription()
   },
   methods: {
      setDescription: function() {
         let d = ""
         switch (this.error.code) {
            case 404:
               d = "Page not found :("
               break;
            default:
               d = "Internal Server Error"
         }
         this.error.description = d
      }
   }

}
</script>

<style media="screen">
  .container {
    margin: 10px auto;
    max-width: 600px;
    text-align: center;
  }
  h1 {
    margin: 30px 0;
    font-size: 4em;
    line-height: 1;
    letter-spacing: -1px;
  }
</style>
