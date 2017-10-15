<template>
   <v-app dark>
   <div class="container">
     <h1>{{ error.code }}</h1>

     <p><strong>Page not found :(</strong></p>
     <p>The requested page could not be found.</p>
     <pre>{{ error.description }}</pre>
   </div>
</v-app>
</template>

<script>

export default {
   name: 'errorPage',
   props['error']
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
