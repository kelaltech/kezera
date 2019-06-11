import i18n from 'i18next'
import * as qs from 'qs'

import { INavigationItem } from '../../shared/components/layout/header/interfaces'
import { IAccountResponse } from '../../../../api/modules/account/account.apiv'

function layoutAdminNavigation(
  t: i18n.TFunction,
  account?: IAccountResponse | null
): INavigationItem[] {
  let items: INavigationItem[] = []

  if (account) {
    items = items.concat([
      /*{
        to: '/admin/statistics',
        icon: 'home',
        name: 'Dashboard',
        shortName: 'Dashboard'
      },
      {
        to: '/admin/verifiers',
        icon: 'user-shield',
        name: 'Verifiers',
        shortName: 'Verifiers'
      },
*/
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

export default layoutAdminNavigation
