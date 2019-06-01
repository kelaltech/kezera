import StripeCheckout, { Token } from 'react-stripe-checkout'
import React from 'react'

export default function TransferMoney() {
  const onToken = (token: Token): void => {
    fetch(`/api/stripe/test-transfer/${token.id}/${'acct_1EgFSNECnzYmDQQO'}`).then(
      response => {
        response.json().then(data => {
          alert(`We are in business, ${data.email}`)
        })
      }
    )
  }

  return (
    <StripeCheckout
      token={onToken}
      stripeKey="pk_test_yDsmxN1YjBhNssrxkyVLOtst00qlheQsVE"
    />
  )
}
