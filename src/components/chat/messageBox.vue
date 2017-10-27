<template>
   <form>
      <input @keyup.enter="alert" id="m" autocomplete="off"/>
   </form>
</template>

<script>
export default {
   name: "messageBox",
   template: '<message-box></message-box>',
   methods: {
      alert: function(element) {
         console.log("Yay")
      }
   }
}
</script>

<style lang="css">
form { background: #ccc; padding: 0px; position: relative; width: 100%; }
form input { border: 0; padding: 10px; width: 100%; margin: .5%; }
form button { width: 20%; background: rgb(130, 224, 255); border: none; padding: 10px; }
</style>
