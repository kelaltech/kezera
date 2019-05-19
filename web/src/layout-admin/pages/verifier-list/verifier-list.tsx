import React, { useEffect, useState } from 'react'
import './verifier-list.scss'
import { Block, Button, Page, Title, Content, Image, Input } from 'gerami'
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
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

export default function VerifierList() {
  let [open, setOpen] = useState(false)
  let { t } = useLocale(['admin'])
  let { verifiers } = useAdminState()
  const AdminDispatch = useAdminDispatch()
  let searchData: IAccountResponse[] = []

  let SearchEvent = function(e: any) {
    try {
      let term = e.target.value
      if (searchData.length == 0) {
        searchData = verifiers
      }
      if (term === null || term.match(/^ *$/) !== null) {
        searchData = verifiers
      } else {
        verifiers = searchData.filter((d: IAccountResponse) => {
          const regex = new RegExp(e.target.value, 'gi')
          let name = d.displayName
          return name.match(regex)
        })
        // verifiers=result;
        console.log(verifiers)
      }
    } catch (e) {}
  }

  let handleDelete = function(id: string) {
    if (window.confirm(t`Are you sure you want to remove this user` + '?')) {
      DeleteVerifiers(id, AdminDispatch)
    }
  }
  return (
    <Block className={'flex full-width inline-block'}>
      <Block className={''}>
        <Title size={'3XL'}>
          <FontAwesomeIcon icon={'user-shield'} /> &emsp; {t`verifiers`}{' '}
        </Title>
      </Block>
      <Block className={'right'}>
        <Input
          type={'search'}
          name={'Search'}
          onKeyUp={e => SearchEvent(e)}
          placeholder={t`search verifiers`}
        />
        <Button onClick={() => setOpen(true)}>
          {' '}
          <FontAwesomeIcon icon={'user-shield'} /> &emsp; {t`create verifier`}{' '}
        </Button>
      </Block>
      <VerifierAdd open={open} onClose={() => setOpen(false)} />
      <Content>
        <Table>
          <TableHead className={'Verifier-Table-Header'}>
            <TableRow>
              <TableCell className="Verifier-Table-Header-Cells">{t`name`}</TableCell>
              <TableCell className="Verifier-Table-Header-Cells">{t`email address`}</TableCell>
              <TableCell className="Verifier-Table-Header-Cells">{t`phone no.`}</TableCell>
              <TableCell className="Verifier-Table-Header-Cells">{t`action`}</TableCell>
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
        <Button onClick={() => alert('ayseram')}> {t`view more`} </Button> &nbsp;
      </Block>
    </Block>
  )
}
