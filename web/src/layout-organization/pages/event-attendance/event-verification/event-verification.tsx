import React, { useState, useEffect } from 'react'
import './event-verification.scss'
import { CheckBox, Page, Block, Title, Button } from 'gerami'
import Table, {
  TableHeader,
  TableCell,
  TableBody,
  TableRow
} from '../../../../shared/components/Table/Table'
import axios from 'axios'

export default function EventVerification(props: any) {
  let [all, setAll] = useState(false)
  let user: any = []
  let [volunteer, setVolunteer] = useState([])
  let handleSelect = function(id: any) {
    if (!user.includes(id)) user.push(id)
    else user.splice(user.indexOf(id), 1)
    console.log(user)
  }
  let verify = function(id: any) {
    axios
      .put(`/api/event/${id}/attended`, user)
      .then()
      .catch(console.error)
  }
  //axios.get(`/api/event/${props.match.params._id}/attendance/verify`,user).then((resp:any)=>{console.log(resp.data());}).catch(console.error)

  useEffect(() => {
    axios
      .get(`/api/event/${props.match.params._id}/attendance/verify`, user)
      .then((resp: any) => {
        setVolunteer(resp.data)
      })
      .catch(console.error)
  }, [])

  return (
    <Page>
      <Block>
        <Title size="3XL"> Verifiy volunteers attendance </Title>
      </Block>
      {volunteer.length >= 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableCell color={'white'}>
                {' '}
                <label> No. </label>{' '}
              </TableCell>
              <TableCell color={'white'}>
                {' '}
                <label> Name </label>{' '}
              </TableCell>
              <TableCell color={'white'}>
                {' '}
                <label> Email </label>{' '}
              </TableCell>
              <TableCell color={'white'}>
                {' '}
                <label> Phone no. </label>{' '}
              </TableCell>
              <TableCell color={'white'}>
                {' '}
                <label> Attended </label>{' '}
              </TableCell>
            </TableHeader>
            <TableBody>
              {volunteer.map((field: any, index: any) => (
                <TableRow>
                  <TableCell>
                    <label>&emsp;{index + 1}</label>
                  </TableCell>
                  <TableCell>
                    <label>{field.displayName}</label>
                  </TableCell>
                  <TableCell>
                    <label>{field.email} </label>
                  </TableCell>
                  <TableCell>
                    <label> {field.phoneNumber}</label>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleSelect(field._id)
                      }}
                      className={''}
                    />{' '}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Block className={'right'}>
            <Button primary onClick={() => verify(props.match.params._id)}>
              {' '}
              Verify{' '}
            </Button>
          </Block>
        </>
      ) : (
        <Title size="3XL"> No volunteers found </Title>
      )}
    </Page>
  )
}
