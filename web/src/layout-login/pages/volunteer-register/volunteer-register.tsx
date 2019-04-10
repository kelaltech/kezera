import React, { useState } from 'react'
import AccountRegister from '../../../shared/components/account-register/account-register'
import { IAccountRequest } from '../../../../../api/modules/account/account.apiv'
import './volunteer-register.scss'
import { Button, Block } from 'gerami'
import axios from 'axios'
import { RouteComponentProps } from 'react-router'

function VolunteerRegister({ history }: RouteComponentProps) {
  const [account, setAccount] = useState<IAccountRequest>({
    displayName: '',
    email: '',
    password: '',
    phoneNumber: null
  })
  const handleRegister = (e: any) => {
    e.preventDefault()
    axios
      .post('/api/volunteer/register', account)
      .then(volunteer => {
        console.log(volunteer.data)
        history.push('/volunteer/account')
      })
      .catch(e => console.log(e))
  }
  return (
    <div>
      <div className={'vol-register-cont'}>
        <Block>
          <form onSubmit={handleRegister}>
            <AccountRegister account={account} setAccount={setAccount} />
            <Button className={'vol-submit-btn'} type={'submit'} primary>
              Sign up
            </Button>
          </form>
        </Block>
      </div>
    </div>
  )
}

export default VolunteerRegister
