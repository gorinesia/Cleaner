<template>
  <div>
    <!-- <layout> -->
      <main>
        <!-- {v-if customerState.client_secret ? (
          <div>
            <h4>こちらからクレジットカードを登録してください</h4>
            <p>**テスト用の番号 "4242424242424242" を使用してください**</p>
            {loading ? (
              '登録中...'
            ):(
              <div ref="card"></div>
              <Elements stripe={stripePromise}>
                <CardInputForm clientSecret={customerState.client_secret} customerName={customer.name}/>
              </Elements>
            )}
          </div>
        ) : (
          <div>
            <h4>お客様のお名前を登録してください</h4>
            <form @submit="registerCustomer(e)">
              <input type="text" defaultValue={name} @change="setName(e.target.value)">
              <button>名前を登録する</button>
            </form>
          </div>
        )} -->

        <div>
          <h4>こちらからクレジットカードを登録してください</h4>
          <p>**テスト用の番号 "4242424242424242" を使用してください**</p>
        </div>
        <div>
          <h4>お客様のお名前を登録してください</h4>
          <form action="charge" id="payment-form" @submit="pay">
            <div class="form-row">
              <label for="card"></label>
              <div ref="card"></div>
              <div id="card-errors" role="alert"></div>
              <button>お支払い</button>
            </div>
          </form>
            <input type="text">
            <v-btn>名前を登録する</v-btn>
        </div>
      </main>
    <!-- </layout> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      stripe: null,
      name: 'Test User'
    }
  },
  mounted() {
    this.stripe = Stripe('pk_test_51Hp8W6GM8QHm52Sew543CT6L0qkt1A4K6eKS89CRiVKKrLCHdzSaAEsmseYVrYJdDx3x0MWjt3kIiShsjOlo73w800iAHOtu3v');
    let elements = this.stripe.elements();
    let style = {
      base: {
        fontSize: '16px',
        color: '#32325d'
      }
    }
    this.card = elements.create('card', {style: style});
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
    },
    async onCard(ev) {
      // const stripe = Stripe('pk_test_51Hp8W6GM8QHm52Sew543CT6L0qkt1A4K6eKS89CRiVKKrLCHdzSaAEsmseYVrYJdDx3x0MWjt3kIiShsjOlo73w800iAHOtu3v')
      ev.preventDefault();
      await this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          this.stripeTokenHandler(result.token);
        }
      })
    },
    stripeTokenHandler(token) {
      console.log(token);
      const form = document.getElementById('payment-form');
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);
      form.submit();
    },
    async pay() {
      const response = await this.$axios.$post('/api/create-payment-intent');
      const {client_secret: clientSecret} = await response.json();
      console.log({client_secret: clientSecret});
      stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Jenny Rosen'
          }
        }
      }).then((result) => {
        if (result.error) {
          console.log(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log('ok');
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
