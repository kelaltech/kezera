import React from 'react'
import { Block, Content } from 'gerami'

import useLocale from '../../../../../shared/hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../../../api/modules/organization/organization.apiv'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationApplyBrand({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  return (
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          Brand
        </Block>

        <hr />

        <Block>logo: ...</Block>

        <Block>motto: {organization.motto || 'n/a'}</Block>

        <Block last>website: {organization.website || 'n/a'}</Block>
      </Content>
    )
  )
}

export default OrganizationApplyBrand
