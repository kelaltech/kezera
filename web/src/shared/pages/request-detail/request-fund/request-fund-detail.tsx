import React, { Component } from 'react'
import { Anchor, Block, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IFundDetail {
  request: any
}

export default function RequestFundDetail({ request }: IFundDetail) {
  return (
    <div>
      <Title size={'L'} className={'bold center'}>
        {request.type === 'Fundraising' && request.fundraising.amount}
        {request.type === 'Fundraising' &&
          (request.fundraising.currency === 'EURO'
            ? '€'
            : request.fundraising.currency === 'POUND'
            ? '£'
            : request.fundraising.currency === 'ETB'
            ? 'ETB'
            : request.fundraising.currency === 'USD'
            ? '$'
            : null)}
      </Title>
    </div>
  )
}
