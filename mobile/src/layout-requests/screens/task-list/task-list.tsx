import React, { useEffect, useState } from 'react'

import { ScrollView, RefreshControl } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import RequestCard from '../../components/request-card/request-card'
import Axios from 'axios'
function TaskList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request'])
  const [tasks, setTasks] = useState([])
  const [refresh, setRefresh] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    listTask()
  }, [])

  const listTask = () => {
    setRefresh(true)
    Axios.get(`/api/request/list/bytype?type=Task`)
      .then(tasks => {
        setTasks(tasks.data)
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
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={listTask} />}
        >
          {tasks.map((t, k) => (
            <RequestCard key={k} {...t} />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(TaskList)
