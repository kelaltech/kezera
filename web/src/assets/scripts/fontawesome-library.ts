import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faBars,
  faSignInAlt,
  faImage,
  faLocationArrow,
  faCalendar,
  faMapMarker,
  faComment,
  faHeart,
  faSmile,
  faPhone,
  faEnvelope,
  faPlus,
  faPencilAlt,
  faTrash,
  faCheckCircle,
  faSearch,
  faCameraRetro,
  faCheck,
  faQuestionCircle,
  faUserSecret,
  faShareAlt,
  faBalanceScale,
  faFileContract,
  faUserTie,
  faGlobeAfrica,
  faInfoCircle,
  faNewspaper,
  faDonate,
  faUserCircle,
  faHandsHelping,
  faBell,
  faBellSlash,
  faFileArchive
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faUserCircle as farUserCircle,
  faCommentAlt as farCommentAlt,
  faHeart as farHeart,
  faNewspaper as farNewspaper,
  faCalendarAlt as farCalendarAlt
} from '@fortawesome/free-regular-svg-icons'

export default function fontawesomeLibrary() {
  library.reset()

  // solid
  library.add(
    faBars,
    faSignInAlt,
    faImage,
    faLocationArrow,
    faCalendar,
    faMapMarker,
    faComment,
    faHeart,
    faSmile,
    faPhone,
    faEnvelope,
    faPlus,
    faPencilAlt,
    faTrash,
    faCheckCircle,
    faSearch,
    faCameraRetro,
    faCheck,
    faQuestionCircle,
    faUserSecret,
    faShareAlt,
    faBalanceScale,
    faFileContract,
    faUserTie,
    faGlobeAfrica,
    faInfoCircle,
    faNewspaper,
    faDonate,
    faUserCircle,
    faHandsHelping,
    faBell,
    faBellSlash,
    faFileArchive
  )

  // brands
  library.add(faFacebook)

  // regular (free)
  library.add(farUserCircle, farCommentAlt, farHeart, farNewspaper, farCalendarAlt)
}
