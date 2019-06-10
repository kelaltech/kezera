import React, { useEffect, useState } from 'react'
import './verifier-list.scss'
import { Block, Button, Page, Title, Content, Image, Input } from 'gerami'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import VerifierAdd from '../verifier-add/verifier-add'
import { useAdminDispatch, useAdminState } from '../../stores/admin-provider'
import { DeleteVerifiers } from '../../stores/admin-action'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import SearchBar from '../../../shared/components/search-bar/search-bar'
import Axios from 'axios'
import userIcon from "../../../assets/userIcon/userIcon.png"

import *as  qs from 'qs'
type props=RouteComponentProps & {

}

function VerifierList(props:props) {
  let [open, setOpen] = useState(false)
  let [term, setTerm] = useState('')
  let { t ,loading} = useLocale(['admin'])
  let { verifiers } = useAdminState()
  const AdminDispatch = useAdminDispatch()
  let searchData: IAccountResponse[] = []

  let SearchEvent = function(term: string) {

  }

  let handleDelete = function(id: string) {
    if (window.confirm(t`Are you sure you want to remove this user` + '?')) {
      DeleteVerifiers(id, AdminDispatch)
    }
  }
  return loading || (
    <Block className={'flex full-width inline-block'}>
      <Block className={''}>
        <Title size={'3XL'}>
          <FontAwesomeIcon icon={'user-shield'} /> &emsp; {t`verifiers`}{' '}
        </Title>
      </Block>
      <Block className={'right'}>
        <Button onClick={() => setOpen(true)}>
          {' '}
          <FontAwesomeIcon icon={'user-shield'} /> &emsp; {t`create verifier`}{' '}
        </Button>
        <SearchBar
          onSearch={()=>props.history.push({pathname:'/verifier-search',search:qs.stringify({term:term})})}
          className={"margin-vertical-normal"}
          onTerm={term=>setTerm(term)}
          placeholder={'Search for verifiers'}
        />
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
                        // src={`/api/admin/verifier/pic/${field._id}`}
                        src={field.photoUri?`${field.photoUri}?size=64`:userIcon}
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
export default withRouter(VerifierList)
