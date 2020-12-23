const Stripe = require('stripe');
const stripe = Stripe('pk_test_51Hp8W6GM8QHm52Sew543CT6L0qkt1A4K6eKS89CRiVKKrLCHdzSaAEsmseYVrYJdDx3x0MWjt3kIiShsjOlo73w800iAHOtu3v');

const account = await stripe.accounts.create({
  type: 'express',
});
