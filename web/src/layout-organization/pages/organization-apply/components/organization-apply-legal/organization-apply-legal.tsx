import React from 'react'
import { Block, Content } from 'gerami'

import useLocale from '../../../../../shared/hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../../../api/modules/organization/organization.apiv'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationApplyLegal({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization(Object.assign(organization, organizationChanges))
  }

  return (
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          Legal
        </Block>

        <hr />

        <Block>licensed names: ...</Block>

        <Block last>registrations: ...</Block>
      </Content>
    )
  )
}

export default OrganizationApplyLegal
