import React, { useState } from 'react'
import { NavigationActions, NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Text, ImageURISource, TouchableOpacity } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Axios from 'axios'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'




function OrganizationCard ({type,motto,_id,logoUri,account,subscribersCount,navigation}: NavigationInjectedProps & IOrganizationResponse) {

  const [subscribers, setSubscribers] = useState(subscribersCount)

  const handleSubscribe = () => {
    Axios
      .put(`/api/organization/subscribe/${_id}`)
      .then(data => data.data)
      .then((o:IOrganizationResponse) =>{
        setSubscribers(o.subscribersCount)
      })
  }

  return (
    <View>
      <Card
        title={account.displayName}
        image={{uri: logoUri}}>
        <TouchableOpacity
          onPress={()=>
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
        <View style={{marginBottom: 10}}>
          <Text> {motto} </Text>
          <Text>{type} </Text>
        </View>
        </TouchableOpacity>
        <Button
          onPress={()=>handleSubscribe}
          title={`Subscribe ${subscribers}`}/>
      </Card>
    </View>
  )
}

export default withNavigation(OrganizationCard)