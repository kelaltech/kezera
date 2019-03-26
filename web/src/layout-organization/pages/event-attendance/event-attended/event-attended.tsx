import React, { useEffect, useState } from 'react'
import { Yoga, Title, Page, Block } from 'gerami'
import EventAttendedCard from '../../../../shared/components/event-attended-card/event-attended-card'
import axios from 'axios'

export default function EventAttended(props: any) {
  let [user, setUser] = useState([])
  useEffect(() => {
    axios
      .get(`/api/event/${props.match.params._id}/attended`)
      .then((resp: any) => setUser(resp.data))
      .catch()
  }, [])
  return (
    <Page>
      <Block className="center">
        <Title size={'3XL'}> Users who attended the event </Title>
      </Block>
      {user.length >= 0 ? (
        <>
          {user.map((u: any) => (
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
