import React, { useState, useEffect } from 'react'
import { Content, Image, Title } from 'gerami'
import './interested.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import axios from 'axios'

export default function Interested(props: any) {
  let [user, setUser] = useState([])
  let FetchInterested = function() {
    axios
      .get(`/api/event/${props.id}/interested`)
      .then((resp: any) => setUser(resp.data))
      .catch(console.error)
  }
  useEffect(() => {
    FetchInterested()
  }, [])
  return (
    <Content className={'UserInterested'}>
      {user.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone no.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.length >= 0 ? (
              <>
                {user.map((user: any) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <label>
                        <Image
                          src={`/api/account/get-photo/${user._id}`}
                          className="UserPic inline-block middle"
                        />
                        &emsp;
                        <span className={'UserName'}>
                          {' '}
                          <span className="inline-block middle">
                            {user.displayName}
                          </span>{' '}
                        </span>
                      </label>
                    </TableCell>
                    <TableCell align="right">{user.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell>nobody's interested</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <Title size={'L'}> No volunteers interested </Title>
      )}
    </Content>
  )
}
