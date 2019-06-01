import * as Stripe from 'stripe'
import * as Router from 'koa-router'
import * as Koa from 'koa'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

const router = new Router({ prefix: '/api/stripe' })
const app = new Koa()

// GET /api/stripe/test-transfer/:source_token/:stripe_account_id
router.get('/test-transfer/:source_token/:stripe_account_id', async ctx => {
  const charge = await stripe.charges.create({
    amount: 14 * 100,
    currency: 'usd',
    source: ctx.params.source_token,
    description: 'Payment',
    statement_descriptor: 'Rocketship, Inc.'
  })
  console.log('charging: ', charge.status)

  const payout = await stripe.payouts.create({
    method: 'instant',
    amount: 5000,
    currency: 'usd',
    statement_descriptor: 'Rocketship, Inc.',
    destination: ctx.params.stripe_account_id
  })
  console.log('payout: ', payout.status)

  ctx.body = { charge, payout }
})

app.use(router.allowedMethods())
app.use(router.routes())

app.listen(8900, () => console.log('Listening on port 8900...'))
