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
  faUsers,
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
  faBuilding,
  faHiking,
  faShareAlt,
  faExclamationCircle,
  faEllipsisV,
  faNewspaper,
  faThumbsUp,
  faMoneyBill,
  faHandHoldingHeart,
  faTshirt,
  faTasks,
  faHome,
  faUserShield,
  faEye,
  faReply,
  faBalanceScale,
  faFileContract,
  faUserTie,
  faGlobeAfrica,
  faInfoCircle,
  faDonate,
  faUserCircle,
  faHandsHelping,
  faDoorOpen
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
    faDoorOpen,
    faThumbsUp,
    faUserShield,
    faBars,
    faSignInAlt,
    faImage,
    faLocationArrow,
    faCalendar,
    faMoneyBill,
    faHome,
    faMapMarker,
    faComment,
    faHeart,
    faSmile,
    faPhone,
    faHandHoldingHeart,
    faHeart,
    faEnvelope,
    faPlus,
    faPencilAlt,
    faTasks,
    faTshirt,
    faTrash,
    faUsers,
    faNewspaper,
    faCheckCircle,
    faSearch,
    faHiking,
    faCameraRetro,
    faCheck,
    faQuestionCircle,
    faUserSecret,
    faShareAlt,
    faExclamationCircle,
    faEllipsisV,
    faReply,
    faBalanceScale,
    faFileContract,
    faUserTie,
    faGlobeAfrica,
    faInfoCircle,
    faNewspaper,
    faDonate,
    faUserCircle,
    faHandsHelping,
    faEye,
    faBuilding
  )

  // brands
  library.add(faFacebook)

  // regular (free)
  library.add(faUserCircle, farCommentAlt, farHeart)
}
