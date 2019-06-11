import React from 'react'
import { Content } from 'gerami'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { ITaskResponse } from '../../../../../../../api/modules/task/task.apiv'

function RequestDetailTask({
  request
}: {
  request: IRequestResponse & { type: 'Task'; task: ITaskResponse }
}) {
  const { loading, t } = useLocale(['request', 'task'])

  return loading || <Content>todo</Content>
}

export default RequestDetailTask
