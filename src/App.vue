<template>
  <v-app>
    <v-app-bar app dark dense style="-webkit-app-region: drag">
      <v-btn tile icon class="pa-2">
        <v-img width="24px" src="../appicon/256x256.png"></v-img>
      </v-btn>
      <v-btn icon router to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon router to="/gitee">
        <v-icon>mdi-code-tags</v-icon>
      </v-btn>
      <v-btn icon router to="/about">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span class="hidden-xs-only">{{
        require("../package.json").description
      }}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="appMinimize">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn icon @click.native="appMaximize">
        <v-icon>{{
          isMaximized ? "mdi-fullscreen-exit" : "mdi-fullscreen"
        }}</v-icon>
      </v-btn>
      <v-btn icon @click.native="appClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<style lang="stylus">
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
  const { remote } = window.require("electron");

  export default {
    name: "App",
    data: () => ({
      isMaximized: false
    }),
    methods: {
      appMinimize() {
        remote.BrowserWindow.getFocusedWindow().minimize();
      },
      appMaximize() {
        if (remote.BrowserWindow.getFocusedWindow().isMaximized()) {
          remote.BrowserWindow.getFocusedWindow().restore();
          this.isMaximized = false;
        } else {
          remote.BrowserWindow.getFocusedWindow().maximize();
          this.isMaximized = true;
        }
      },
      appClose() {
        remote.BrowserWindow.getFocusedWindow().close();
      }
    }
  };
</script>
