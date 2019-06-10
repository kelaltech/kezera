import * as React from 'react'
import '../verifier-list/verifier-list.scss'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { Content, Image, Title } from 'gerami'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import * as qs from 'qs'
import { useEffect, useState } from 'react'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { DeleteVerifiers } from '../../stores/admin-action'
import { useAdminDispatch } from '../../stores/admin-provider'
import {
  IAccountRequest,
  IAccountResponse
} from '../../../../../api/modules/account/account.apiv'
import userIcon from '../../../assets/userIcon/userIcon.png'

type Props = RouteComponentProps<any> & {}
function VerifierSearchResult(props: Props) {
  let { t, loading } = useLocale(['admin'])
  const AdminDispatch = useAdminDispatch()
  let [result, setResult] = useState([])
  let FetchVerifiers = function() {
    Axios.get(
      '/api/account/search-verifiers' +
        qs.stringify(
          { term: qs.parse(window.location.search, { ignoreQueryPrefix: true }).term },
          { addQueryPrefix: true }
        )
    )
      .then(resp => setResult(resp.data))
      .catch(console.error)
  }
  let handleDelete = function(id: string) {
    if (window.confirm(t`Are you sure you want to remove this user` + '?')) {
      DeleteVerifiers(id, AdminDispatch)
    }
  }
  useEffect(() => {
    FetchVerifiers()
  }, [])
  return (
    <div className={'flex full-width inline-block padding-normal'}>
      {result.length ? (
        <>
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
              {result &&
                result.map((field: IAccountResponse) => (
                  <TableRow>
                    <TableCell>
                      <label>
                        <Image
                          src={field.photoUri ? `${field.photoUri}?size=64` : userIcon}
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
        </>
      ) : (
        <Title> No result found </Title>
      )}
    </div>
  )
}

export default withRouter(VerifierSearchResult)
