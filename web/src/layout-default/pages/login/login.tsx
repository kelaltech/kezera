import React from 'react'
import { Anchor, Block, Button, Content, Flex, FlexSpacer, Input, Page } from 'gerami'

import { useUserReducer } from '../../../app/stores/user/user-provider'
import { login, logout } from '../../../app/stores/user/user-actions'

export default function Login() {
  const [userState, userDispatch] = useUserReducer()

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
    <Page>
      <Content transparent size="XXL">
        {/* todo: error display */}

        <Block first>Login (TODO: fix the UI)</Block>

        <Block>
          {userState.user ? (
            <Content>
              <Block first last>
                <Flex>
                  <span>
                    You are already logged in as:
                    <br />
                    <Anchor to="/account">
                      {userState.user!.name} (@
                      {userState.user!.handle})
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
            <Content>
              <form onSubmit={handleLogin}>
                <Block first>
                  {/* todo: focus on this input when the page opens, if this exists */}
                  <Input name="emailOrUsername" type="text" label="Email or Username" />
                </Block>

                <Block>
                  <Input name="password" type="password" label="Password" />
                </Block>

                <Block last>
                  <Button type="submit" primary>
                    Login
                  </Button>
                  <br />
                  <br />
                  <Anchor to="/register">Create an account</Anchor>
                  <br />
                  <br />
                  <Anchor to="/reset">Forgot your password?</Anchor>
                </Block>
              </form>
            </Content>
          )}
        </Block>
      </Content>
    </Page>
  )
}
