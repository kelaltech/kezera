import React, { useState } from 'react'
import './verifier-list.scss'
import { Block, Page, Title } from 'gerami'
import Table, {
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '../../../shared/components/Table/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { Schema } from 'mongoose'
import { Link } from 'react-router-dom'

let list = [
  {
    displayName: 'Abebe bebe',
    email: 'abebe@gmail.com',
    _at: '2/2/2019'
  },
  {
    displayName: 'Kebede debebe',
    email: 'kebede@gmail.com',
    _at: '2/2/2019'
  },
  {
    displayName: 'Brook Tesfaye',
    email: 'brook@gmail.com',
    _at: '2/2/2019'
  },
  {
    displayName: 'Kaleab Melkie',
    email: 'kaleab@gmail.com',
    _at: '2/2/2019'
  },
  {
    displayName: 'Dagmawi worku',
    email: 'dagmawi@gmail.com',
    _at: '2/2/2019'
  }
]
export default function VerifierList() {
  let [open, setOpen] = useState(false)
  let [verifiers, setVerifiers] = useState([])

  let handleDelete = function(id: Schema.Types.ObjectId) {
    Axios.delete(`/api/admin/verifier/${id}`)
      .then(() => FetchVerifiers())
      .catch()
  }

  let FetchVerifiers = function() {
    Axios.get('/api/admin/verifiers')
      .then(resp => setVerifiers(resp.data))
      .catch()
  }

  return (
    <Page>
      <Block className={'center'}>
        <Title size={'XXL'}> Verifier list </Title>
      </Block>
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
            <label> Created on </label>{' '}
          </TableCell>
          <TableCell color={'white'}>
            <label> Actions </label>
          </TableCell>
        </TableHeader>
        <TableBody>
          {list.map((field: any, index: number) => (
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
                <label> {field._at}</label>
              </TableCell>
              <TableCell>
                <Link to={`/admin/verifier/verifierId`}>
                  <label>
                    <FontAwesomeIcon
                      className={'ViewButton'}
                      icon={'eye'}
                      title={'View verifier'}
                    />
                  </label>
                </Link>
                &emsp;
                <label onClick={() => alert('Delete Verifier')}>
                  <FontAwesomeIcon
                    className={'RemoveButton'}
                    icon={'trash'}
                    title={'delete verifier'}
                  />
                </label>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  )
}
