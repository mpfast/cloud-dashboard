<template>
  <v-app id="inspire">
    <v-toolbar
      dark
      fixed
      flat
      clipped-left
      app
      dense
      style="-webkit-app-region: drag"
    >
      <v-btn icon router to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon router to="/gitee">
        <v-icon>code</v-icon>
      </v-btn>
      <v-btn icon router to="/about">
        <v-icon>info</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="windowMin">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn icon @click.native="windowMax">
        <v-icon>{{ isMaximized ? 'fullscreen_exit' : 'fullscreen' }}</v-icon>
      </v-btn>
      <v-btn icon @click.native="windowClose">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<style lang="stylus">
@import "/static/css/main.css"
::-webkit-scrollbar
  display: none
.v-btn
  -webkit-app-region: no-drag
.v-text-field > .v-input__control > .v-input {
  &__slot {
    border: 1px solid #ccc;
  }
}
</style>

<script>
import fontList from 'font-list'

export default {
  data: () => ({
    isMaximized: false,
    fonts: []
  }),
  computed: {
    window() {
      return this.$electron.remote.BrowserWindow.getFocusedWindow()
    }
  },
  methods: {
    windowMin() {
      this.window.minimize()
    },
    windowMax() {
      if (this.window.isMaximized()) {
        this.window.restore()
        this.isMaximized = false
      } else {
        this.window.maximize()
        this.isMaximized = true
      }
    },
    windowClose() {
      this.window.close()
    }
  },
  mounted() {
    fontList
      .getFonts()
      .then(fonts => {
        this.fonts = fonts
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
