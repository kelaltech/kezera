import { INavigationItem } from '../../shared/components/layout/header/interfaces'

export default function layoutDefaultNavigation(isLoggedIn: boolean): INavigationItem[] {
  let items: INavigationItem[] = []

  if (isLoggedIn) {
    items = items.concat([])
  } else {
    items = items.concat([])
  }

  return items
}
