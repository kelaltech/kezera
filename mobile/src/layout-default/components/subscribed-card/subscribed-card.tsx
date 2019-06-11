import React from 'react'
import { View, Text, Image } from 'react-native'
import { style } from './subscribed-card-style'
import { Button, Divider, ListItem } from 'react-native-elements'
import { url } from 'inspector'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'
import { NavigationActions, NavigationInjectedProps } from 'react-navigation'
import { baseUrl } from '../../../app/configs/setup-axios'

interface ISubscribedCardProps {
  organization: IOrganizationResponse
}

export default function SubscribedCard(
  props: NavigationInjectedProps<{}> & ISubscribedCardProps
) {
  let { dispatch } = props.navigation
  return (
    <View>
      <ListItem
        leftAvatar={{ source: { uri: `${baseUrl}${props.organization.logoUri}` } }}
        title={props.organization.account.displayName}
        subtitle={'Add location here'}
        rightIcon={{
          name: 'keyboard-arrow-right',
          onPress(): void {
            dispatch(
              NavigationActions.navigate({
                routeName: 'OrganizationDetail',
                params: { id: props.organization._id }
              })
            )
          }
        }}
      />
      <Divider />
    </View>
  )
}
