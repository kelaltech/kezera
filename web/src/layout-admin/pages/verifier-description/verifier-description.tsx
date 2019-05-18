import React from 'react'
import './verifier-description.scss'
import { Block, Content, Image, Page, Title } from 'gerami'
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

export default function VerifierDescription(props: any) {
  let v: any = useFetch('/api/admin/verifier/' + props.match.params._id)
  let org = useFetch(`/api/admin/verifier/organizations/${props.match.params._id}`)
  let { t } = useLocale(['admin'])
  return (
    <Block className={'flex full-width'}>
      {v ? (
        <>
          <Content size={'XXL'}>
            <Block className={'center'}>
              <Image
                src={`/api/admin/verifier/pic/${props.match.params._id}`}
                className={'VerifierImage middle inline-block'}
              />
            </Block>
            <Block className={'center'}>
              <Title size={'XXL'} className={'inline-block middle'}>
                {v.displayName}{' '}
              </Title>
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

            <Block className={'center'}>
              <Title size={'XL'}>
                <b> {t`verified organizations`} </b>
              </Title>
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
            </Block>
            <Timeline title={`Activities`} _id={v._id} />
          </Content>
        </>
      ) : (
        ''
      )}
    </Block>
  )
}
