import React, { useEffect, useState } from 'react'
import { NavigationActions, NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Image, Text, ScrollView, Switch, Button } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import Axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

import { Dimensions, StyleSheet } from 'react-native'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import classes from '../../../assets/styles/classes'
import { baseUrl } from '../../../app/configs/setup-axios'
const dimension = Dimensions.get('screen')

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
    loading ||
    (request ? (
      <>
        <ScrollView>
          <Image
            source={{ uri: `${baseUrl}${request.coverUri}` }}
            style={fundStyle.requestImage}
          />
          <View style={fundStyle.requestTitle}>
            <Text style={fundStyle.requestTitle}>
              {request.name}
            </Text>
          </View>
          <Divider />
          <View>
            <View style={fundStyle.fundDescription}>
              <Text style={fundStyle.fundDescription}>{request.description}</Text>
            </View>
          </View>
          <View style={fundStyle.inlineBlock}>
            <Text style={fundStyle.fundAmountTitle}>Requested Amount: </Text>
            <Text style={fundStyle.fundAmount}>{request.fundraising.amount} ETB</Text>
          </View>

          <View>
            <Button title={'donate'} onPress={() => {}}>
              Donate
            </Button>
          </View>
          <Divider />

          <View style={fundStyle.inlineBlock}>
            <Text style={fundStyle.byTitle}>Requested By</Text>
            <Text style={classes.link} onPress={() => navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'OrganizationDetail',
                params: {
                  id: request._by._id
                }
              })
            )}>{request._by.name}</Text>
          </View>
        </ScrollView>
      </>
    ) : (
      <View>
        <Text>No Detail Available</Text>
      </View>
    ))
  )
}

const fundStyle = StyleSheet.create({
  requestImage: {
    width: dimension.width,
    height: 250
  },
  button: {
    alignContent: 'center'
  },
  byTitle: {
    color: '#3f51b5',
    fontSize: 18
  },
  fundAmountTitle: {
    padding: 5,
    fontSize: 18,
    color: '#3f51b5'
  },
  fundAmount: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 18
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
    fontSize: 14,
    padding: 10
  },
  inlineBlock: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default withNavigation(FundMobileDetail)
