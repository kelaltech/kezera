import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { View } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import TaskMobileCard from '../../components/task-card/task-card'
import OrganMobileCard from '../../components/organ-card/organ-card'

export default function OrganMobileList() {
  const [organs, ssetOrgans] = useState<any[]>([])
  const { loading, t } = useLocale(['request'])

  let { account } = useAccountState()
  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(res => {
        ssetOrgans(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    loading ||
    (!organs ? null : (
      <View>
        {organs.map((organ, i) => (
          <OrganMobileCard request={organ} key={i} />
        ))}
      </View>
    ))
  )
}
