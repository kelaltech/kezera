import React, { useState } from 'react'
import './event-verification.scss'
import { CheckBox, Page, Block, Title } from 'gerami'
import Table, {
  TableHeader,
  TableCell,
  TableBody,
  TableRow
} from '../../../../shared/components/Table/Table'

const rows = [
  { Name: 'Antisha', Location: 'Addis Ababa', phone: '+25191351551' },
  { Name: 'Pompidou', Location: 'Borena', phone: '+25191351551' },
  { Name: 'Nati', Location: 'Mekele', phone: '+25191351551' }
]

export default function EventVerification() {
  let [all, setAll] = useState(false)
  let user: any = []
  let include = function(obj: any) {
    return user.find((i: any) => i === obj)
  }

  let handleSelect = function(index: any) {
    if (!include(index)) user.push(index)
    else user.splice(index, 1)

    console.log(user)
  }
  return (
    <Page>
      <Block>
        <Title size="3XL"> Verifiy volunteers attendance </Title>
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
            <label> Locaion </label>{' '}
          </TableCell>
          <TableCell color={'white'}>
            {' '}
            <label> Phone no. </label>{' '}
          </TableCell>
          <TableCell color={'white'}>
            {' '}
            <CheckBox onSelect={() => setAll(!all)} className={'CheckBox'} />{' '}
          </TableCell>
        </TableHeader>
        <TableBody>
          {rows.map((field, index) => (
            <TableRow>
              <TableCell>
                <label>&emsp;{index + 1}</label>
              </TableCell>
              <TableCell>
                <label>{field.Name}</label>
              </TableCell>
              <TableCell>
                <label>{field.Location}</label>
              </TableCell>
              <TableCell>
                <label>{field.phone}</label>
              </TableCell>
              <TableCell>
                {' '}
                <CheckBox onChange={() => handleSelect(index)} className={''} />{' '}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  )
}
