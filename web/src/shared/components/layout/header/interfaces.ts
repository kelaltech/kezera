import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface INavigationItem {
  to: string
  icon: IconProp
  name: string
  shortName?: string
}
