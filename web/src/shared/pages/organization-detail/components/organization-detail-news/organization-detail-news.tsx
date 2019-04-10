import React from 'react'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'

interface Props {
  organization: IOrganizationResponse
}

function OrganizationDetailNews({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  return loading || <></>
}

export default OrganizationDetailNews
