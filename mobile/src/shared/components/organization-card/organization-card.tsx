import React, { useState } from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Axios from 'axios'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'
import { baseUrl } from '../../../app/configs/setup-axios'
import { useVolunteerState } from '../../../app/stores/volunteer/volunteer-provider'

function OrganizationCard({
  type,
  motto,
  _id,
  logoUri,
  account,
  subscribersCount,
  navigation
}: NavigationInjectedProps & IOrganizationResponse) {
  const [subscribers, setSubscribers] = useState(subscribersCount)
  const { subscriptions, volunteer } = useVolunteerState()
  const handleSubscribe = () => {
    Axios.put(
      `/api/organization/${
        subscriptions!.map(s => s._id).includes(volunteer!._id) ? 'un' : ''
      }subscribe/${_id}`,
      undefined,
      {
        withCredentials: true
      }
    )
      .then(data => data.data)
      .then((o: IOrganizationResponse) => {
        setSubscribers(o.subscribersCount)
      })
  }

  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <Card title={account.displayName} image={{ uri: `${baseUrl}${logoUri}` }}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'OrganizationDetail',
                params: {
                  id: _id
                }
              })
            )
          }
        >
          <View style={{ marginBottom: 10 }}>
            <Text> {motto} </Text>
            <Text>{type} </Text>
          </View>
        </TouchableOpacity>
        <Button
          onPress={handleSubscribe}
          title={`${
            subscriptions!.map(s => s._id).includes(volunteer!._id)
              ? 'Unsubscribe'
              : 'Subscribe'
          } ${subscribers ? subscribers : ''}`}
        />
      </Card>
    </View>
  )
}

export default withNavigation(OrganizationCard)
