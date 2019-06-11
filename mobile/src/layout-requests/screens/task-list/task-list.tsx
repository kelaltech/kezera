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
    description: 'description for request ',
    expires: 1560241773690,
    fileUris: ['file1', 'file2'],
    name: 'title for the request!',
    status: 'OPEN',
    type: 'Material',
    donations: [
      { _at: 1560241773690, volunteer_id: 'id' },
      { _at: 1560241773690, volunteer_id: 'id' },
      { _at: 1560241773690, volunteer_id: 'id' }
    ],
    material: {
      _id: 'id',
      _at: 1560241733690,
      endDate: 1560241773690,
      numberNeeded: 10,
      request: 'id',
      startDate: 1560241773690,
      type: 'Art & Culture' as ITaskType
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
