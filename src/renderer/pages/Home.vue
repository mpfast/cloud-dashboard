<template>
  <div class="wrapper">
    <v-text>hello</v-text>
  </div>
</template>

<style lang="stylus">
.wrapper{
  position: fixed
  top: 64px
  right: 0
  bottom: 0
  left: 0
}
</style>

<script>
  export default {
    data: () => ({
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }),
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>