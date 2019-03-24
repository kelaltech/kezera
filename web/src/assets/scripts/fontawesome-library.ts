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
  faCheck
} from '@fortawesome/free-solid-svg-icons'
// import { } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle, faCommentAlt } from '@fortawesome/free-regular-svg-icons'

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
    faSmile,
    faPencilAlt,
    faEnvelope,
    faSearch,
    faCheckCircle,
    faComment,
    faCommentAlt,
    faHeart,
    faPhone,
    faPlus,
    faTrash,
    faCameraRetro,
    faCheck
  )

  // brands
  library.add()

  // regular (free)
  library.add(faUserCircle, faCommentAlt)
}
