import React from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { Button, Card, PricingCard } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'
import { taskCardStyle } from '../task-card/task-card-style'
import classes from '../../../assets/styles/classes'
import { IRequestType } from '../../../../../api/models/request/request.model'
import values from '../../../assets/styles/values'

function MaterialCard({
  request,
  navigation
}: NavigationInjectedProps & {
  request: IRequestResponse & { type: IRequestType; material: any }
}) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          navigation.dispatch(
            NavigationActions.navigate({
              routeName: 'MaterialMobileDetail',
              params: {
                id: request._id
              }
            })
          )
        }
      >
        <Card
          featuredTitle={request.name}
          image={{ uri: `${baseUrl}${request.coverUri}` }}
        >
          <View style={taskCardStyle.dateContainer}>
            <Text style={classes.label}>{`Type: ${
              request.material[0].materialType
            }`}</Text>
            <Text style={classes.label}>{`Quantity: ${
              request.material[0].quantity
            }`}</Text>
          </View>
          <View style={taskCardStyle.dateContainer}>
            <Text style={classes.label}>{`Expires: ${
              request.expires ? new Date(request.expires).toLocaleDateString() : ''
            }`}</Text>
            <Text style={classes.label}>{`Status: ${request.material[0].status}`}</Text>
          </View>
          <Button
            onPress={() =>
              navigation.dispatch(
                NavigationActions.navigate({
                  routeName: 'MaterialMobileDetail',
                  params: {
                    id: request._id
                  }
                })
              )
            }
            buttonStyle={taskCardStyle.buttonStyle}
            title={`${request.status === 'OPEN' ? 'Donate' : 'Closed'}`}
          />
        </Card>
      </TouchableOpacity>
    </>
  )
}
export default withNavigation(MaterialCard)
