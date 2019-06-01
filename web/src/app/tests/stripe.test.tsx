import React from 'react'
import ReactDOM from 'react-dom'
import StripeCheckout, { Token } from 'react-stripe-checkout'

function TransferMoney() {
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

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TransferMoney />, div)
  ReactDOM.unmountComponentAtNode(div)
})
