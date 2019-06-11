import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Image, Text, ScrollView, Switch } from 'react-native'
import { Button, Divider, Icon } from 'react-native-elements'
import Axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

const primary = '#3f51b5'

type Params = {
  id?: string
}

function FundMobileDetail({ navigation }: NavigationInjectedProps<Params>) {
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
    <>
      <ScrollView>
        <Image
          /*source={{ uri: `${baseUrl}/api/request/${id}/picture` }}*/
          source={require('../../../assets/images/event.jpg')}
          style={fundStyle.requestImage}
        />
        <View>
          <View style={fundStyle.fundDescription}>
            <Text>{/*{request.description}*/}rtsfdgfhjkjhlioyufhdchkjhgyugfdhcjh</Text>
          </View>
          <View>
            <View style={fundStyle.iconFields}>
              <Icon name={'calendar'} type={'font-awesome'} color={primary} size={18} />
              <Text>
                {/* &emsp;{new Date(request.startDate).toLocaleDateString()}*/} monday to
                fridat
              </Text>
            </View>
          </View>
          {/*
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {request.type == 'fundraising' && <FundraisingDetail request={request}/>}
              {request.type == 'material' && <MaterialMobileDetail request={request}/>}
              {request.type == 'task' && <TaskMobileDetail request={request}/>}
              {request.type == 'organ' && <OrganDonationDetail request={request}/>}
            </View>*/}
        </View>
        <Divider />
      </ScrollView>
    </>
  )
}
import { Dimensions, StyleSheet } from 'react-native'
const dimension = Dimensions.get('screen')

const fundStyle = StyleSheet.create({
  requestImage: {
    width: dimension.width,
    height: 150
  },
  requestTitle: {
    padding: 5,
    fontSize: 25,
    color: '#3f51b5'
  },
  iconFields: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  fundDescription: {
    fontWeight: '100',
    fontSize: 11,
    padding: 5
  },
  inlineBlock: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default withNavigation(FundMobileDetail)
