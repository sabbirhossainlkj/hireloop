import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1Th8i508KKQIxEdQRIuO1U13",
  seeker_premium: "price_1ThVYl08KKQIxEdQjoEOspE7",
  recruiter_growth: "price_1Th8hM08KKQIxEdQbmNSl7uV",
  recruiter_enterprise: "price_1Th8gb08KKQIxEdQVgzwvOO9",
};
