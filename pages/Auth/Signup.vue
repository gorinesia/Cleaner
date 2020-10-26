<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1" style="color: #00ACC1">SIGN UP!</h1>
      </v-card-title>
      <p>メールアドレスもしくはSNSアカウントで登録</p>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="ユーザー名" outlined filled v-model="displayName"></v-text-field>
          <v-text-field prepend-icon="mdi-account-circle" label="email" outlined filled v-model="email"></v-text-field>
          <v-text-field :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" append-icon="mdi-eye-off" label="パスワード" @click:append="showPassword = !showPassword" outlined filled v-model="password"></v-text-field>
          <!-- <v-card-action> -->
            <v-btn class="pa-2 font-weight-bold" color="#00ACC1" rounded block large dark @click="signUp">登録する</v-btn>
          <!-- </v-card-action> -->
        </v-form>
      </v-card-text>
      <p>- Signup with -</p>
      <v-icon>mdi-twitter</v-icon><br>
      <v-btn outlined rounded color="#00ACC1">アカウントをお持ちでない方はこちら</v-btn>
      <p>パスワードをお忘れの方へ</p>
    </v-card>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'signup',
  data: () => ({
    displayName: '',
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    signUp() {
      const db = firebase.firestore();
      db.collection('users')
        .add({
          displayName: this.displayName,
          email: this.email,
          password: this.password,
        })
        .then((docRef) => {
          console.log(docRef.id)
        })
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
          console.log('signup!!!');
          this.$router.push('/auth/login')
        })

    }
  }
};
</script>

<style>

</style>
