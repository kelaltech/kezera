import React from 'react'
import { Anchor, Block, Content, Flex, Yoga } from 'gerami'

import './organization-detail-about.scss'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'

interface Props {
  organization: IOrganizationResponse
}

function OrganizationDetailAbout({ organization }: Props) {
  return (
    <>
      {!organization.motto ? null : (
        <Content className={'organization-bio-content margin-bottom-big'}>
          <Block>
            <q>{organization.motto}</q>
          </Block>
        </Content>
      )}

      <Content>
        <Block first className={'bold'}>
          Summary
        </Block>

        <hr />

        <Block last>// todo: summary</Block>
      </Content>

      <Yoga maxCol={2} className={'yoga-in-rich-page'}>
        <Content className={'top'}>
          <Block first className={'bold'}>
            Bio
          </Block>

          <hr />

          <Block last>
            <pre
              style={{
                /* todo: move this to gerami v0.1.3 */
                margin: 0,
                padding: 0,
                font: 'inherit',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}
            >
              {organization.bio}
            </pre>
          </Block>
        </Content>

        <Content className={'top'}>
          <Block first className={'bold'}>
            Contact
          </Block>
          <hr />

          <Block>
            <Flex>
              <div className={'light fg-blackish'} style={{ flex: 1 }}>
                EMAIL:
              </div>
              <div style={{ flex: 2 }}>
                <Anchor href={`mailto:${organization.account.email}`}>
                  {organization.account.email}
                </Anchor>
              </div>
            </Flex>
          </Block>

          {!organization.account.phoneNumber ? null : (
            <Block>
              <Flex>
                <div className={'light fg-blackish'} style={{ flex: 1 }}>
                  PHONE:
                </div>
                <div style={{ flex: 2 }}>
                  <Anchor href={`callto:${organization.account.phoneNumber}`}>
                    {organization.account.phoneNumber}
                  </Anchor>
                </div>
              </Flex>
            </Block>
          )}

          <Block last>
            <Flex>
              <div className={'light fg-blackish'} style={{ flex: 1 }}>
                LOCATIONS:
              </div>
              {organization.locations && organization.locations.length ? (
                <div style={{ flex: 2 }}>
                  {(organization.locations || []).map(location => (
                    <div>
                      {location.address}
                    </div> /* todo: (latitude, longitude) => google maps in new tab */
                  ))}
                </div>
              ) : (
                <div style={{ flex: 2 }} className={'italic fg-blackish'}>
                  n/a
                </div>
              )}
            </Flex>
          </Block>
        </Content>
      </Yoga>
    </>
  )
}

export default OrganizationDetailAbout
