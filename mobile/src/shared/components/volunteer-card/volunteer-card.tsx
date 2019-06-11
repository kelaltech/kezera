import React, { useEffect } from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import {
  View,
  Text,
  Dimensions,
  ImageURISource,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Card } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'

interface IVolnteerCardProps {
  email: string
  name: string
  id: string
  volunteer_id: string
}
function VolunteerCard({
  navigation,
  name,
  email,
  id,
  volunteer_id
}: NavigationInjectedProps & IVolnteerCardProps) {
  return (
    <View
      style={{
        width: Dimensions.get('window').width
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            NavigationActions.navigate({
              routeName: 'VolunteerProfile',
              params: {
                volunteer_id: volunteer_id
              }
            })
          )
        }
      >
        <Card title={name} image={{ uri: `${baseUrl}/api/account/get-photo/${id}` }}>
          <Text style={{ marginBottom: 10 }}>{`Email:  ${email}`}</Text>
        </Card>
      </TouchableOpacity>
    </View>
  )
}

export default withNavigation(VolunteerCard)
