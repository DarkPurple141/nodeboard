<template>
   <form v-on:submit.prevent>
      <input @keyup.enter="chat($event.target)" autocomplete="off"/>
   </form>
</template>

<script>
export default {
   name: "messageBox",
   template: '<message-box></message-box>',
   methods: {
      chat: function(target) {
         console.log("Sending new message")
         // emit message submit up the chain
         this.$emit('message', target.value)
         target.value = ""
      }
   }
}
</script>

<style lang="css">
form { background: #ccc; padding: 0px; position: relative; width: 100%; }
form input { border: 0; padding: 10px; width: 100%; margin: .5%; }
form button { width: 20%; background: rgb(130, 224, 255); border: none; padding: 10px; }
</style>
