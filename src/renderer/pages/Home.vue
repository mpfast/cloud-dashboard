<template>
  <v-container fluid>
    <v-layout fill-height align-content-center justify-center wrap pa-5>
      <v-flex xs12>
        <v-subheader>请求地址</v-subheader>
      </v-flex>
      <v-flex xs12>
        <v-text-field v-model="url" solo flat clearable />
      </v-flex>
      <v-flex xs12>
        <v-subheader>请求参数</v-subheader>
      </v-flex>
      <v-flex xs12>
        <v-text-field placeholder="env" solo flat clearable />
      </v-flex>
      <v-flex xs12>
        <v-text-field placeholder="limit" solo flat clearable />
      </v-flex>
      <v-flex xs12>
        <v-text-field placeholder="offset" solo flat clearable />
      </v-flex>
      <v-flex xs12>
        <v-btn
          :loading="loading"
          large
          block
          color="secondary"
          @click.native="postRequest"
          >请求</v-btn
        >
        <v-alert
          :value="message"
          type="info"
          outline
          transition="scale-transition"
          v-text="message"
        />
      </v-flex>
      <v-flex xs12 pt-3>
        <v-card>
          <v-card-title>
            {{ result }}
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const { session } = require('electron').remote

export default {
  data: () => ({
    message: null,
    result: null,
    loading: false,
    access_token: null,
    url: null,
    env: null,
    limit: null,
    offset: null
  }),
  methods: {
    // 获取cookies
    getCookie(name) {
      session.defaultSession.cookies.get(
        { url: this.url },
        (error, cookies) => {
          if (error) console.error(error)
          const accessToken = cookies.find(cookie => cookie.name === name)
          if (accessToken) {
            this.access_token = accessToken.value
            this.$store.commit('setAccessToken', accessToken.value)
          } else {
            this.$store.commit('setAccessToken', null)
            this.$router.push({ name: 'login' })
          }
        }
      )
    },
    initData() {
      this.url = this.$store.state.baseUrl
    },
    postRequest() {
      fetch(`${this.url}?access_token=${this.access_token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ env: 'colorbox-5ivf1' })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.result = data
        })
    }
  },
  mounted() {
    this.getCookie('access_token')
    this.initData()
  }
}
</script>
