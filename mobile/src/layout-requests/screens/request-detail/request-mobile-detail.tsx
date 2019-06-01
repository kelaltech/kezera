import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { View } from 'react-native'
import TaskMobileDetail from '../task-list/task-detail'
import MaterialMobileDetail from '../material-donation-list/material-detail'
import OrganMobileDetail from '../organ-donation-list/organ-detail'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import OrganizationCard from '../../../../../web/src/shared/components/organization-card/organization-card'
import FundraisingDetail from '../../../shared/screens/fundraising-detail/fundraising-detail'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

type param = {
  id: string
}

function RequestDetail({ navigation }: NavigationInjectedProps<param>) {
  const [request, setRequest] = useState<any>()
  const { loading, t } = useLocale(['request'])
  let id = navigation.getParam('id')

  let [volunteers, setVolunteers] = useState<any[]>([])
  let getGoing = function() {
    axios
      .get(`/api/request/list-request-volunteers/${id}`)
      .then((resp: any) => setVolunteers(resp.data))
      .catch(console.error)
  }

  let isGoing = function() {
    axios
      .put(`/api/request/toggle-request-volunteer/${id}`)
      .then(resp => setRequest(resp.data))
      .catch()
  }
  let getRequest = function() {
    axios
      .get(`/api/request/${id}`)
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
    (!request ? null : (
      <View>
        {request.name}
        {request.type} | {t`request:posted-on`}{' '}
        {new Date(request._at).toDateString().substr(3)}
        {request._by.displayName}
        <View>
          <View>
            {request.description}
            <View>
              {request.type === 'Fundraising' && <FundraisingDetail />}
              {request.type === 'Task' && <TaskMobileDetail request={request} />}
              {request.type === 'Material' && <MaterialMobileDetail request={request} />}
              {request.type === 'Organ' && <OrganMobileDetail request={request} />}
            </View>
          </View>
        </View>
        <View>
          <label className="flex padding-small">
            <View>
              {new Date(request.startDate).toDateString().substr(3)} -{' '}
              {new Date(request.endDate).toDateString().substr(3)}
            </View>
          </label>
        </View>
        <hr />
        <View>
          <div className={'fg-blackish padding-bottom-normal'}>
            {t`request:requested-by`}:{' '}
          </div>
          <OrganizationCard organization={request._by} />
        </View>
        <View>
          <h6>{t`request:see-who's-going`}</h6>
        </View>
      </View>
    ))
  )
}
export default withNavigation(RequestDetail)
