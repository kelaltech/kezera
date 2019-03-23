import React from 'react'
import { Content, Image } from 'gerami'
import './likes.scss'
import Chip from '@material-ui/core/Chip'
import { Avatar } from '@material-ui/core'

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
export default function Likes() {
  return (
    <Content className={'UserLike'}>
      {users.map(user => (
        <Chip
          className={'LikeChip'}
          avatar={<Avatar alt="Natacha" src={user.Image} />}
          label={user.Name}
          variant={'outlined'}
        />
      ))}
    </Content>
  )
}
