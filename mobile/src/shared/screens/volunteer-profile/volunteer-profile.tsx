import React, { useEffect, useState } from 'react'
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import Axios from 'axios'

import styles from './volunteer-profile-styles'
import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'
import { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'
import classes from '../../../assets/styles/classes'
import { Divider, Icon, Image } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'
import values from '../../../assets/styles/values'
import { ICertificateResponse } from '../../../../../api/modules/certificate/certificate.apiv'

function VolunteerProfile({
  navigation
}: NavigationInjectedProps<{ volunteer_id: string }>) {
  const { loading, t } = useLocale(['volunteer', 'certificate'])

  const volunteer_id = navigation.getParam('volunteer_id')

  const [ready, setReady] = useState(false)

  const [volunteer, setVolunteer] = useState<IVolunteerResponse>()
  const [certificates, setCertificates] = useState<ICertificateResponse[]>([])

  const reload = (): void => {
    setReady(false)
    Axios.get<IVolunteerResponse>(`/api/volunteer/get/${volunteer_id}`)
      .then(response => setVolunteer(response.data))
      .then(() =>
        Axios.get<ICertificateResponse[]>(`/api/certificate/list/${volunteer_id}`)
      )
      .then(response => setCertificates(response.data))
      .catch(e =>
        Alert.alert(
          t`error`,
          e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
      )
      .finally(() => setReady(true))
  }
  useEffect(() => {
    reload()
  }, [volunteer_id])

  return (
    loading || (
      <>
        <Header
          title={
            t`volunteer:volunteer` +
            (!volunteer ? '' : ' ' + volunteer.account.displayName.split(' ')[0])
          }
          showBack
        />

        <ScrollView
          style={classes.grow}
          refreshControl={
            <RefreshControl
              onRefresh={reload}
              refreshing={!ready}
              colors={[values.color.primary, values.color.secondary]}
            />
          }
        >
          {volunteer && (
            <>
              <Image
                source={{ uri: `${baseUrl}${volunteer.account.photoUri}` }}
                style={styles.photo}
              />

              <TouchableOpacity onPress={reload}>
                <Text style={styles.displayName}>{volunteer.account.displayName}</Text>
              </TouchableOpacity>
              <Divider style={classes.marginHorizontal} />

              <Text style={styles.titles}>{t`volunteer:activities`}</Text>

              <View style={styles.fields}>
                <View style={styles.iconContainers}>
                  <Icon name={'certificate'} type={'font-awesome'} />
                </View>
                <Text style={styles.labels}>{t`certificates-achieved`}:</Text>
                <Text style={styles.values}>
                  {volunteer.portfolio.certificate.length || t`n/a`}
                </Text>
              </View>
              <View style={styles.fields}>
                <View style={styles.iconContainers}>
                  <Icon name={'event'} />
                </View>
                <Text style={styles.labels}>{t`events-attended`}:</Text>
                <Text style={styles.values}>
                  {volunteer.portfolio.events.length || t`n-a`}
                </Text>
              </View>
              <View style={styles.fields}>
                <View style={styles.iconContainers}>
                  <Icon name={'tasks'} type={'font-awesome'} />
                </View>
                <Text style={styles.labels}>{t`tasks-accomplished`}:</Text>
                <Text style={styles.values}>
                  {volunteer.portfolio.tasks.length || t`n-a`}
                </Text>
              </View>
              <View style={styles.fields}>
                <View style={styles.iconContainers}>
                  <Icon name={'toolbox'} type={'material-community'} />
                </View>
                <Text style={styles.labels}>{t`materials-donated`}:</Text>
                <Text style={styles.values}>
                  {volunteer.portfolio.material.length || t`n-a`}
                </Text>
              </View>
              <View style={styles.fields}>
                <View style={styles.iconContainers}>
                  <Icon name={'wallet'} type={'antdesign'} />
                </View>
                <Text style={styles.labels}>{t`money-raised-etb`}:</Text>
                <Text style={styles.values}>
                  {volunteer.portfolio.money.length || t`n-a`}
                </Text>
              </View>
              <View style={styles.fields}>
                <View style={styles.iconContainers}>
                  <Icon name={'heart'} type={'antdesign'} />
                </View>
                <Text style={styles.labels}>{t`organs-pledged`}:</Text>
                <Text style={styles.values}>
                  {volunteer.portfolio.organ.length || t`n-a`}
                </Text>
              </View>

              {!certificates.length ? null : (
                <>
                  <Text style={styles.titles}>{t`certificate:certificates`}</Text>

                  {certificates.map(certificate => (
                    <Image
                      key={certificate._id}
                      source={{ uri: `${baseUrl}${certificate.printUri}` }}
                      style={styles.certificates}
                    />
                  ))}
                </>
              )}

              <View style={{ height: values.space.big }} />
            </>
          )}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(VolunteerProfile)
