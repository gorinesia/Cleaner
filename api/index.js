const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = { path: '/api', handler: app };


app.get('/hello', (req, res) => {
  console.log('hello nuxt in text');
  res.send('world');
});

app.post('/create', async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'JP'
    });
    console.log(account.id);

    const origin = process.env.NODE_ENV === 'development' ? `http://${req.headers.host}` : `https://${req.headers.host}`;
    console.log(origin);
    const accountLinkURL = await generateAccountLink(account.id, origin);
    console.log(accountLinkURL);
    res.statusCode = 200;
    res.json({ url: accountLinkURL });
    console.log(accountLinkURL);
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

function generateAccountLink(accountID, origin) {
  console.log(accountID, origin);
  return stripe.accountLinks.create({
    type: 'account_onboarding',
    account: accountID,
    refresh_url: `${origin}/mypage`,
    return_url: `${origin}/mypage`
  }).then((link) => link.url)
  .catch((err) => console.log(err.message))
}

app.post('/register', async (req, res) => {
  try {
    const customerName = req.body.customerName

    const customer = await stripe.customers.create({
      name: customerName
    })

    const setupIntent = await stripe.setupIntent.create({
      paiment_method_types: ['card'],
      customer: customer.id
    });

    res.statusCode = 200;
    res.json({
      id: customer.id,
      name: customer.name,
      client_secret: setupIntent.client_secret
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message
    });
  }
});

app.post('/registerCard', async (req, res) => {
  try {
    const customerName = req.body.customerName;
    const customer = await stripe.customers.create({
      name: customerName
    });

    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card'],
      customer: customer.id
    });

    res.statusCode = 201;
    res.json({
      customerName: customerName,
      clientSecret: setupIntent.client_secret
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message
    })
  }
});

app.post('/payment', async (req, res) => {
  try {
    const item = req.body.item;
    const stripeConnectedAccountId = req.query.id;
    const customerId = req.body.customer_id;

    const paymentMethodData = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card'
    });

    const clonedPaymentMethod = await stripe.paymentMethods.create({
      customer: customerId,
      payment_method: paymentMethodData.data[0].id,
    }, {
      stripeAccount: stripeConnectedAccountId
    });

    const clonedCustomer = await stripe.customers.create({
      payment_method: clonedPaymentMethod.id,
    }, {
      stripeAccount: stripeConnectedAccountId
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: item.price,
      currency: 'jpy',
      payment_method_types: ['card'],
      payment_method: clonedPaymentMethod.id,
      customer: clonedCustomer.id,
      description: `${item.name}の購入代金`,
      metadata: { 'name': item.name, 'price': item.price}
    }, {
      stripeAccount: stripeConnectedAccountId
    })
    ;

    res.statusCode = 201;
    res.json({
      client_secret: paymentIntent.client_secret
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message
    });
  }
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    console.log(req.body)
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: 1000,
      currency: 'jpy',
      application_fee_amount: 123,
      transfer_data: {
        // destination: req.body.data.account
        destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}'
      }
    });

    res.json({
      client_secret: intent.client_secret
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err.message
    })
  }
});
