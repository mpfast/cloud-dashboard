<template>
  <v-container fill-height>
    <v-layout align-center justify-center wrap class="login-wrapper">
      <v-flex xs12 hidden-sm-and-down md6 xl4 elevation-5>
        <v-img
          class="grey lighten-2"
          height="450"
          src="https://picsum.photos/800/600"
          lazy-src="https://picsum.photos/800/600"
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="grey lighten-5" />
          </v-layout>
        </v-img>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 elevation-5>
        <v-layout align-content-center justify-center wrap pa-5>
          <v-flex xs12 pb-5>
            <v-img
              src="./../../appicon/256x256.png"
              width="128px"
              style="margin: 0 auto;"
            ></v-img>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="appid"
              v-model="appid"
              prepend-inner-icon="mdi-account"
              solo
              flat
              clearable
              @keyup.enter.native="login"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="secret"
              v-model="secret"
              :type="showSecret ? 'text' : 'password'"
              :append-icon="showSecret ? 'mdi-blank' : 'mdi-blank'"
              prepend-inner-icon="mdi-lock"
              solo
              flat
              @keyup.enter.native="login"
              @click:append="showSecret = !showSecret"
            />
          </v-flex>
          <v-flex xs12>
            <v-btn
              :loading="loading"
              :disabled="disabled"
              large
              block
              color="secondary"
              @click.native="login"
              >登录</v-btn
            >
            <v-alert
              class="mt-3"
              :value="Boolean(message)"
              type="info"
              transition="scale-transition"
              v-text="message"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="stylus">
  #login-page {
    background: #eee;
  }

  .login-wrapper {
    >.flex {
      height: 450px;
      background: #fff;
    }
  }
</style>

<script>
  const { session } = require("electron").remote;

  export default {
    data: () => ({
      message: null,
      loading: false,
      appid: null,
      secret: null,
      showSecret: false
    }),
    computed: {
      url() {
        return this.$store.state.baseUrl;
      },
      disabled() {
        return !this.appid || !this.secret;
      }
    },
    methods: {
      // 设置cookie
      setCookie(name, value, expires) {
        const exp = new Date();
        const date = Math.round(exp.getTime() / 1000) + expires;
        const cookie = {
          url: this.url,
          name: name,
          value: value,
          expirationDate: date
        };
        session.defaultSession.cookies.set(cookie, error => {
          if (error) console.error(error);
        });
      },
      // 获取cookies
      getCookie() {
        session.defaultSession.cookies.get(
          { url: this.url },
          (error, cookies) => {
            if (error) console.error(error);
            console.log(cookies);
          }
        );
      },
      async login() {
        if (!this.disabled) {
          this.loading = true;
          fetch(
            `${this.url}/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.secret}`
          )
            .then(response => response.json())
            .then(data => {
              if (data.errcode) {
                switch (data.errcode) {
                  case -1:
                    this.message = "系统繁忙，请稍候再试";
                    break;
                  case 40001:
                    this.message =
                      "AppSecret 错误或者 AppSecret 不属于这个小程序，请确认 AppSecret 的正确性";
                    break;
                  case 40002:
                    this.message =
                      "请确保 grant_type 字段值为 client_credential";
                    break;
                  case 40013:
                    this.message =
                      "不合法的 AppID，请开发者检查 AppID 的正确性，避免异常字符，注意大小写";
                    break;
                  default:
                    this.message = data.errmsg;
                    break;
                }
              } else {
                // 成功获取access_token
                this.setCookie(
                  "access_token",
                  data.access_token,
                  data.expires_in
                );
                this.$store.commit("setApp", {
                  appid: this.appid,
                  secret: this.secret
                });
                this.$router.push({ name: "index" });
              }
            });
          this.loading = false;
        }
      }
    },
    mounted() {
      this.appid = this.$store.state.appid;
      this.secret = this.$store.state.secret;
    }
  };
</script>
