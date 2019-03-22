import React from 'react'
import { Content, Image } from 'gerami'
import './likes.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const rows = [
  { Name: 'Anteneh Ashenafi', Location: 'Addis Ababa' },
  { Name: 'Pompidou', Location: 'AASTU' },
  { Name: 'Natnael mesfin', Location: 'AASTU' }
]
export default function LikeTab() {
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
          {rows.map(row => (
            <TableRow>
              <TableCell component="th" scope="row">
                <Image
                  src={
                    'http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg'
                  }
                  className="UserPic"
                />
                <span className={'UserName'}> {row.Name} </span>
              </TableCell>
              <TableCell align="right">{row.Location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Content>
  )
}
