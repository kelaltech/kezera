import React, { useEffect, useState } from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import {
  View,
  Picker,
  Image,
  Text,
  ScrollView,
  Switch,
  PickerItem,
  Alert
} from 'react-native'
import { Divider, Button, Overlay, Input, Icon } from 'react-native-elements'
import Axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Style } from '../detail-style'
import { Dimensions } from 'react-native'
import { baseUrl } from '../../../app/configs/setup-axios'
import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
import { useVolunteerState } from '../../../app/stores/volunteer/volunteer-provider'

function MaterialMobileDetail({ navigation }: NavigationInjectedProps) {
  let id = navigation.getParam('id')
  const { loading, t } = useLocale(['request'])
  let [request, setRequest] = useState()
  const { volunteer } = useVolunteerState()
  const [doner, setDoner] = useState()
  const [overlay, setOverlay] = useState(false)
  const [key, setKey] = useState()

  useEffect(() => {
    getRequest()
  }, [])

  let getRequest = function() {
    Axios.get(`/api/request/${id}`)
      .then(res => {
        setDoner(
          res.data.donations[
            res.data.donations
              .map((i: any) => i.volunteer)
              .toString()
              .indexOf(volunteer!._id.toString())
          ]
        )
        setRequest(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleDonate = () => {
    Axios.put(`api/request/material/donation/add`, {
      request_id: request.id,
      volunteer_id: volunteer!._id
    })
      .then(data => setDoner(data.data))
      .catch(e => console.log(e))
  }

  const handleChange = (e: any) => {
    setKey(e)
  }
  const handleConfirmation = () => {
    if (
      key ===
      (doner
        ? doner.data
        : request.donations[
            request.donations.map((i: any) => i.volunteer).indexOf(volunteer!._id)
          ].data)
    ) {
      Axios.put('/api/request/material/donor/approval', {
        request_id: request._id,
        volunteer_id: volunteer!._id
      })
        .then(data => data.data)
        .then((vol: any) => {
          setDoner(vol)
          if (vol.approved) {
            setOverlay(false)
            Alert.alert('Info', 'Successfuly Confirmed')
          } else {
            Alert.alert('Error', 'Icorrect code')
          }
        })
        .catch(e => {
          Alert.alert('Error', `${e.message}`)
        })
    }
  }
  return (
    loading ||
    (request ? (
      <>
        <ScrollView>
          <Image
            source={{ uri: `${baseUrl}${request.coverUri}` }}
            style={Style.requestImage}
          />
          <View>
            <Text style={Style.requestTitle}>{request.name}</Text>
          </View>
          <View>
            {request.donations.map((i: any) => i.volunteer).includes(volunteer!._id) ? (
              <Button
                containerStyle={{
                  marginHorizontal: values.space.normal
                }}
                disabled={doner ? doner.approved : false}
                title={'Confirm pickup'}
                onPress={() => setOverlay(true)}
              />
            ) : (
              <Button
                containerStyle={{
                  marginHorizontal: values.space.normal
                }}
                onPress={handleDonate}
                title={'donate'}
              />
            )}
            <Overlay
              isVisible={overlay}
              animated
              animationType={'fade'}
              onBackdropPress={() => setOverlay(false)}
              overlayStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                height: Dimensions.get('screen').height / 2
              }}
            >
              <View
                style={{
                  alignSelf: 'center'
                }}
              >
                <Text style={{ ...classes.head2, textAlign: 'center' }}>
                  To confirm pickup ask the pickup guy to to give you a 6 digit code
                </Text>
                <View style={{ flexDirection: 'row', ...classes.marginVerticalSmall }}>
                  <Input
                    onChangeText={e => handleChange(e)}
                    leftIcon={
                      <Icon name="lock" size={24} color={`${values.color.blackish}`} />
                    }
                    shake
                    inputContainerStyle={{ flexGrow: 1 }}
                    placeholder={'confirmation key'}
                  />
                </View>
                <View style={{ flexDirection: 'row', ...classes.marginVerticalSmall }}>
                  <Button
                    containerStyle={{ flexGrow: 1 }}
                    onPress={handleConfirmation}
                    title={'Confirm'}
                  />
                </View>
              </View>
            </Overlay>
          </View>

          <Divider />

          <View>
            <View style={Style.description}>
              <Text style={Style.description}>{request.description}</Text>
            </View>
          </View>

          <View style={Style.inlineBlock}>
            <Text style={classes.label}>Requested Material: </Text>
            <Text style={classes.label}>{request.material[0].materialType}</Text>
          </View>

          <View style={Style.inlineBlock}>
            <Text style={classes.label}>Materials needed </Text>
            <Text style={classes.label}>{request.material[0].quantity}</Text>
          </View>

          <Divider />

          <View style={Style.inlineBlock}>
            <Text style={Style.byTitle}>Requested By </Text>
            <Text
              style={classes.link}
              onPress={() =>
                navigation.dispatch(
                  NavigationActions.navigate({
                    routeName: 'OrganizationDetail',
                    params: {
                      id: request._by._id
                    }
                  })
                )
              }
            >
              {request._by.account.displayName}
            </Text>
          </View>
        </ScrollView>
      </>
    ) : (
      <View>
        <Text>No Detail Available!</Text>
      </View>
    ))
  )
}

export default withNavigation(MaterialMobileDetail)
