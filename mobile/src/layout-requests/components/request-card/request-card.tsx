import React from 'react'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import TaskCard from '../task-card/task-card'
import OrganCard from '../organ-card/organ-card'
import FundraisingCard from '../fund-card/fundraising-card'
import MaterialCard from '../material-card/material-card'
import { Text } from 'react-native'
import classes from '../../../assets/styles/classes'

function RequestMobileCard(request: IRequestResponse) {
  switch (request.type) {
    case 'Organ':
      return <OrganCard request={request} />
    case 'Task':
      return <TaskCard request={request} />
    case 'Fundraising':
      return <FundraisingCard request={request} />
    case 'Material':
      return <MaterialCard request={request} />
    default:
      return (
        <>
          <Text style={classes.label}> Invalid Card Type</Text>
        </>
      )
  }
}
export default RequestMobileCard
