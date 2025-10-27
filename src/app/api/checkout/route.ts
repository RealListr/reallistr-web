import Stripe from 'stripe';
export const dynamic = 'force-dynamic';

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: process.env.STRIPE_TEST_PRICE_ID!, quantity: 1 }],
    success_url: process.env.NEXT_PUBLIC_BASE_URL + '/?success=1',
    cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/?canceled=1',
  });
  return new Response(JSON.stringify({ id: session.id }), { headers: { 'content-type': 'application/json' } });
}
