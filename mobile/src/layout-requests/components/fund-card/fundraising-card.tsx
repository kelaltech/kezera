import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Text, View } from 'react-native'
import { Card, PricingCard } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'
import values from '../../../assets/styles/values'
import { IFundraisingResponse } from '../../../../../api/modules/fundraising/fundraising.apiv'

function FundraisingCard({
  request
}: NavigationInjectedProps & {
  request: IRequestResponse & { type: 'Fundraising'; fundraising: IFundraisingResponse }
}) {
  const [raisedMoney, setRaisedMoney] = useState<number>(0)

  useEffect(() => {
    evaluateDonation()
  })

  function evaluateDonation() {
    let donation_raised: number = 0
    request.donations.map((d, k) => (donation_raised += Number(d.data)))
    setRaisedMoney(donation_raised)
  }

  return (
    <>
      <View>
        <PricingCard
          color={`${values.color.primary}`}
          title={`${request.name}`}
          price={`ETB ${request.fundraising.target}`}
          info={[
            `by ${'request._by.account.displayName'}`,
            `ETB ${raisedMoney} raised`,
            `${request.description.slice(0, 200)}`
          ]}
          button={{ title: 'Donate', icon: 'donate' }}
        />
      </View>
    </>
  )
}

export default withNavigation(FundraisingCard)
