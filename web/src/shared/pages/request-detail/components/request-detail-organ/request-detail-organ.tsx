import React from 'react'
import { Block, Button, Content, Yoga } from 'gerami'
import Axios from 'axios'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { IOrganResponse } from '../../../../../../../api/modules/organ/organ.apiv'
import { useAccountState } from '../../../../../app/stores/account/account-provider'
import { useVolunteerState } from '../../../../../layout-volunteer/stores/volunteer/volunteer-provider'
import { addActivity } from '../../../../methods/methods'

function RequestDetailOrgan({
  request,
  onUpdate
}: {
  request: IRequestResponse & { type: 'Organ'; organ: IOrganResponse }
  onUpdate: (request: IRequestResponse) => void
}) {
  const { loading, t } = useLocale(['request', 'organ-donation'])

  const { account } = useAccountState()
  const { volunteer } = useVolunteerState()

  const handlePledge = () => {
    Axios.post<IRequestResponse>(`/api/request/pledge-organ/${request._id}`, {
      withCredentials: true
    })
      .then(response => {
        onUpdate && onUpdate(response.data)
        addActivity('You are interseted for pledging  an organ', `/request/${request._id}`)
      })
      .catch(e => alert(e.message))
  }

  return (
    loading || (
      <Content>
        {request.status === 'CLOSED' ? (
          <Block first last className={'font-L fg-primary center'}>
            {request.donations.length} (
            {request.organ.organType.replace(/_/g, ' ').toLowerCase()}) organs pledged!
          </Block>
        ) : (
          <Yoga maxCol={3}>
            <Block first last className={'center middle'}>
              <div className={'font-L fg-accent'}>{request.organ.quantity}</div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                TARGETED PLEDGES
              </div>
            </Block>

            <Block first last className={'center middle'}>
              <span className={'fg-primary font-L'}>
                {request.organ.organType.replace(/_/g, ' ')}
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
                      You have pledged{' '}
                      {
                        request.donations.filter(d => d.volunteer === volunteer._id)
                          .length
                      }{' '}
                      times before.
                    </div>
                  )}

                  <div className={'margin-top-big'}>
                    <Button onClick={handlePledge} primary>
                      Pledge Now!
                    </Button>
                  </div>
                </>
              )}
            </Block>

            <Block first last className={'center middle'}>
              <div className={'font-L fg-accent'}>{request.donations.length}</div>
              <div className={'font-S fg-blackish light margin-top-normal'}>
                <span className={'fg-accent bold'}>
                  {Math.round((request.donations.length / request.organ.quantity) * 100)}%
                </span>{' '}
                PLEDGES SO FAR
              </div>
            </Block>
          </Yoga>
        )}
      </Content>
    )
  )
}

export default RequestDetailOrgan
