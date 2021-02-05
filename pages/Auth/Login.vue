<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5 pa-5" align="center" justify="center">
      <v-card-title class="cyan--text text--darken-1 text-h4 font-weight-bold justify-center">LOGIN</v-card-title>
      <v-card-text>
        <v-form>
          <label>Email(test@test.com)</label>
          <v-text-field prepend-icon="mdi-account-circle" label="email" outlined filled v-model="email"></v-text-field>
          <label>password(123456)</label>
          <v-text-field :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" append-icon="mdi-eye-off" label="パスワード" @click:append="showPassword = !showPassword" outlined filled v-model="password"></v-text-field>
            <v-btn class="font-weight-bold" color="#00ACC1" rounded block large dark @click="logIn">ログイン</v-btn>
        </v-form>
      </v-card-text>
      <nuxt-link class="mb-10 text-decoration-none grey--text text--darken-1" outlined rounded color="#00ACC1" to="/auth/signup">アカウントをお持ちでない方はこちら</nuxt-link>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    logIn() {
      this.$store.dispatch('user/logInAction', {
        email: this.email,
        password: this.password
      })
    }
  }
};
</script>

<style>

</style>
