import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Image, Text, ScrollView, Switch } from 'react-native'
import { Button, Divider, Icon } from 'react-native-elements'
import Axios from 'axios'
import { baseUrl } from '../../../app/configs/setup-axios'
import { HandleLike } from '../../../layout-default/stores/events/events.action'
import { IVolunteerEventResponse } from '../../../../../api/modules/event/event.apiv'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import FundraisingDetail from '../../../shared/screens/fundraising-detail/fundraising-detail'
import MaterialMobileDetail from '../material-donation-list/material-detail'
import OrganDonationDetail from '../../../shared/screens/organ-donation-detail/organ-donation-detail'
import TaskMobileDetail from '../task-list/task-detail'

const primary = '#3f51b5'

interface IEventDetailProps {}

type Params = {
  id?: string
}

function RequestDetail({ navigation }: NavigationInjectedProps<Params>) {
  let id = navigation.getParam('id')
  const { loading, t } = useLocale(['request'])
  let [request, setRequest] = useState()
  let [volunteers, setVolunteers] = useState()
  let { account } = useAccountState()

  let getGoing = function() {
    Axios.get(`/api/request/list-request-volunteers/${id}`)
      .then((resp: any) => setVolunteers(resp.data))
      .catch(console.error)
  }

  let isGoing = function() {
    Axios.put(`/api/request/toggle-request-volunteer/${id}`)
      .then(resp => setRequest(resp.data))
      .catch()
  }
  let getRequest = function() {
    Axios.get(`/api/request/${id}`)
      .then(res => {
        setRequest(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getRequest()
    getGoing()
  }, [])

  return (
    loading ||
    (request ? (
      <>
        <ScrollView>
          <Image source={{ uri: `${baseUrl}/api/request/${id}/picture` }} />
          <View>
            <View>
              <Text>{request.description}</Text>
            </View>
            <View>
              <View>
                <Icon name={'calendar'} type={'font-awesome'} color={primary} size={18} />
                <Text> &emsp;{new Date(request.startDate).toLocaleDateString()} </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {request.type == 'fundraising' && <FundraisingDetail request={request} />}
              {request.type == 'material' && <MaterialMobileDetail request={request} />}
              {request.type == 'task' && <TaskMobileDetail request={request} />}
              {request.type == 'organ' && <OrganDonationDetail request={request} />}
            </View>
          </View>
          <Divider />
        </ScrollView>
      </>
    ) : (
      <Text> {t`request:request not found`} </Text>
    ))
  )
}

export default withNavigation(RequestDetail)
