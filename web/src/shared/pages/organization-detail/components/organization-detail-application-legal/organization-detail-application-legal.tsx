import React, { useEffect, useState } from 'react'
import { Anchor, Block, Content, Flex, Loading, Warning, Yoga } from 'gerami'
import Axios from 'axios'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { IOrganizationApplicationOfficialDocumentResponse } from '../../../../../apiv/verifier.apiv'

type Props = {
  application: IOrganizationResponse
}

function OrganizationDetailApplicationLegal({ application }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [error, setError] = useState()
  const [officialDocuments, setOfficialDocuments] = useState<
    IOrganizationApplicationOfficialDocumentResponse[]
  >()

  useEffect(() => {
    Axios.get<IOrganizationApplicationOfficialDocumentResponse[]>(
      `/api/verifier/list-organization-application-official-documents/${application._id}`
    )
      .then(response => response.data)
      .then(data => setOfficialDocuments(data))
      .catch(e =>
        setError(
          e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
      )
  }, [application._id])

  return (
    loading || (
      <Content className={'top margin-vertical-big'}>
        <Block first className={'bold'}>
          Legal Identity (Licenses) for Verification
        </Block>

        <hr />

        {error ? (
          <Block last>
            <Warning problem={error} />
          </Block>
        ) : !officialDocuments ? (
          <Loading delay />
        ) : (
          <Yoga maxCol={2} className={'yoga-in-rich-page padding-none'}>
            <>
              <Block>
                <Flex>
                  <div
                    className={'light fg-blackish padding-right-normal'}
                    style={{ flex: 2 }}
                  >
                    Licensed Names:
                  </div>
                  <div style={{ flex: 5 }}>
                    {!application.licensedNames.length && `n/a`}
                    {application.licensedNames.map((licensedName, i) => (
                      <div key={i} className={'margin-bottom-small'}>
                        {licensedName}
                      </div>
                    ))}
                  </div>
                </Flex>
              </Block>

              <Block last>
                <Flex>
                  <div
                    className={'light fg-blackish padding-right-normal'}
                    style={{ flex: 2 }}
                  >
                    Registrations:
                  </div>
                  <div style={{ flex: 5 }}>
                    {!application.registrations.length && `n/a`}
                    {application.registrations.map((registration, i) => (
                      <div key={i} className={'margin-bottom-small'}>
                        {registration.type}: {registration.id} ({registration.issuer})
                      </div>
                    ))}
                  </div>
                </Flex>
              </Block>
            </>

            <Block last>
              <Flex>
                <div
                  className={'light fg-blackish padding-right-normal'}
                  style={{ flex: 2 }}
                >
                  Official Documents:
                </div>
                <div style={{ flex: 5 }}>
                  {!officialDocuments.length && `n/a`}
                  {officialDocuments.map((officialDocument, i) => (
                    <div key={i} className={'margin-bottom-small'}>
                      <Anchor href={officialDocument.download} download>
                        {officialDocument.name}
                      </Anchor>
                    </div>
                  ))}
                </div>
              </Flex>
            </Block>
          </Yoga>
        )}
      </Content>
    )
  )
}

export default OrganizationDetailApplicationLegal
