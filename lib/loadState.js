import { loadState } from '@stripe/stripe-js';

const stripePromise = loadState(process.env.STRIPE_PUBLISH_KEY)

export default stripePromise;
