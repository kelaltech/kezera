import { library } from '@fortawesome/fontawesome-svg-core'

import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
// import { } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

export default function fontawesomeLibrary() {
  library.reset()

  // solid
  library.add(faBars, faSignInAlt)

  // brands
  library.add()

  // regular (free)
  library.add(faUserCircle)
}
