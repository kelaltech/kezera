import React from 'react'
import { Block, Button, Content, Yoga } from 'gerami'
import Axios from 'axios'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { IMaterialResponse } from '../../../../../../../api/modules/material/material.apiv'
import { useAccountState } from '../../../../../app/stores/account/account-provider'
import { useVolunteerState } from '../../../../../layout-volunteer/stores/volunteer/volunteer-provider'
import { addActivity } from '../../../../methods/methods'

function RequestDetailMaterial({
  request,
  refresh
}: {
  request: IRequestResponse & { type: 'Material'; material: IMaterialResponse[] }
  refresh: () => void
}) {
  const { loading, t } = useLocale(['request', 'material-donation'])

  const { account } = useAccountState()
  const { volunteer } = useVolunteerState()

  const handleDonate = (): void => {
    const body = {
      request_id: request._id,
      volunteer_id: volunteer!._id
    }

    Axios.put<any>(`/api/request/material/donation/add`, body, { withCredentials: true })
      .then(() => {
        refresh()
        addActivity(
          'You are interseted for donating a material',
          `/request/${request._id}`
        )
      })
      .catch(e => alert(e.message))
  }

  return (
    loading || (
      <Content>
        {request.status === 'CLOSED' ? (
          <Block first last className={'font-L fg-primary center'}>
            {request.donations.length} out of ({request.material[0].quantity}) targeted
            materials have been donated!
          </Block>
        ) : (
          <Yoga maxCol={3}>
            <Block first last className={'center middle'}>
              <div className={'font-L fg-accent'}>{request.material[0].quantity}</div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                TARGETED MATERIALS
              </div>
            </Block>

            <Block first last className={'center middle'}>
              <span className={'fg-primary font-L'}>
                {request.material[0].materialType.replace(/_/g, ' ')}
              </span>
              {account && account.role === 'ORGANIZATION' ? (
                <></>
              ) : request.donations.length < request.donations.length ? (
                <div className={'margin-top-normal fg-primary font-L light'}>
                  Target Achieved!
                </div>
              ) : (
                <>
                  {volunteer && (
                    <div className={'margin-top-normal font-S'}>
                      You have donated{' '}
                      {
                        request.donations.filter(d => d.volunteer === volunteer._id)
                          .length
                      }{' '}
                      times before.
                    </div>
                  )}

                  <div className={'margin-top-big'}>
                    <Button onClick={handleDonate} primary>
                      Donate Now!
                    </Button>
                  </div>
                </>
              )}
            </Block>

            <Block first last className={'center middle'}>
              <div className={'font-L fg-accent'}>{request.donations.length}</div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                <span className={'fg-accent bold'}>
                  {Math.round(
                    (request.donations.length / request.material[0].quantity) * 100
                  )}
                  %
                </span>{' '}
                DONATIONS SO FAR
              </div>
            </Block>
          </Yoga>
        )}
      </Content>
    )
  )
}

export default RequestDetailMaterial
