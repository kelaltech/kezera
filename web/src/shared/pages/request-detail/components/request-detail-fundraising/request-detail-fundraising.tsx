import React from 'react'
import { Block, Button, Content, Input, Yoga } from 'gerami'
import StripeCheckout from 'react-stripe-checkout'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { IFundraisingResponse } from '../../../../../apiv/fundraising.apiv'
import { useAccountState } from '../../../../../app/stores/account/account-provider'
import useField from '../../../../hooks/use-field/use-field'

function RequestDetailFundraising({
  request
}: {
  request: IRequestResponse & { type: 'Fundraising'; fundraising: IFundraisingResponse }
}) {
  const { loading, t } = useLocale(['request', 'fundraising'])

  let raised = 0
  request.donations.map(
    d => d.approved && d.data && (raised += Number.parseFloat(d.data))
  )

  const { account } = useAccountState()

  const amount = useField({ initialValue: '0.00' })

  return (
    loading || (
      <Content>
        {request.status === 'CLOSED' ? (
          <Block first last className={'font-L fg-primary center'}>
            ETB {raised} raised out of ETB {request.fundraising.target} target!
          </Block>
        ) : (
          <Yoga maxCol={3}>
            <Block first last className={'center middle'}>
              <div className={'font-L fg-accent'}>
                <span className={'fg-blackish'}>ETB </span>
                {request.fundraising.target}
              </div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                TARGETED AMOUNT
              </div>
            </Block>

            <Block first last className={'center middle'}>
              {account && account.role === 'ORGANIZATION' ? (
                <span className={'fg-primary font-L light'}>Raising Funds</span>
              ) : raised >= request.fundraising.target ? (
                <span className={'fg-primary font-L light'}>Target Achieved!</span>
              ) : (
                <>
                  <div className={'margin-vertical-normal'}>
                    <Input
                      type={'number'}
                      {...amount.inputProps}
                      placeholder={'Amount'}
                    />
                  </div>

                  <div className={'margin-vertical-normal'}>
                    <StripeCheckout
                      token={token => alert('Your token is ' + token + '.')}
                      stripeKey="pk_test_yDsmxN1YjBhNssrxkyVLOtst00qlheQsVE"
                      amount={Number.parseFloat(amount.value)}
                    >
                      <Button className={'bg-accent fg-white'}>Pay with Card</Button>
                    </StripeCheckout>
                  </div>
                </>
              )}
            </Block>

            <Block first last className={'center middle'}>
              <div className={'font-L fg-accent'}>
                <span className={'fg-blackish'}>ETB </span>
                {raised}
              </div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                <span className={'fg-accent bold'}>
                  {Math.round((raised / request.fundraising.target) * 100)}%
                </span>{' '}
                RAISED SO FAR
              </div>
            </Block>
          </Yoga>
        )}
      </Content>
    )
  )
}

export default RequestDetailFundraising
