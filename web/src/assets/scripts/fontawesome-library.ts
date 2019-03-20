import { library } from '@fortawesome/fontawesome-svg-core'

import { faBars,
  faSignInAlt,
  faImage,
  faLocationArrow,
  faCalendar,
  faMapMarker,
  faComment,
  faHeart,
  faSmile,
  faPhone,
  faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle,  faCommentAlt } from '@fortawesome/free-regular-svg-icons'

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
    faEnvelope,
    faComment,
    faHeart,
    faPhone
  )

  // brands
  library.add()

  // regular (free)
  library.add(faUserCircle, faCommentAlt)
}
