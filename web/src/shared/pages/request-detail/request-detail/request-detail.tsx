import { Block, Content, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

const RequestInfo = {
  Title: 'Children Support',
  Description:
    'n Content (at request-information.tsx:9)\n' +
    '    in RequestInformation (created by Context.Consumer)\n' +
    '    in Route (at layout-orgainzation-routes.tsx:34)\n' +
    '    in Switch (at layout-orgainzation-routes.tsx:26)\n' +
    '    in LayoutOrganizationRoutes (at layout-organization.tsx:26)\n' +
    '    in div (at layout.tsx:68)\n' +
    '    in Layout (at layout-organization.tsx:20)\n' +
    '    in LayoutOrganizationProviders (at layout-organization.tsx:19)\n' +
    '    in LayoutOrganization (created by Context.Consumer)\n' +
    '    in Route (at app-routes.tsx:17)\n' +
    '    in Switch (at app-routes.tsx:13)\n' +
    '    in AppRoutes (at app.tsx:15',
  StartDate: '2/12/2018',
  EndDate: '28/12/2018',
  location: 'Kotebe, Addis Ababa',
  Interested: '25842',
  Going: '2221'
}

export default class RequestDetail extends Component<any> {
  render() {
    return (
      <Page>
        <Block className="">
          <Title size={'XXL'}>{RequestInfo.Title}</Title>
        </Block>
        <Block>
          <p>{RequestInfo.Description}</p>
        </Block>

        <Yoga maxCol={2}>
          <Block>
            <label className="flex padding-small">
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'calendar'}
              />
              <Content transparent>
                {' '}
                From {RequestInfo.StartDate} to {RequestInfo.EndDate}{' '}
              </Content>
            </label>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'map-marker'}
              />
              <Content transparent> {RequestInfo.location}</Content>
            </label>
          </Block>

          <Block>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'smile'}
              />
              <Content transparent className={'full-width'}>
                {RequestInfo.Interested} people interested{' '}
              </Content>
            </label>

            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={['far', 'user-circle']}
              />
              <Content className={'full-width'} transparent>
                {RequestInfo.Going} people going{' '}
              </Content>
            </label>
          </Block>
        </Yoga>
      </Page>
    )
  }
}
