<template>
  <v-app id="inspire" @mousewheel.native="dealMouseWheel">
    <v-toolbar dark fixed flat clipped-left clipped-right app style="-webkit-app-region: drag">
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-btn icon router to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon @click.native="shrink">
        <i class="fa fa-minus"></i>
      </v-btn>
      {{zoomPercent}}
      <v-btn icon @click.native="magnify">
        <i class="fa fa-plus"></i>
      </v-btn>
      <v-btn icon>
        <v-icon>adjust</v-icon>
      </v-btn>
      <v-btn icon router to="/about">
        <v-icon>info</v-icon>
      </v-btn>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="windowMin">
        <i class="fa fa-window-minimize"></i>
      </v-btn>
      <v-btn icon @click.native="windowMax">
        <i :class="['fa', isMaximized ? 'fa-window-restore':'fa-window-maximize']"></i>
      </v-btn>
      <v-btn icon @click.native="windowClose">
        <i class="fa fa-window-close"></i>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawerLeft" fixed clipped stateless app>
    </v-navigation-drawer>
    <v-content :style="{zoom}">
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
    <v-navigation-drawer v-model="drawerRight" fixed right clipped stateless app>
      <v-toolbar>
        <v-btn icon>
          <i class="fa fa-align-left"></i>
        </v-btn>
        <v-btn icon>
          <i class="fa fa-align-center "></i>
        </v-btn>
        <v-btn icon>
          <i class="fa fa-align-right"></i>
        </v-btn>
        <v-btn icon>
          <i class="fa fa-align-left fa-rotate-90"></i>
        </v-btn>
        <v-btn icon>
          <i class="fa fa-align-center fa-rotate-90"></i>
        </v-btn>
        <v-btn icon>
          <i class="fa fa-align-right fa-rotate-90"></i>
        </v-btn>
      </v-toolbar>
      <v-container pa-3>
        Position
        <v-layout>
          <v-flex md5>
            <v-text-field solo height="20" mask="######"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex md5>
            <v-text-field solo height="20" mask="######"></v-text-field>
          </v-flex>
        </v-layout>
        Size
        <v-layout>
          <v-flex md5>
            <v-text-field solo height="20" mask="######"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex md5>
            <v-text-field solo height="20" mask="######"></v-text-field>
          </v-flex>
        </v-layout>
        Transform
        <v-layout>
          <v-flex md5>
            <v-text-field solo height="20" mask="######"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex md5>
            <v-text-field solo height="20" mask="######"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </v-app>
</template>

<style lang="stylus">
@import "/static/css/main.css"

::-webkit-scrollbar
  display: none
.v-btn
  -webkit-app-region: no-drag
</style>

<script>
  import fontList from 'font-list'
  export default {
    data: () => ({
      zoom: 1,
      isMaximized: false,
      drawerLeft: true,
      drawerRight: true,
      fonts: []
    }),
    computed: {
      zoomPercent () {
        return `${(this.zoom * 100).toFixed(0)}%`
      },
      window () {
        return this.$electron.remote.BrowserWindow.getFocusedWindow()
      }
    },
    methods: {
      shrink (event) {
        if (event) {
          this.zoom = parseFloat((this.zoom / 2).toFixed(2))
        } else {
          this.zoom = parseFloat((this.zoom - 0.01).toFixed(2))
        }
        if (this.zoom - 0.01 < 0) {
          this.zoom = 0.01
        }
      },
      magnify (event) {
        if (event) {
          this.zoom = parseFloat((this.zoom * 2).toFixed(2))
          if (this.zoom > 1) {
            this.zoom = this.zoom.toFixed(0)
          }
        } else {
          this.zoom = parseFloat((this.zoom + 0.01).toFixed(2))
        }
      },
      dealMouseWheel (event) {
        if (event.altKey) {
          if (event.deltaY < 0) {
            this.magnify()
          }
          if (event.deltaY > 0) {
            this.shrink()
          }
        }
      },
      windowMin () {
        this.window.minimize()
      },
      windowMax () {
        if (this.window.isMaximized()) {
          this.window.restore()
          this.isMaximized = false
        } else {
          this.window.maximize()
          this.isMaximized = true
        }
      },
      windowClose () {
        this.window.close()
      }
    },
    mounted () {
      fontList.getFonts().then(fonts => {
        this.fonts = fonts
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>