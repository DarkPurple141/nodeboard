<template>
   <div class="chat">
      <messageThread :messages="messages"></messageThread>
      <messageBox @message="chatMessage"></messageBox>
   </div>
</template>

<script>
import messageThread from './messageThread'
import messageBox from './messageBox'

export default {
   props: ['socket', 'user'],
   data : function () {
      return {
         messages: []
      }
   },
   name: 'Chat',
   template: "<Chat></Chat>",
   components: {
      messageThread,
      messageBox
   },
   methods: {
      // event handler for message chat
      chatMessage: function(msg) {
         let chatMessage = {
            from: this.user,
            msg: msg
         }
         this.messages.push(chatMessage)
         this.socket.emit('message', chatMessage)
      }
   },
   mounted() {
      this.socket.on('message', msg => {
         // Incoming message added to current data.
         this.messages.push(msg)
      })


   }
}
</script>

<style lang="css">

.chat { margin: 0; padding: 0; box-sizing: border-box; border:1px solid black;}
.chat { font: 13px Helvetica, Arial; }

</style>
