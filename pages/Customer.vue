<template>
  <div>
    <layout>
      <main>
        <div>
          <h4>こちらからクレジットカードを登録してください</h4>
          <p>**テスト用の番号 "4242424242424242" を使用してください**</p>
        </div>
        <div>
          <h4>お客様のお名前を登録してください</h4>
          <form action="">
            <input type="text">
            <v-btn>名前を登録する</v-btn>
          </form>
        </div>
      </main>
    </layout>
  </div>
</template>

<script>
import { POST } from '@nuxtjs/axios';

export default {
  mounted() {
    this.stripe = Stripe('pk_test_51Hp8W6GM8QHm52Sew543CT6L0qkt1A4K6eKS89CRiVKKrLCHdzSaAEsmseYVrYJdDx3x0MWjt3kIiShsjOlo73w800iAHOtu3v');
    let elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.$refs.card);
  },
  methods: {
    async registerCustomer(e) {
      e.preventDefault();
      const result = this.$axios.$post('/api/register', {
        customerName: name
      });
      console.log(result);
      customerSetter({
        name: result.name,
        id: result.id,
        client_secret: result.client_secret
      })
    }
  }
}
</script>

<style>

</style>
