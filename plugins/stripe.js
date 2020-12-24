const Stripe = require('stripe');
const stripe = Stripe('pk_test_51Hp8W6GM8QHm52Sew543CT6L0qkt1A4K6eKS89CRiVKKrLCHdzSaAEsmseYVrYJdDx3x0MWjt3kIiShsjOlo73w800iAHOtu3v');

const account = await stripe.accounts.create({
  type: 'express',
});

const accountLinks = await stripe.accountLinks.create({
  account: 'acct_1032D82eZvKYlo2C',
  refresh_url: 'https://example.com/reauth',
  return_url: 'https://example.com/return',
  type: 'account_onboarding',
});

const paymentIntent = await stripe.paymentIntents.create({
  payment_method_types: ['card'],
  amount: 1000,
  currency: 'jpy',
  application_fee_amount: 123,
  transfer_data: {
    destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
  },
});
