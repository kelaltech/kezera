import React, { useEffect, useState } from 'react'

import { View, Text, ScrollView, RefreshControl } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import Axios from 'axios'
import RequestCard from '../../components/request-card/request-card'

function MaterialList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request']) //todo change language mapping

  const [materials, setMaterials] = useState([])
  const [refresh, setRefresh] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    listMaterial()
  }, [])
  const listMaterial = () => {
    setRefresh(true)
    Axios.get(`/api/request/list/bytype?type=Material`)
      .then(material => {
        setMaterials(material.data)
        setRefresh(false)
      })
      .catch(e => {
        setError(e)
      })
  }

  return (
    loading || (
      <>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={listMaterial} />
          }
        >
          {materials.map((m, k) => (
            <RequestCard key={k} {...m} />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(MaterialList)
