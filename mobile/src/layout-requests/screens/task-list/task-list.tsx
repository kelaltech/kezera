import React from 'react'

import { View, Text } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { ITaskType } from '../../../../../api/models/task/task.model'
import RequestCard from '../../components/request-card/request-card'
function TaskList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request'])

  const request: IRequestResponse = {
    _at: 1560241733690,
    _by: 'Kelal',
    _id: 'id',
    coverUri: `${require('../../../assets/images/event.jpg')}`,
    description: 'description for request',
    expires: 1560241773690,
    fileUris: ['file1', 'file2'],
    name: 'title for the request!',
    status: 'OPEN',
    type: 'Fundraising',
    donations: [
      { _at: 1560241773690, volunteer_id: 'id', data: '110000' },
      { _at: 1560241773690, volunteer_id: 'id', data: '2000000' },
      { _at: 1560241773690, volunteer_id: 'id', data: '1000' }
    ],
    fundraising: {
      _id: 'id',
      _at: 1560241733690,
      target: 10000000
    }
  }
  return (
    loading || (
      <>
        <View>
          <RequestCard {...request} />
        </View>
      </>
    )
  )
}

export default withNavigation(TaskList)
