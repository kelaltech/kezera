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
  faFileContract
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faUserCircle,
  faCommentAlt,
  faHeart as Heart
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
    faFileContract
  )

  // brands
  library.add(faFacebook)

  // regular (free)
  library.add(faUserCircle, faCommentAlt, Heart)
}
