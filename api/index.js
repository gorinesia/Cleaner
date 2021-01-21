const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = { path: '/api', handler: app };

// app.use(session({
//   secret: 'Set this to a random string taht is kept secure',
//   resave: false,
//   saveUninitialized: true,
// }))

app.get('/hello', (req, res) => {
  console.log('hello nuxt in text');
  res.send('world');
});

// export default async (req, res) => {
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
    refresh_url: `${origin}/owner`,
    return_url: `${origin}/owner`
    // refresh_url: `${origin}/onboard-user/refresh`,
    // return_url: `${origin}/success`
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
      error: err.message;
    });
  }
});

// app.post("/onboard-user", async (req, res) => {
//   try {
//     const account = await stripe.accounts.create({type: "standard"});
//     req.session.accountID = account.id;

//     const origin = `${req.headers.origin}`;
//     const accountLinkURL = await generateAccountLink(account.id, origin);
//     res.send({ url: accountLinkURL });
//   } catch (err) {
//     res.status(500).send({
//       error: err.message,
//     });
//   }
// });

// function generateAccountLink(accountID, origin) {
//   return stripe.accountLinks
//     .create({
//       type: "account_onboarding",
//       account: accountID,
//       refresh_url: `${origin}/onboard-user/refresh`,
//       return_url: `${origin}/success.html`,
//     })
//     .then((link) => link.url);
// }

// // module.exports = router;

// require("dotenv").config();
// const bodyParser = require("body-parser");
// const express = require("express");
// // const { resolve } = require("path");
// const session = require("express-session");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/hello', (req, res) => {
//     console.log('hello nuxt in text');
//     res.send('world');
//   });


// // app.use(express.static('pages'));
// // app.use(express.static(process.env.STATIC_DIR));
// app.use(session({
//   secret: "Set this to a random string that is kept secure",
//   resave: false,
//   saveUninitialized: true,
// }))

// // Use JSON parser for all non-webhook routes
// app.use((req, res, next) => {
// if (req.originalUrl === "/webhook") {
//   next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

// // app.get("/", (req, res) => {
//   // const path = resolve(process.env.STATIC_DIR + "/index.html");
//   // const path = resolve('http://localhost:3000/api');
//   // res.sendFile(path);
// // });


// app.post("/onboard-user", async (req, res) => {
//   try {
//     const account = await stripe.accounts.create({type: "express"});
//     req.session.accountID = account.id;

//     const origin = `${req.headers.origin}`;
//     const accountLinkURL = await generateAccountLink(account.id, origin);
//     res.send({url: accountLinkURL});
//   } catch (err) {
//     res.status(500).send({
//       error: err.message
//     });
//   }
// });

// app.get("/onboard-user/refresh", async (req, res) => {
//   if (!req.session.accountID) {
//     res.redirect("/");
//     return;
//   }
//   try {
//     const {accountID} = req.session;
//     const origin = `${req.secure ? "http://" : "http://"}${req.headers.host}`;

//     const accountLinkURL = await generateAccountLink(accountID, origin)
//     res.redirect(accountLinkURL);
//   } catch (err) {
//     res.status(500).send({
//       error: err.message
//     });
//   }
// });

// function generateAccountLink(accountID, origin) {
//   return stripe.accountLinks.create({
//     type: "account_onboarding",
//     account: accountID,
//     refresh_url: `${origin}/onboard-user/refresh`,
//     return_url: `${origin}/success.html`,
//   }).then((link) => link.url);
// }

// app.listen(port, () => console.log(`Node server listening on port ${port}!`));

// module.exports = { path: '/api', handler: app };