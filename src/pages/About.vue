<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline">
            系统信息
          </v-card-title>
          <v-divider></v-divider>
          <v-layout wrap pa-3>
            <v-flex xs12 sm6 md4 class="item">
              <div class="name">Name:</div>
              <div class="value">{{ name }}</div>
            </v-flex>
            <v-flex xs12 sm6 md4 class="item">
              <div class="name">Version:</div>
              <div class="value">{{ version }}</div>
            </v-flex>
            <v-flex xs12 sm6 md4 class="item">
              <div class="name">Vue.js:</div>
              <div class="value">{{ vue }}</div>
            </v-flex>
            <v-flex xs12 sm6 md4 class="item">
              <div class="name">Electron:</div>
              <div class="value">{{ electron }}</div>
            </v-flex>
            <v-flex xs12 sm6 md4 class="item">
              <div class="name">Node:</div>
              <div class="value">{{ node }}</div>
            </v-flex>
            <v-flex xs12 sm6 md4 class="item">
              <div class="name">Platform:</div>
              <div class="value">{{ platform }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 pt-3>
        <v-card>
          <v-card-title class="headline">
            开源声明
          </v-card-title>
          <v-divider></v-divider>
          <v-layout pa-3>
            <p>
              本软件不依赖服务器，所有请求都是客户端直接请求云开发 HTTP API
              文档，请自己妥善保护小程序的appKey和appSecret<br />
              <span
                >源码地址:
                <router-link to="/gitee"
                  >https://gitee.com/lerte/cloud-dashboard</router-link
                >
              </span>
            </p>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 pt-3>
        <v-card>
          <v-card-title class="headline">
            欢迎赞赏
          </v-card-title>
          <v-divider></v-divider>
          <v-layout pa-3>
            <v-img src="../../public/donate.jpg" />
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        electron: require("electron/package.json").version,
        name: require("../../package.json").name,
        version: require("../../package.json").version,
        node: process.versions.node,
        platform: require("os").platform(),
        vue: require("vue/package.json").version
      };
    }
  };
</script>

<style>
  .name {
    display: inline;
    font-style: italic;
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 1px;
  }

  .value {
    display: inline;
    font-style: italic;
    font-weight: 600;
    font-size: 18px;
    padding-left: 5px;
  }
</style>
