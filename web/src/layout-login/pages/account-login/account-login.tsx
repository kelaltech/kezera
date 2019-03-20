import React, { useEffect, useRef, useState } from 'react'
import {
  Anchor,
  Block,
  Button,
  Content,
  Flex,
  FlexSpacer,
  Input,
  Page,
  Yoga
} from 'gerami'

import { login, logout } from '../../../app/stores/account/account-actions'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import promo1 from '../../../assets/images/login/promo-1.jpg'
import './account-login.scss'

export default function AccountLogin() {
  const [drama, setDrama] = useState(true)
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (emailRef.current) emailRef.current.focus()
    setDrama(false)
  }, [])

  const userState = useAccountState()
  const userDispatch = useAccountDispatch()

  const handleLogin = async (event: any): Promise<void> => {
    event.preventDefault()
    // todo: loading
    const action = await login(
      event.target['emailOrUsername'].value,
      event.target['password'].value
    )
    userDispatch(action)
    // todo: then what? catch, error handling
  }

  const handleLogout = async (): Promise<void> => {
    // todo: loading
    userDispatch(await logout())
    // todo: then what? catch, error handling
  }

  return (
    <Page bottom>
      <Block>
        {userState.account ? (
          <Content size={'L'}>
            <Block first last>
              <Flex>
                <span>
                  You are already logged in as:
                  <br />
                  <Anchor to="/account">
                    {userState.account!.displayName} ({userState.account!.email})
                  </Anchor>
                </span>
                <FlexSpacer />
                <Button onClick={handleLogout} primary>
                  Logout
                </Button>
              </Flex>
            </Block>
          </Content>
        ) : (
          <Content size={'XL'}>
            <Yoga maxCol={2} className={'login-yoga'}>
              <div className="top" style={{ overflow: 'hidden' }}>
                <div
                  className={`${(drama && 'login-image-drama') || ''} login-image`}
                  style={{ backgroundImage: `url(${promo1})` }}
                />
              </div>

              <form className={'top'} onSubmit={handleLogin}>
                <Block first>
                  <h1>Login</h1>
                </Block>

                <hr />

                <Block first>
                  <Input
                    inputRef={emailRef}
                    className={'full-width'}
                    name="email"
                    type="text"
                    label="Email"
                  />
                </Block>
                <Block>
                  <Input
                    className={'full-width'}
                    name="password"
                    type="password"
                    label="Password"
                  />
                  <Anchor className="login-links font-S fg-blackish" to="/reset">
                    Forgot password?
                  </Anchor>
                </Block>

                <Block last className={'padding-top-none'}>
                  <Flex>
                    <Anchor className="login-links" to="/user/register">
                      Create New Account
                    </Anchor>
                    <FlexSpacer />
                    <Button type="submit" primary>
                      Login
                    </Button>
                  </Flex>
                </Block>
              </form>
            </Yoga>
          </Content>
        )}
      </Block>
    </Page>
  )
}
