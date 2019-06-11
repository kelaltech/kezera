import React from 'react'
import { Anchor, Block, Button, Content, Yoga } from 'gerami'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { ITaskResponse } from '../../../../../../../api/modules/task/task.apiv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'
import { IOrganResponse } from '../../../../../../../api/modules/organ/organ.apiv'
import { useAccountState } from '../../../../../app/stores/account/account-provider'

interface IRequestTask{
  request:IRequestResponse & { type: 'Task'; task: ITaskResponse }
  _id:string
  refresh:()=>void
}

export default function RequestDetailTask({request,_id,refresh}:IRequestTask) {
  const { loading, t } = useLocale(['request', 'task'])
  const {account}=useAccountState()
  const HandleApply=function(){
    Axios.put(`/api/request/task/${_id}/apply`,null)
      .then(()=>refresh())
      .catch(console.error)
  }

  return loading ||
    <Content>
      {request.status ==='CLOSED'?
        <>
          <Yoga maxCol={3}>
            <Block first last className={'font-L fg-primary center'}>
              <div className={'font-L fg-accent'}>
                <span className={'fg-blackish'}><FontAwesomeIcon icon={'users'}/> </span>
                {request.task.numberNeeded}
              </div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                Total Volunteers required
              </div>
            </Block>
            <Block first last className={'font-L fg-primary center'}>
              <Button primary={true} disabled>
                Task Closed
              </Button>
            </Block>
            <Block first last className={'font-L fg-primary center'}>
              <div className={'font-L fg-accent'}>
                <span className={'fg-blackish'}><FontAwesomeIcon icon={'users'}/> </span>
                {request.donations.length}
              </div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                Applied Volunteers
              </div>
            </Block>
          </Yoga>
        </>:
        <>
          <Yoga maxCol={3}>
            <Block first last className={'font-L fg-primary center'}>
              <div className={'font-L fg-accent'}>
                <span className={'fg-blackish'}><FontAwesomeIcon icon={'users'}/> </span>
                {request.task.numberNeeded}
              </div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                Total Volunteers required
              </div>
            </Block>
            <Block>
              <span className={'font-S fg-blackish light'}><FontAwesomeIcon icon={'calendar'}/> &nbsp; {new Date(request.task.startDate).toLocaleDateString()}  to  {new Date(request.task.endDate).toLocaleDateString()}</span>
              {account && account.role ==='VOLUNTEER'?
              <Block first last className={'font-L fg-primary center'}>
                {!(request.donations.length === request.task.numberNeeded)?
                <>
                  {!request.donations.map(value => value.volunteer).includes(account!._id)?
                    <Button primary={true} onClick={()=>HandleApply()}>
                      Apply
                    </Button>
                    :<Button className={'fg-white bg-accent'} onClick={()=>HandleApply()}>
                      Cancel
                    </Button>
                  }
                </>
                  :<>
                    <span className={'font-M fg-blackish light'}>
                      Closed
                    </span>
                  </>}
              </Block>:''}
              {account && account.role ==='ORGANIZATION'?
              <Block first last className={'font-L fg-primary center'}>
                <Anchor button to={'/'}>
                  View Applicants
                </Anchor>
              </Block>:''}
            </Block>
            <Block first last className={'font-L fg-primary center'}>
              <div className={'font-L fg-accent'}>
                <span className={'fg-blackish'}><FontAwesomeIcon icon={'users'}/> </span>
                {request.donations.length}
              </div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                Applied Volunteers
              </div>
            </Block>
          </Yoga>
        </>
      }
    </Content>
}

// export default RequestDetailTask
withRouter(RequestDetailTask as any)