import { INavigationItem } from '../../shared/components/layout/header/interfaces'
import _ from '../../lib/language'

export default function layoutOrganizationNavigation(isLoggedIn: boolean) {
  let items: INavigationItem[] = []

  //Todo change icons for each nav item
  if (isLoggedIn) {
    items = items.concat([
      {
        to: '/summary',
        icon: ['far', 'user-circle'],
        name: _`Account Setting`,
        shortName: ' '
      },
      {
        to: '/news',
        icon: ['far', 'user-circle'],
        name: _`News`,
        shortName: _`News`
      },
      {
        to: '/event',
        icon: ['far', 'user-circle'],
        name: _`Event`,
        shortName: _`Event`
      },
      {
        to: '/donation',
        icon: ['far', 'user-circle'],
        name: _`Donation`,
        shortName: _`Donation`
      },
      {
        to: '/account',
        icon: ['far', 'user-circle'],
        name: _`Account Settings`,
        shortName: ' '
      }
    ])
  } else {
    items = items.concat([
      {
        to: '/login',
        icon: 'sign-in-alt',
        name: _`Login`,
        shortName: _`Login`
      }
    ])
  }

  return items
}
