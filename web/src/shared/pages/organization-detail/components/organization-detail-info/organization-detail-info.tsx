import React, { lazy } from 'react'
import { Anchor, Block, Content, Flex, Yoga } from 'gerami'

import './organization-detail-info.scss'
import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { LngLat } from 'mapbox-gl'
import OrganizationDetailStats from '../organization-detail-stats/organization-detail-stats'
import { Timeline } from '../../../../components/timeline/timeline'
import { useAccountState } from '../../../../../app/stores/account/account-provider'

const OrganizationDetailApplicationLegal = lazy(() =>
  import('../organization-detail-application-legal/organization-detail-application-legal')
)

interface Props {
  organization: IOrganizationResponse
  isApplication: boolean
}

const parseGeo = (lngLat: LngLat): string => {
  const factor = 100000
  return `${Math.round(lngLat.lat * factor) / factor}° ${
    lngLat.lat > 0 ? 'N' : 'S'
  }, ${Math.round(lngLat.lng * factor) / factor}°  ${lngLat.lng > 0 ? 'E' : 'W'}`
}

function OrganizationDetailInfo({ organization, isApplication }: Props) {
  const { loading, t } = useLocale(['organization'])

  const { account } = useAccountState()

  return (
    loading || (
      <Content transparent>
        {isApplication && (
          <>
            <OrganizationDetailApplicationLegal application={organization} />
            <hr />
          </>
        )}

        {!organization.motto ? null : (
          <Content className={'margin-top-big'}>
            <Block className={'organization-motto'}>
              <q>{organization.motto}</q>
            </Block>
          </Content>
        )}

        {!isApplication && <OrganizationDetailStats organization={organization} />}

        <Yoga maxCol={2}>
          <Content className={'top'}>
            <Block first className={'bold'}>
              Funding
            </Block>

            <hr />

            <Block>
              <Flex>
                <div
                  className={'light fg-blackish padding-right-normal'}
                  style={{ flex: 2 }}
                >
                  Bank Account:
                </div>
                <div style={{ flex: 5 }}>
                  {!organization.funding.bankAccount ? (
                    t`n-a`
                  ) : (
                    <div className={'font-S'}>
                      <div>
                        <span className={'light fg-blackish'}>Bank Name:</span>{' '}
                        {organization.funding.bankAccount.bankName}
                      </div>
                      <div>
                        <span className={'light fg-blackish'}>Bank Country:</span>{' '}
                        {organization.funding.bankAccount.bankCountry}
                      </div>
                      <div>
                        <span className={'light fg-blackish'}>Account Holder:</span>{' '}
                        {organization.funding.bankAccount.accountHolder}
                      </div>
                      <div>
                        <span className={'light fg-blackish'}>Account Number:</span>{' '}
                        {organization.funding.bankAccount.accountNumber}
                      </div>
                    </div>
                  )}
                </div>
              </Flex>
            </Block>

            <Block last>
              <Flex>
                <div
                  className={'light fg-blackish padding-right-normal'}
                  style={{ flex: 2 }}
                >
                  PayPal.me:
                </div>
                <div style={{ flex: 5 }}>
                  {!organization.funding.payPalMeId ? (
                    t`n-a`
                  ) : (
                    <Anchor
                      href={`https://wwww.paypal.me/${organization.funding.payPalMeId}`}
                      target={'_blank'}
                      rel={'noopener'}
                    >
                      PayPal.me/{organization.funding.payPalMeId}
                    </Anchor>
                  )}
                </div>
              </Flex>
            </Block>
          </Content>

          <Content className={'top'}>
            <Block first className={'bold'}>
              Contact
            </Block>

            <hr />

            <Block>
              <Flex>
                <div
                  className={'light fg-blackish padding-right-normal'}
                  style={{ flex: 2 }}
                >
                  Email:
                </div>
                <div style={{ flex: 5 }}>
                  <Anchor href={`mailto:${organization.account.email}`}>
                    {organization.account.email}
                  </Anchor>
                </div>
              </Flex>
            </Block>

            {!organization.account.phoneNumber ? null : (
              <Block>
                <Flex>
                  <div
                    className={'light fg-blackish padding-right-normal'}
                    style={{ flex: 2 }}
                  >
                    Phone:
                  </div>
                  <div style={{ flex: 5 }}>
                    <Anchor href={`callto:${organization.account.phoneNumber}`}>
                      {organization.account.phoneNumber}
                    </Anchor>
                  </div>
                </Flex>
              </Block>
            )}

            <Block last>
              <Flex>
                <div
                  className={'light fg-blackish padding-right-normal'}
                  style={{ flex: 2 }}
                >
                  Locations:
                </div>
                {organization.locations && organization.locations.length ? (
                  <div style={{ flex: 5 }}>
                    {(organization.locations || []).map((location, i) => (
                      <div key={i}>
                        {location.address}{' '}
                        {location.geo && (
                          <Anchor
                            href={`https://www.google.com/maps?q=${location.geo.coordinates[1]},${location.geo.coordinates[0]}`}
                            target={'_blank'}
                            rel={'noopener'}
                          >
                            {parseGeo(
                              new LngLat(
                                location.geo.coordinates[0],
                                location.geo.coordinates[1]
                              )
                            )}
                          </Anchor>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ flex: 5 }} className={'italic fg-blackish'}>
                    n/a
                  </div>
                )}
              </Flex>
            </Block>
          </Content>
        </Yoga>

        <Content className={'top'}>
          <Block first className={'bold'}>
            Bio
          </Block>

          <hr />

          <Block last>
            <pre>{organization.bio}</pre>
          </Block>
        </Content>

        {(account!.role === 'ORGANIZATION' || account!.role === 'VERIFIER') &&
          !isApplication && (
            <Content className={'top margin-top-big'}>
              <Block first className={'bold'}>
                Activity
              </Block>

              <hr />

              <Block last>
                <Timeline title={'activity'} _id={account!._id} />
              </Block>
            </Content>
          )}
      </Content>
    )
  )
}

export default OrganizationDetailInfo
