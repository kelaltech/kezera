import i18n from 'i18next'
import * as qs from 'qs'

import { INavigationItem } from '../../shared/components/layout/header/interfaces'
import { IAccountResponse } from '../../../../api/modules/account/account.apiv'

function layoutVerifierNavigation(
  t: i18n.TFunction,
  account?: IAccountResponse | null
): INavigationItem[] {
  let items: INavigationItem[] = []

  if (account) {
    items = items.concat([
      {
        to: '/applications',
        icon: 'question-circle',
        name: `Organization Applications`,
        shortName: `Applications`
      },
      {
        to: '/spam-reports',
        icon: 'question-circle',
        name: `Spam Reports`,
        shortName: `Spam Reports`
      },
      {
        to: '/organizations',
        icon: 'file-archive',
        name: `Approved Organizations`,
        shortName: `Organizations`
      },
      {
        to: '/account',
        icon: ['far', 'user-circle'],
        name: account.displayName,
        shortName: account.displayName
      }
    ])
  } else {
    items = items.concat([
      {
        to: `/login?${qs.stringify({ continue: window.location.pathname })}`,
        icon: 'sign-in-alt',
        name: t`login`,
        shortName: t`login`
      }
    ])
  }

  return items
}

export default layoutVerifierNavigation
