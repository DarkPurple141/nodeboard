<template>
   <ul id="messages">
      <li>Sample</li>
      <li>Sample</li>
      <li>Sample</li>
      <li>Sample</li>
   </ul>
</template>

<script>
export default {
   name: "messageThread",
   template: '<message-thread></message-thread>'
}
</script>

<style lang="css">
#messages { list-style-type: none; margin: 0; padding: 0; }
#messages li { padding: 5px 10px; }
#messages li:nth-child(odd) { background: #eee; }
</style>
