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

const verifier = {
  displayName: 'Anteneh Ashenafi',
  email: 'anteneh845@gmail.com',
  phone: '+251913055885',
  _at: '2/2/2019',
  location: 'Addis Ababa',
  verifiedOrganizations: [
    {
      id: 'MJ2114',
      _at: '2/5/2002',
      name: 'Merry joy'
    },
    {
      id: 'MEC58456',
      _at: '2/2/2011',
      name: 'Mecodenia'
    },
    {
      id: 'AG32123',
      _at: '2/6/2014',
      name: 'Abebech gobena'
    },
    {
      id: 'SC32134',
      _at: '6/5/2011',
      name: 'Save the children'
    }
  ]
}

export default function VerifierDescription(props: any) {
  let v: any = useFetch('/api/admin/verifier/' + props.match.params._id)

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
                  <FontAwesomeIcon icon={'map-marker'} className={'margin-top-small'} />
                  &emsp;
                  {v.email}
                </span>
              </Block>
            </Block>

            <Block className={'center'}>
              <Title size={'XL'}>
                <b> Verified organizations </b>
              </Title>
              {verifier.verifiedOrganizations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableCell color={'white'}>Id</TableCell>
                    <TableCell color={'white'}>Name</TableCell>
                    <TableCell color={'white'}>Verified date</TableCell>
                  </TableHeader>
                  <TableBody>
                    {verifier.verifiedOrganizations.map(org => (
                      <TableRow>
                        <TableCell>{org.id}</TableCell>
                        <TableCell>{org.name}</TableCell>
                        <TableCell>{org._at}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                ''
              )}
            </Block>
          </Content>
        </>
      ) : (
        ''
      )}
    </Block>
  )
}
