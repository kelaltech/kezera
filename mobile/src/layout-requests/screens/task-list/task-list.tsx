import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { View } from 'react-native'
import RequestMobileCard from '../../components/request-card/request-card'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([])
  const { loading, t } = useLocale(['request'])

  let { account } = useAccountState()
  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(res => {
        setTasks(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    loading ||
    (!tasks ? null : (
      <View>
        {tasks.map((task, i) => (
          <RequestMobileCard request={task} key={i} />
        ))}
      </View>
    ))
  )
}
