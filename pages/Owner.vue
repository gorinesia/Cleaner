<template>
  <div>
    <!-- <layout> -->
      <main>
        <h2>店舗オーナー用のメニュー</h2>
        <div>
          <v-btn @click="getSetLink">店舗の銀行口座を登録する</v-btn>
        </div>
        <div>
          <div ref="card"></div>
        </div>
        <div>
          <p>api response result : {{ response }}</p>
        </div>
      </main>
    <!-- </layout> -->
  </div>
</template>

<script>
// import { loadStripe } from '@stripe/stripe-js';
// import { POST } from 'axios'

export default {
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
    this.card = elements.create('card');
    this.card.mount(this.$refs.card);

    this.$axios.$get('/api/hello')
      .then(response => {
        console.log(response);
        this.response = response
      })
      .catch(error => {
        console.log(err);
      })
  },
  methods: {
    async getSetLink() {
      // const response = await this.$axios.$post('/api/onboard-user', {
      // // headers: {
      //     // 'Content-Type': 'application/json'
      //   name: 'test',
      //   email: 'test@mail.com'
      //   // }
      // });
      // console.log(response);
      // await this.$router.push(response.url);
      const result = await this.$axios.$post('/api/create', {
        name: 'test',
        email: 'test@mail.com'
      });
      console.log(result);
      await this.$router.push('/stripe/oauth');
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
