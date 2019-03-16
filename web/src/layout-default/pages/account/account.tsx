import React from 'react'
import { Anchor, Button, Page } from 'gerami'

import _ from '../../../lib/language'
import { useUserDispatch, useUserState } from '../../../app/stores/user/user-provider'
import { logout } from '../../../app/stores/user/user-actions'

export default function Account() {
  const userState = useUserState()
  const userDispatch = useUserDispatch()

  // todo
  return (
    <Page>
      <h1>{_`Account Settings`}</h1>

      {userState.user ? (
        <Button onClick={async () => userDispatch(await logout())} primary>
          Logout
        </Button>
      ) : (
        <Anchor to="/login">Login</Anchor>
      )}
    </Page>
  )
}
