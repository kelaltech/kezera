import React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Text } from 'react-native'

function OrganCard({  }: NavigationInjectedProps & { request: IRequestResponse }) {
  return (
    <>
      <Text>Organ card</Text>
    </>
  )
}

export default withNavigation(OrganCard)
