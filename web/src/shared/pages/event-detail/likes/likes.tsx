import React, { useEffect, useState } from 'react'
import { Content, Image } from 'gerami'
import './likes.scss'
import Chip from '@material-ui/core/Chip'
import { Avatar } from '@material-ui/core'
import { Schema } from 'mongoose'
import axios from 'axios'

const users = [
  {
    Name: 'Anteneh Ashenafi',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwVEXF33zeB0S-b9-BYeb14amnZW2GcCOOY3RlAqe6JC1-rjmw'
  },
  {
    Name: 'Pompidou',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwVEXF33zeB0S-b9-BYeb14amnZW2GcCOOY3RlAqe6JC1-rjmw'
  },
  {
    Name: 'Natnael mesfin',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwVEXF33zeB0S-b9-BYeb14amnZW2GcCOOY3RlAqe6JC1-rjmw'
  }
]

export default function Likes(props: any) {
  let [user, setUser] = useState([])
  let FetchLikes = function(id: Schema.Types.ObjectId) {
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
      {user.length >= 0 ? (
        <>
          {user.map((user: any) => (
            <Chip
              className={'LikeChip'}
              avatar={<Avatar alt="Natacha" src={users[0].Image} />}
              label={user.displayName}
              variant={'outlined'}
            />
          ))}
        </>
      ) : (
        ''
      )}
    </Content>
  )
}
