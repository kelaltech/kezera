import React from 'react'
import './event-verification.scss'
import { Page, Image, Content, Block, Title } from 'gerami'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CheckBox from '@material-ui/core/Checkbox'

const rows = [
  { Name: 'Anteneh Ashenafi', Location: 'Addis Ababa', phone: '+25191351551' },
  { Name: 'Pompidou', Location: 'AASTU', phone: '+25191351551' },
  { Name: 'Natnael mesfin', Location: 'AASTU', phone: '+25191351551' }
]

export default function EventVerification() {
  return (
    <Page>
      <Block>
        <Title size="3XL"> Attended users </Title>
      </Block>
      <Content className={'AttendedUsers'}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="left" padding="checkbox">
                {' '}
                <CheckBox value="All" />{' '}
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone no.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow>
                <TableCell padding="checkbox">
                  {' '}
                  <CheckBox> </CheckBox>{' '}
                </TableCell>
                <TableCell>
                  <Image
                    src={
                      'http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg'
                    }
                    className="UserPic"
                  />
                  <span className={'UserName'}> {row.Name} </span>
                </TableCell>
                <TableCell>{row.Location}</TableCell>
                <TableCell>{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </Page>
  )
}
