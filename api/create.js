// import stripe from '../lib/stripe';
const router = require('express').Router();
// const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// module.exports = { path: '/api', handler: app };

// export default async (req, res) => {
router.post('/create', async (req, res) => {
  try {
    console.log(req, res);

    const account = await stripe.accounts.create({
      type: 'express',
      country: 'JP'
    });

    const origin = process.env.NODE_ENV === 'development' ? `https://${req.headers.host}` : `https://${req.headers.host}`;
    const accountLinkURL = await generateAccountLink(account.id, origin);

    res.statusCode = 200;
    res.json({ url: accountLinkURL });

  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

function generateAccountLink(accountID, origin) {
  return stripe.accountLinks.create({
    type: 'account_onboarding',
    account: accountID,
    refresh_url: `${origin}/onboard-user/refresh`,
    return_url: `${origin}/success`
  }).then((link) => link.url);
}

app.post("/onboard-user", async (req, res) => {
  try {
    const account = await stripe.accounts.create({type: "standard"});
    req.session.accountID = account.id;

    const origin = `${req.headers.origin}`;
    const accountLinkURL = await generateAccountLink(account.id, origin);
    res.send({ url: accountLinkURL });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = router;
