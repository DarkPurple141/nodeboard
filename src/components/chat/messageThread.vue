<template>
   <ul id="messages">
      <li v-for="msg in messages">{{ msg.from }} : {{ msg.msg }}</li>
   </ul>
</template>

<script>

export default {
   props: ['messages'],
   name: "messageThread",
   template: '<message-thread></message-thread>'
}
</script>

<style lang="css">
#messages { list-style-type: none; margin: 0; padding: 0; overflow-y: auto; height: 400px;}
#messages li { padding: 5px 10px; }
#messages li:nth-child(odd) { background: #eee; }
</style>
