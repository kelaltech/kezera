import React from 'react'
import { Content } from 'gerami'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import { IFundraisingResponse } from '../../../../../apiv/fundraising.apiv'

function RequestDetailFundraising({
  request
}: {
  request: IRequestResponse & { type: 'Fundraising'; fundraising: IFundraisingResponse }
}) {
  const { loading, t } = useLocale(['request', 'fundraising'])

  return loading || <Content>todo</Content>
}

export default RequestDetailFundraising
