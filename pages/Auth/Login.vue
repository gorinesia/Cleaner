<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5" align="center" justify="center">
      <v-card-title class="cyan--text text--darken-1 text-h4 font-weight-bold justify-center">LOGIN</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="email" outlined filled v-model="email"></v-text-field>
          <v-text-field :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" append-icon="mdi-eye-off" label="パスワード" @click:append="showPassword = !showPassword" outlined filled v-model="password"></v-text-field>
            <v-btn class="font-weight-bold" color="#00ACC1" rounded block large dark @click="logIn">ログイン</v-btn>
        </v-form>
      </v-card-text>
      <p>- Signup with -</p>
      <v-icon class="mb-5">mdi-twitter</v-icon><br>
      <v-btn class="mb-5" outlined rounded color="#00ACC1" to="/auth/signup">アカウントをお持ちでない方はこちら</v-btn>
    </v-card>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    logIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('loggedIn!!!');
          this.$router.push('/dashboard')
       })
    }
  }
};
</script>

<style>

</style>
