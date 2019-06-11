import React from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { organStyle } from './organ-card-style'
import { Button, Card } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'
import { taskCardStyle } from '../task-card/task-card-style'
import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
import { IRequestType } from '../../../../../api/models/request/request.model'
import { IOrganResponse } from '../../../../../api/modules/organ/organ.apiv'
function OrganCard({
  navigation,
  request
}: NavigationInjectedProps & {
  request: IRequestResponse & {
    type: IRequestType
    organ: any
  }
}) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          navigation.dispatch(
            NavigationActions.navigate({
              routeName: 'TaskMobileDetail',
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
            <Text style={classes.label}>{`Type: ${request.organ.organType}`}</Text>
            <Text style={classes.label}>{`Quantity: ${request.organ.quantity}`}</Text>
          </View>
          <View style={taskCardStyle.dateContainer}>
            <Text style={classes.label}>{`Expires: ${
              request.expires ? new Date(request.expires).toLocaleDateString() : ''
            }`}</Text>
          </View>
          <Button
            onPress={() =>
              navigation.dispatch(
                NavigationActions.navigate({
                  routeName: 'OrganMobileDetail',
                  params: {
                    id: request._id
                  }
                })
              )
            }
            buttonStyle={taskCardStyle.buttonStyle}
            title={`${request.status === 'OPEN' ? 'Pledge' : 'Closed'}`}
          />
        </Card>
      </TouchableOpacity>
    </>
  )
}

export default withNavigation(OrganCard)
