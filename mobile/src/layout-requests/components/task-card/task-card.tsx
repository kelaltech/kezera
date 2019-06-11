import React from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { Button, Card, PricingCard } from 'react-native-elements'
import classes from '../../../assets/styles/classes'
import { ITaskResponse } from '../../../../../api/modules/task/task.apiv'
import { taskCardStyle } from './task-card-style'
import values from '../../../assets/styles/values'
import { baseUrl } from '../../../app/configs/setup-axios'
function TaskCard({
  request,
  navigation
}: NavigationInjectedProps & {
  request: IRequestResponse & { type: 'Task'; task: ITaskResponse }
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
            <Text style={classes.label}>{`Start: ${new Date(
              request.task.startDate
            ).toLocaleDateString()}`}</Text>
            <Text style={classes.label}>{`End: ${new Date(
              request.task.endDate
            ).toLocaleDateString()}`}</Text>
          </View>
          <View>
            <View style={taskCardStyle.progressTracker}>
              <View
                style={{
                  width:
                    (Dimensions.get('screen').width * request.donations.length) /
                    request.task.numberNeeded,
                  height: values.space.small,
                  backgroundColor: values.color.secondary,
                  borderRadius: values.space.small
                }}
              />
              <Text>
                {`${request.donations.length} volunteers out-of ${
                  request.task.numberNeeded
                }`}{' '}
              </Text>
            </View>
          </View>
          <Button
            buttonStyle={taskCardStyle.buttonStyle}
            title={`${request.status === 'OPEN' ? 'Active' : 'Closed'}`}
          />
        </Card>
      </TouchableOpacity>
    </>
  )
}

export default withNavigation(TaskCard)
