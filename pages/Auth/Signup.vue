<template>
  <v-app>
    <v-card width="400px" class="mx-auto my-5 pa-5" align="center" justify="center">
      <v-card-title class="cyan--text text--darken-1 text-h4 font-weight-bold justify-center">SIGN UP!</v-card-title>
      <p>メールアドレスで登録</p>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="ユーザー名" outlined filled v-model="displayName"></v-text-field>
          <v-text-field prepend-icon="mdi-account-circle" label="email" outlined filled v-model="email"></v-text-field>
          <v-text-field :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" append-icon="mdi-eye-off" label="パスワード" @click:append="showPassword = !showPassword" outlined filled v-model="password"></v-text-field>
            <v-btn class="pa-2 font-weight-bold" color="#00ACC1" rounded block large dark @click="signUp">登録する</v-btn>
        </v-form>
      </v-card-text>
      <nuxt-link class="mb-5 grey--text text--darken-1 text-decoration-none" outlined rounded color="#00ACC1" to="/auth/login">アカウントをお持ちの方はこちら</nuxt-link>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'signup',
  data: () => ({
    displayName: '',
    email: '',
    password: '',
    image: require('@/assets/img/user.png'),
    showPassword: false
  }),
  methods: {
    signUp() {
      this.$store.dispatch('user/signUpAction', {
        displayName: this.displayName,
        email: this.email,
        password: this.password,
        image: this.image
      })
    }
  }
};
</script>

<style>

</style>
