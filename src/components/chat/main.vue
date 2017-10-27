<template>
   <div class="chat">
      <messageThread></messageThread>
      <messageBox></messageBox>
   </div>
</template>

<script>
import messageThread from './messageThread'
import messageBox from './messageBox'

export default {
   name: 'Chat',
   template: "<Chat></Chat>",
   components: {
      messageThread,
      messageBox
   }
}
</script>

<style lang="css">

.chat { margin: 0; padding: 0; box-sizing: border-box; }
.chat { font: 13px Helvetica, Arial; }

</style>
