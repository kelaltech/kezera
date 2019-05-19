import React, { useEffect } from 'react'
import { Yoga, Title, Page, Block } from 'gerami'
import EventAttendedCard from '../../../../shared/components/event-attended-card/event-attended-card'
import { useEventDispatch, useEventState } from '../../../stores/events/events.provider'
import { GetAttended } from '../../../stores/events/events.action'
import useLocale from '../../../../shared/hooks/use-locale/use-locale'

export default function EventAttended(props: any) {
  let eventDispatch = useEventDispatch()
  let { t } = useLocale(['event'])
  let { volunteers } = useEventState()
  useEffect(() => {
    GetAttended(props.match.params._id, eventDispatch)
  }, [])
  return (
    <Page>
      <Block>
        <Title size={'XXL'}>
          {' '}
          {t`volunteers`} {t`attended`}
        </Title>
      </Block>
      {volunteers && volunteers.length > 0 ? (
        <Yoga maxCol={6}>
          {volunteers &&
            volunteers.map((u: any) => (
              <>
                <EventAttendedCard user={u} />
              </>
            ))}
        </Yoga>
      ) : (
        <Title size={'M'}> {t`no users attended`} </Title>
      )}
    </Page>
  )
}
