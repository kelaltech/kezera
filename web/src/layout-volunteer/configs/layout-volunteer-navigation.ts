import i18n from 'i18next'
import * as qs from 'qs'

import { INavigationItem } from '../../shared/components/layout/header/interfaces'
import { IAccountResponse } from '../../../../api/modules/account/account.apiv'

function layoutVolunteerNavigation(
  t: i18n.TFunction,
  account?: IAccountResponse | null
): INavigationItem[] {
  let items: INavigationItem[] = []

  if (account) {
    items = items.concat([
      {
        to: '/account',
        icon: ['far', 'user-circle'],
        name: t`Account Settings`,
        shortName: account.displayName
      }
    ])
  } else {
    items = items.concat([
      {
        to: `/register?${qs.stringify({ continue: window.location.pathname })}`,
        icon: ['far', 'user-circle'],
        name: t`register-as-volunteer`,
        shortName: t`register`
      },
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

export default layoutVolunteerNavigation
