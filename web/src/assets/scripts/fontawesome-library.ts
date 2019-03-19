import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faBars,
  faSignInAlt,
  faShareAlt,
  faHeart as faSolidHeart
} from '@fortawesome/free-solid-svg-icons'
// import { } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle, faHeart, faCommentAlt } from '@fortawesome/free-regular-svg-icons'

export default function fontawesomeLibrary() {
  library.reset()

  // solid
  library.add(faBars, faSignInAlt, faShareAlt, faSolidHeart)

  // brands
  library.add()

  // regular (free)
  library.add(faUserCircle, faHeart, faCommentAlt)
}
