import React, { useState } from 'react'
import './verifier-list.scss'
import { Block, Button, Page, Title, Content, Image } from 'gerami'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import VerifierAdd from '../verifier-add/verifier-add'
import { useAdminDispatch, useAdminState } from '../../stores/admin-provider'
import { DeleteVerifiers } from '../../stores/admin-action'

export default function VerifierList() {
  let [open, setOpen] = useState(false)
  let { verifiers } = useAdminState()
  const AdminDispatch = useAdminDispatch()

  let handleDelete = function(id: string) {
    if (window.confirm('Are you sure you want to remove this user?')) {
      DeleteVerifiers(id, AdminDispatch)
    }
  }
  return (
    <Page>
      <Block className={''}>
        <Title size={'3XL'}>
          <FontAwesomeIcon icon={'user-shield'} /> &emsp; Verifiers{' '}
        </Title>
      </Block>
      <Block className={'right'}>
        <Button onClick={() => setOpen(true)}>
          {' '}
          <FontAwesomeIcon icon={'user-shield'} /> &emsp; Create Verifier{' '}
        </Button>
      </Block>
      <VerifierAdd open={open} onClose={() => setOpen(false)} />
      <Content>
        <Table>
          <TableHead className={'Verifier-Table-Header'}>
            <TableRow>
              <TableCell className="Verifier-Table-Header-Cells">Name</TableCell>
              <TableCell className="Verifier-Table-Header-Cells">Email</TableCell>
              <TableCell className="Verifier-Table-Header-Cells">Phone no.</TableCell>
              <TableCell className="Verifier-Table-Header-Cells">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verifiers &&
              verifiers.map((field: any) => (
                <TableRow>
                  <TableCell>
                    <label>
                      <Image
                        src={`/api/admin/verifier/pic/${field._id}`}
                        className="Verifier-Image middle"
                      />
                      &emsp;
                      <span className="middle"> {field.displayName} </span>
                    </label>
                  </TableCell>
                  <TableCell>
                    <label>{field.email} </label>
                  </TableCell>
                  <TableCell>
                    <label> {field.phoneNumber}</label>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/verifier/${field._id}`}>
                      <label>
                        <FontAwesomeIcon
                          className={'ViewButton'}
                          icon={'eye'}
                          title={'View verifier'}
                        />
                      </label>
                    </Link>
                    &emsp;
                    <label onClick={() => handleDelete(field._id)}>
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
      </Content>
      <Block className="center">
        <Button onClick={() => alert('ayseram')}> 1 </Button> &nbsp;
        <Button onClick={() => alert('ayseram')}> 2 </Button> &nbsp;
        <Button onClick={() => alert('ayseram')}> 3 </Button> &nbsp;
        <Button onClick={() => alert('ayseram')}> 4 </Button> &nbsp;
        <Button onClick={() => alert('ayseram')}> 5 </Button> &nbsp;
        <Button onClick={() => alert('ayseram')}> 6 </Button> &nbsp;
        <Button onClick={() => alert('ayseram')}> Next </Button> &nbsp;
      </Block>
    </Page>
  )
}
