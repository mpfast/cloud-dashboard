<template>
  <v-container fluid>
    <v-btn router to="/login">Login</v-btn>
  </v-container>
</template>

<script>
const { session } = require('electron').remote

export default {
  data: () => ({
    access_token: null
  }),
  computed: {
    url() {
      return this.$store.state.baseUrl
    }
  },
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
            console.log(this.access_token)
          } else {
            this.$router.push({ name: 'login' })
          }
        }
      )
    }
  },
  mounted() {
    this.getCookie('access_token')
  }
}
</script>
