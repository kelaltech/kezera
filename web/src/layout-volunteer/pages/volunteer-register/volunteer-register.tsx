import React, { useState } from 'react'
import AccountRegister from '../../../shared/components/account-register/account-register'
import { IAccountRequest } from '../../../../../api/modules/account/account.apiv'

function VolunteerRegister() {

  const [account, setAccount] = useState<IAccountRequest>({
    displayName: '',
    email: '',
    password: '',
    phoneNumber: null
  })
  return (
    <div>
      <h1>REGISTER page</h1>

      <div
        style={{
          width: '60%',
          margin: '0 auto'
        }}
      >
        <AccountRegister account={account} setAccount={setAccount}/>
      </div>
    </div>
  )
}

export default VolunteerRegister
