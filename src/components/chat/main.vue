<template>
   <div class="chat">
      <messageThread :messages="messages"></messageThread>
      <messageBox v-on:message="chatMessage"></messageBox>
   </div>
</template>

<script>
import messageThread from './messageThread'
import messageBox from './messageBox'

export default {
   props: ['messages'],
   name: 'Chat',
   template: "<Chat></Chat>",
   components: {
      messageThread,
      messageBox
   },
   methods: {
      chatMessage: function(msg) {
         //console.log("EVENT" + msg)
         this.$emit('message', msg)
      }
   }
}
</script>

<style lang="css">

.chat { margin: 0; padding: 0; box-sizing: border-box; }
.chat { font: 13px Helvetica, Arial; }

</style>
