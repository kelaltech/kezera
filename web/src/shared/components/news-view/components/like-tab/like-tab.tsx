import React, { useEffect, useState } from 'react'
import { Content, Image } from 'gerami'
import './like-tab.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'

function LikeTab({ match }: RouteComponentProps<{ _id: string }>) {
  const [likes, setLikes] = useState([])

  useEffect(() => {
    axios
      .get(`/api/news/${match.params._id}/likes`)
      .then(data => {
        console.log('\nFrom Like\n', data.data)
        setLikes(data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  return (
    <Content className={'UserLike'}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {likes.map((like: any) => (
            <TableRow>
              <TableCell component="th" scope="row">
                <Image
                  src={
                    'http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg'
                  }
                  className="UserPic"
                />
                <span className={'UserName'}> {like.displayName} </span>
              </TableCell>
              <TableCell align="right">{like.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Content>
  )
}

export default withRouter(LikeTab)
