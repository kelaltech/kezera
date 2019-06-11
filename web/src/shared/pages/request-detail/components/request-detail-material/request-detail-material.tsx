import React from 'react'
import { Content } from 'gerami'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { IMaterialResponse } from '../../../../../../../api/modules/material/material.apiv'

function RequestDetailMaterial({
  request
}: {
  request: IRequestResponse & { type: 'Material'; material: IMaterialResponse }
}) {
  const { loading, t } = useLocale(['request', 'material-donation'])

  return loading || <Content>todo</Content>
}

export default RequestDetailMaterial
