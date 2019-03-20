import React, { useEffect, useRef, useState } from 'react'
import {
  Anchor,
  Block,
  Button,
  Content,
  Flex,
  FlexSpacer,
  Image,
  Input,
  Loading,
  Page
} from 'gerami'

import { login, logout } from '../../../app/stores/account/account-actions'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import promo1 from '../../../assets/images/login/promo-1.jpg'
import './account-login.scss'

export default function AccountLogin() {
  const userState = useAccountState()
  const userDispatch = useAccountDispatch()

  const [drama, setDrama] = useState(true)
  const [loading, setLoading] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDrama(false)

    if (emailRef.current) emailRef.current.focus()
  }, [])

  const handleLogin = async (event: any): Promise<void> => {
    event.preventDefault()
    setLoading(true)

    try {
      const action = await login(
        event.target['email'].value,
        event.target['password'].value
      )
      userDispatch(action)
    } catch (e) {
      // todo: handle e
      console.error(e)
      setLoading(false)
    }
  }

  const handleLogout = async (): Promise<void> => {
    // todo: loading
    userDispatch(await logout())
    // todo: then what? catch, error handling
  }

  return (
    <Page bottom>
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
          <div className={'account-login-image-container'}>
            <Image
              src={promo1}
              className={`${(drama && 'account-login-image-drama') ||
                ''} account-login-image`}
            />
          </div>
          <div className={'account-login-form-container'}>
            <form onSubmit={handleLogin}>
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
                  disabled={loading}
                />
              </Block>
              <Block>
                <Input
                  className={'full-width'}
                  name="password"
                  type="password"
                  label="Password"
                  disabled={loading}
                />
                <Anchor className="account-login-links font-S fg-blackish" to="/reset">
                  Forgot password?
                </Anchor>
              </Block>

              <Block last className={'padding-top-none'}>
                <Flex>
                  <Anchor className="account-login-links" to="/user/register">
                    Create New Account
                  </Anchor>
                  <FlexSpacer />
                  {loading ? (
                    <Loading className={'padding-none'} />
                  ) : (
                    <Button type="submit" disabled={loading} primary>
                      Login
                    </Button>
                  )}
                </Flex>
              </Block>
            </form>
          </div>
        </Content>
      )}
    </Page>
  )
}
