import React, { useEffect, useState } from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Text, View } from 'react-native'
import { Card, PricingCard } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'
import values from '../../../assets/styles/values'
import { IFundraisingResponse } from '../../../../../api/modules/fundraising/fundraising.apiv'
import classes from '../../../assets/styles/classes'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

function FundraisingCard({
  request,
  navigation
}: NavigationInjectedProps & {
  request: IRequestResponse & {
    _by: IOrganizationResponse
    type: 'Fundraising'
    fundraising: IFundraisingResponse
  }
}) {
  const [raisedMoney, setRaisedMoney] = useState<number>(0)

  useEffect(() => {
    evaluateDonation()
  })

  function evaluateDonation() {
    let donation_raised: number = 0
    request.donations.map(
      d => d.approved && d.data && (donation_raised += Number.parseFloat(d.data))
    )
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
            `by ${request._by.account.displayName}`,
            `ETB ${raisedMoney} raised`,
            `${request.description.slice(0, 200)}`
          ]}
          onButtonPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'FundMobileDetail',
                params: {
                  id: request._id
                }
              })
            )
          }
          button={{
            title: 'Donate',
            icon: 'label',
            buttonStyle: {
              paddingVertical: values.space.normal
            }
          }}
        />
      </View>
    </>
  )
}

export default withNavigation(FundraisingCard)
