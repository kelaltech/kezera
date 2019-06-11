import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { ScrollView, View, Text, RefreshControl } from 'react-native'
import Header from '../../../shared/components/header/header'
import useLocale from '../../hooks/use-locale/use-locale'
import Axios from 'axios'
function RequestSearchList({ navigation }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['volunteer'])
  const [request, setRequest] = useState([])
  const [error, setError] = useState<any>()
  const term = navigation.getParam('term')
  const [refresh, setResfresh] = useState<boolean>(false)

  useEffect(() => {
    searchRequest()
  }, [])

  const searchRequest = () => {
    setResfresh(true)
    Axios.get(`/api/request/search?term=${term}`)
      .then(data => data.data)
      .then(e => {
        setRequest(e)
        setResfresh(false)
      })
      .catch(e => {
        setError(e)
      })
  }
  return (
    loading || (
      <>
        <Header showBack title={'request search list'} />
        <ScrollView
          style={{
            marginBottom: 10
          }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={searchRequest} />
          }
        >
          {request.map((r, k) => (
            <View>
              <Text>Request card</Text>
            </View>
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(RequestSearchList)
