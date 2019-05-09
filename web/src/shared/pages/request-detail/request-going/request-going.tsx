import React, { useState, useEffect } from 'react'
import { Content, Image, Title } from 'gerami'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import axios from 'axios'

export default function RequestGoing(props: any) {
  let [user, setUser] = useState([])
  let getGoing = function() {
    axios
      .get(`/api/request/${props.id}/going`)
      .then((resp: any) => setUser(resp.data))
      .catch(console.error)
  }
  useEffect(() => {
    getGoing()
  }, [])
  return (
    <Content className={'UserInterested'}>
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
    </Content>
  )
}
