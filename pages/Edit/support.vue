<template>
  <v-app class="mx-10">
    <h2 class="cyan--text text--darken-1 my-5">サポート管理</h2>
    <v-container max-width="600px">
      <v-card class="pa-5">
        <h3>銀行口座を登録する</h3>
        <v-btn class="ma-2" @click="getSetLink">登録する</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'loggedIn',
  data() {
    return {
      error: '',
      stripe: null,
      card: null,
      response: null
    }
  },
  mounted() {
    this.stripe = Stripe('pk_test_51Hp8W6GM8QHm52Sew543CT6L0qkt1A4K6eKS89CRiVKKrLCHdzSaAEsmseYVrYJdDx3x0MWjt3kIiShsjOlo73w800iAHOtu3v');
    let elements = this.stripe.elements();
  },
  methods: {
    async getSetLink() {
      const result = await this.$axios.$post('/api/create', {
        name: 'test',
        email: 'test@mail.com'
      });
      console.log(result);
      await window.location.replace(result.url);
    }
  }
}
</script>

<style>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
