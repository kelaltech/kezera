import i18n from 'i18next'
import * as qs from 'qs'

import { INavigationItem } from '../../shared/components/layout/header/interfaces'
import { IAccountResponse } from '../../../../api/modules/account/account.apiv'

function layoutOrganizationNavigation(
  t: i18n.TFunction,
  account?: IAccountResponse | null
): INavigationItem[] {
  let items: INavigationItem[] = []

  if (account) {
    items = items.concat([
      {
        to: '/organization/request/list',
        icon: 'donate',
        name: `Donation Requests`, // todo: translate
        shortName: `Requests` // todo: translate
      },
      {
        to: '/organization/event',
        icon: 'calendar',
        name: `Your Events`, // todo: translate
        shortName: `Events` // todo: translate
      },
      {
        to: '/organization/news',
        icon: 'newspaper',
        name: `Your News`, // todo: translate
        shortName: `News` // todo: translate
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

export default layoutOrganizationNavigation
