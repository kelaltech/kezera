import React, { useEffect, useState } from 'react'
import { Content, Image, Title } from 'gerami'
import './likes.scss'
import Chip from '@material-ui/core/Chip'
import { Avatar } from '@material-ui/core'
import axios from 'axios'

export default function Likes(props: any) {
  let [user, setUser] = useState([])
  let FetchLikes = function(id: string) {
    axios
      .get(`/api/event/${id}/likes`)
      .then(resp => setUser(resp.data))
      .catch(console.error)
  }
  useEffect(() => {
    FetchLikes(props.id)
  }, [])
  return (
    <Content className={'UserLike'}>
      {user.length > 0 ? (
        <>
          {user.map((user: any) => (
            <Chip
              className={'LikeChip'}
              avatar={<Avatar alt="Natacha" src={`/api/account/get-photo/${user._id}`} />}
              label={user.displayName}
              variant={'outlined'}
            />
          ))}
        </>
      ) : (
        <Title size={'L'}> No volunteers liked this event </Title>
      )}
    </Content>
  )
}
