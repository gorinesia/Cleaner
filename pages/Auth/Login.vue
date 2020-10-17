<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1" style="color: #00ACC1">LOGIN</h1>
      </v-card-title>
      <p>メールアドレスもしくはSNSアカウントで登録</p>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="email" outlined filled></v-text-field>
          <v-text-field :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" append-icon="mdi-eye-off" label="パスワード" @click:append="showPassword = !showPassword" outlined filled></v-text-field>
          <!-- <v-card-action> -->
            <v-btn color="#00ACC1" rounded block large dark>ログイン</v-btn>
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
export default {
  name: 'login',
  data: () => ({
    showPassword: false
  })
};
</script>

<style>

</style>
