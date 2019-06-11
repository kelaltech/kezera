import React from 'react'
import { Content } from 'gerami'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { IOrganResponse } from '../../../../../../../api/modules/organ/organ.apiv'

function RequestDetailOrgan({
  request
}: {
  request: IRequestResponse & { type: 'Organ'; organ: IOrganResponse }
}) {
  const { loading, t } = useLocale(['request', 'organ-donation'])

  return loading || <Content>todo</Content>
}

export default RequestDetailOrgan
