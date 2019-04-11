import React, { useEffect } from 'react'
import { Yoga, Title, Page, Block } from 'gerami'
import EventAttendedCard from '../../../../shared/components/event-attended-card/event-attended-card'
import { useEventDispatch, useEventState } from '../../../stores/events/events.provider'
import { GetAttended } from '../../../stores/events/events.action'

export default function EventAttended(props: any) {
  let eventDispatch = useEventDispatch()
  let { volunteers } = useEventState()
  useEffect(() => {
    GetAttended(props.match.params._id, eventDispatch)
  }, [])
  return (
    <Page>
      <Block className="center">
        <Title size={'3XL'}> Users who attended the event </Title>
      </Block>
      {volunteers && volunteers.length >= 0 ? (
        <>
          {volunteers &&
            volunteers.map((u: any) => (
              <>
                <Yoga maxCol={6}>
                  <EventAttendedCard user={u} />
                </Yoga>
              </>
            ))}
        </>
      ) : (
        <Title size={'3XL'}> No users attended </Title>
      )}
    </Page>
  )
}
