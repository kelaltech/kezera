import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { View } from 'react-native'
import RequestMobileCard from '../../components/request-card/request-card'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import TaskMobileCard from '../../components/task-card/task-card'
import MaterialMobileCard from '../../components/material-card/material-card'

export default function MaterialMobileList() {
  const [materials, setMaterials] = useState<any[]>([])
  const { loading, t } = useLocale(['request'])

  let { account } = useAccountState()
  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(res => {
        setMaterials(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    loading ||
    (!materials ? null : (
      <View>
        {materials.map((material, i) => (
          <MaterialMobileCard request={material} key={i} />
        ))}
      </View>
    ))
  )
}
