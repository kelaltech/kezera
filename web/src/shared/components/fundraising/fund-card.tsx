import React, { Component, useState } from 'react'
import {} from 'recharts'
import {
  Anchor,
  Block,
  Button,
  Card,
  Content,
  Flex,
  FlexSpacer,
  Image,
  Loading,
  Page,
  SlideShow,
  Title,
  Yoga
} from 'gerami'
import axios from 'axios'
import "./fund-card.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../hooks/use-locale/use-locale'
interface IFundProps {
  request: any
}

/*export default function FundCard({ request }: IFundProps) {
  let [open, setOpen] = useState(false)
  const { account } = useAccountState()
  const { loading, t } = useLocale(['request'])
  let DeleteRequest = function(id: any) {
    if (window.confirm('Are you sure?')) {
      axios.delete(`/api/request/${request._id}`)
        .then()
        .catch(console.error)
    }
  }

  return (
    loading || (
      <Content className={'fund-card'}>
        <Card imgSrc={request.picture}>
          <Title size={'L'} className={'center'}>
            {request.name}
          </Title>
          <hr />
          <Flex>
            <label>{new Date(request.startDate).toDateString().substr(3)}</label>
            <FlexSpacer />
            <label>-</label>
            <FlexSpacer />
            <label>{new Date(request.endDate).toDateString().substr(3)}</label>
          </Flex>
          <h5 className={'center'}>{request.type}</h5>
          <Title className={'center'} size={'S'}>
            {request.fundraising.amount}{' '}
            {request.fundraising.currency === 'ETB' ? 'ETB' : null}
            {request.fundraising.currency === 'EURO' ? '€' : null}
            {request.fundraising.currency === 'POUND' ? '£' : null}
            {request.fundraising.currency === 'USD' ? '$' : null}
          </Title>
          <hr />
          <Flex>
            {account && account.role === 'ORGANIZATION' ? (
              <Flex>
                <span className={'full-width flex'}>
                  <Button
                    onClick={() => DeleteRequest(request._id)}
                    className={'ActionButton12 '}
                  >
                    <FontAwesomeIcon
                      color={'red'}
                      icon={'trash'}
                      className={'TrashIcon'}
                    />
                  </Button>
                </span>
              </Flex>
            ) : (
              <Button>{t`request:donate`}</Button>
            )}
            <FlexSpacer />
            <Anchor className={'margin-top-normal'} to={`/request/${request._id}`}>
              {t`request:details`}
            </Anchor>
          </Flex>
        </Card>
      </Content>
    )
  )
}*/

export default function FundCard({ request }: IFundProps) {
  const { account } = useAccountState()
  return(
    <Card
      imgSrc={request.picture}
      className={'requestCard'}
      children={
         <>
           <Title size={'M'}>
             <Anchor to={`/request/${request._id}`}>
               {request.name}
             </Anchor>
           </Title>
           <span>
             <FontAwesomeIcon
               color={'blue'}
               icon={'donate'}
               className={'TrashIcon'}
             />&emsp; {request.type}
           </span>
           <br/>
           <span>
            <FontAwesomeIcon
              color={'blue'}
              icon={'calendar'}
            />&emsp;
             {new Date(request.expires).toDateString()}
           </span>
           <br/>
           {request.type=='Fundraising'?
             <>
               <FontAwesomeIcon
                 icon={'money-bill'}
                 color={'green'}
               />&emsp;
               10,000 etb
             </>
            :''}
           {request.type=='Material'?
             <>
               <FontAwesomeIcon
                 color={'grey'}
                 icon={'tshirt'}
                />&esmp;
               10
             </>:''}
           {request.type=='Task'?
             <>
               <FontAwesomeIcon
                 color={'blue'}
                 icon={'tasks'}
               />&emsp;
               Cleaning
             </>:''}
           {request.type=='Organ'?
             <>
               <FontAwesomeIcon
                 color={'rgb(223,72,61)'}
                 icon={'hand-holding-heart'}
               />&emsp;
                2
             </>:''}
           {account && account.role === 'ORGANIZATION' ?
             <Block className={'right'}>
               <span className={'requestDeleteButton'} onClick={()=>alert('Abebe')}>
                 <FontAwesomeIcon
                   color={'blue'}
                   icon={'pencil-alt'}
                   className={'TrashIcon'}
                 />
               </span>
               &emsp;&emsp;
               <span className={'requestDeleteButton'} onClick={()=>alert('Abebe')}>
                 <FontAwesomeIcon
                   color={'red'}
                   icon={'trash'}
                   className={'TrashIcon'}
                 />
               </span>
             </Block>
             :''}
         </>
      }
    />
  )
}