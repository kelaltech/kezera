import React, { useEffect, useState } from 'react'
import { Content, Image } from 'gerami'
import './like-tab.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'

function LikeTab({ match }: RouteComponentProps<{ _id: string }>) {
  const [likes, setLikes] = useState([])

  useEffect(() => {
    axios
      .get(`/api/news/${match.params._id}/likes`)
      .then(data => {
        setLikes(data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  return (
    <Content className={'UserLike'}>
      <Table>
        <TableBody>
          {likes.map((like: any) => (
            <TableRow>
              <TableCell component="th" className={'like-container'} scope="row">
                <Image
                  src={`/api/account/get-photo/${like._id}`}
                  className="like-UserPic"
                />
                <span className={'UserName'}> {like.displayName} </span>
              </TableCell>
              {/*<TableCell align="right">{like.role}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Content>
  )
}

export default withRouter(LikeTab)
