import { INavigationItem } from '../../shared/components/layout/header/interfaces'
import _ from '../../lib/language'

export default function layoutDefaultNavigation(isLoggedIn: boolean): INavigationItem[] {
  let items: INavigationItem[] = []

  if (isLoggedIn) {
    items = items.concat([
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
        icon: ['far', 'user-circle'],
        name: _`Login or Register`,
        shortName: _`Login`
      }
    ])
  }

  return items
}
