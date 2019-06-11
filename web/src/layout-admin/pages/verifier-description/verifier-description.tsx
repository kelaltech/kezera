import React from 'react'
import './verifier-description.scss'
import { Block, Button, Content, Image, Page, Title } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Table, {
  TableHeader,
  TableCell,
  TableBody,
  TableRow
} from '../../../shared/components/Table/Table'
import { useFetch } from '../../hooks/Fetch'
import { Timeline } from '../../../shared/components/timeline/timeline'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { DeleteVerifiers } from '../../stores/admin-action'
import { useAdminDispatch } from '../../stores/admin-provider'
import userIcon from '../../../assets/userIcon/userIcon.png'

export default function VerifierDescription(props: any) {
  let v: any = useFetch('/api/admin/verifier/' + props.match.params._id)
  let org = useFetch(`/api/admin/verifier/organizations/${props.match.params._id}`)
  let { t } = useLocale(['admin'])
  const AdminDispatch = useAdminDispatch()
  let handleDelete = function(id: string) {
    if (window.confirm(t`Are you sure you want to remove this user` + '?')) {
      DeleteVerifiers(id, AdminDispatch)
      window.location.href = '/verifiers'
    }
  }
  return (
    <Block className={'flex full-width'}>
      {v ? (
        <>
          <Content transparent size={'XXL'}>
            <Content>
              <Block className={'center inline-block'}>
                <Image
                  src={v.photoUri ? `${v.photoUri}?size=64` : userIcon}
                  // src={`/api/admin/verifier/pic/${props.match.params._id}`}
                  className={'VerifierImage middle inline-block'}
                />
              </Block>
              <Block className={'inline-block center'}>
                <Title size={'XXL'} className={'inline-block middle'}>
                  {v.displayName}{' '}
                </Title>
              </Block>
              <Block className={'inline-block VerifierDeleteButtonContainer'}>
                <Button
                  onClick={() => handleDelete(props.match.params._id)}
                  className={'removeButton'}
                >
                  <FontAwesomeIcon icon={'trash'} title={''} />
                  &nbsp;
                  {t`remove`}
                </Button>
              </Block>
              <Block className={'center VerifierDescription'}>
                <Block className={'flex'}>
                  <span className={'center flex full-width'}>
                    <FontAwesomeIcon icon={'envelope'} className={'margin-top-small'} />
                    &emsp;
                    {v.email}
                  </span>
                  <span className={'flex full-width'}>
                    <FontAwesomeIcon icon={'phone'} className={'margin-top-small'} />
                    &emsp;
                    {v.phoneNumber}
                  </span>
                </Block>
                <Block className={'flex'}>
                  <span className={'flex full-width'}>
                    <FontAwesomeIcon icon={'calendar'} className={'margin-top-small'} />
                    &emsp;
                    {new Date(v._at).toDateString()}
                  </span>

                  <span className={'flex full-width'}>
                    <FontAwesomeIcon icon={'user'} className={'margin-top-small'} />
                    &emsp;
                    {v.status}
                  </span>
                </Block>
              </Block>
            </Content>
            <span className={''}>
              <Title size={'S'}>#{t`verified organizations`}</Title>
              {org.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableCell color={'white'}>{t`name`}</TableCell>
                    <TableCell color={'white'}>{t`phone no.`}</TableCell>
                    <TableCell color={'white'}>{t`verified date`}</TableCell>
                  </TableHeader>
                  <TableBody>
                    {org &&
                      org.map((organization: IAccountResponse) => (
                        <TableRow>
                          <TableCell>{organization.displayName}</TableCell>
                          <TableCell>{organization.phoneNumber}</TableCell>
                          <TableCell>
                            {new Date(organization._at).toDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <Title> {t`no organizations verified`} </Title>
              )}
            </span>
            <br />
            <br />
            <Timeline title={`Activities`} _id={v._id} />
          </Content>
        </>
      ) : (
        ''
      )}
    </Block>
  )
}
