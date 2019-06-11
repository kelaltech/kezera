import React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Text } from 'react-native'

function FundraisingCard({  }: NavigationInjectedProps & { request: IRequestResponse }) {
  return (
    <>
      <Text>Fundraising Task</Text>
    </>
  )
}

export default withNavigation(FundraisingCard)
