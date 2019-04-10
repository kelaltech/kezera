import React, { MutableRefObject, RefObject, useState } from 'react'
import { Anchor, Block, Button, Flex, FlexSpacer, Loading, Yoga } from 'gerami'
import { Checkbox, InputLabel } from '@material-ui/core'
import Axios from 'axios'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../api/modules/organization/organization.apiv'
import { IAccountRequest } from '../../../../../api/modules/account/account.apiv'
import RichPage from '../../../shared/components/rich-page/rich-page'
import AccountRegister from '../../../shared/components/account-register/account-register'
import OrganizationApplyAbout from './components/organization-apply-about/organization-apply-about'
import OrganizationApplyLegal from './components/organization-apply-legal/organization-apply-legal'
import OrganizationApplyBrand from './components/organization-apply-brand/organization-apply-brand'
import OrganizationApplyBio from './components/organization-apply-bio/organization-apply-bio'

function OrganizationApply() {
  const { t } = useLocale(['organization'])

  const [error, setError] = useState<string>()
  const [state, setState] = useState<'INITIAL' | 'SENDING' | 'SENT'>('INITIAL')

  const [organization, setOrganizationOnState] = useState<IOrganizationRequest>({
    /* COLUMN 1 */

    // account
    account: {
      displayName: '',
      email: '',
      password: '',
      phoneNumber: null
    },

    // legal
    licensedNames: [],
    registrations: [],

    /* COLUMN 2 */

    // brand
    motto: undefined,
    website: undefined,

    // about
    type: 'NGO',
    locations: [],

    // bio
    bio: ''
  })
  const [logoRef, setLogoRef] = useState<
    MutableRefObject<HTMLInputElement> | RefObject<HTMLInputElement>
  >()
  const [acceptTerms, setAcceptTerms] = useState(false)

  const setOrganization = (organization: IOrganizationRequest): void => {
    if (state === 'INITIAL') setOrganizationOnState(organization)
  }
  const setAccount = (account: IAccountRequest): void => {
    setOrganization({ ...organization, ...{ account } })
  }

  const apply = (): void => {
    setState('SENDING')

    const data = new FormData()
    data.append('data', JSON.stringify(organization))
    if (
      logoRef &&
      logoRef.current &&
      logoRef.current.files &&
      logoRef.current.files.length
    ) {
      data.append('logo', logoRef.current.files[0])
    }

    Axios.post('/api/organization/apply', data, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setError(undefined)
        setState('SENT')
      })
      .catch(e => {
        setError(e.message)
        setState('INITIAL')
      })
  }

  return (
    <RichPage
      languageNamespaces={['organization', 'account']}
      title={`Organization Application`}
      description={
        state === 'SENT'
          ? undefined
          : `Fill in your organization's information and submit this form. We will review,
            cross-check and verify your information to register you on the system. We will
            send you an email, right after submission of this form and when we finish
            reviewing your application.`
      }
      error={error}
      onErrorClose={setError}
    >
      {state === 'SENT' ? (
        <>
          <Block last className={'padding-horizontal-normal'}>
            We have successfully received your application, and will contact you once
            again through your email ({organization.account.email || 'n/a'}) when we
            finish the reviewing process.
            <br />
            <br />
            Thanks!
          </Block>
        </>
      ) : (
        <>
          <Yoga maxCol={2} className={'yoga-in-rich-page'}>
            <div className={'top'}>
              <AccountRegister account={organization.account} setAccount={setAccount} />

              <OrganizationApplyLegal
                organization={organization}
                setOrganization={setOrganization}
              />
            </div>

            <div className={'top'}>
              <OrganizationApplyBrand
                organization={organization}
                setOrganization={setOrganization}
                setLogoRef={setLogoRef}
              />

              <OrganizationApplyAbout
                organization={organization}
                setOrganization={setOrganization}
              />

              <OrganizationApplyBio
                organization={organization}
                setOrganization={setOrganization}
              />
            </div>
          </Yoga>

          <hr />

          <Block last className={'padding-horizontal-none'}>
            <Flex>
              <Flex>
                <Checkbox
                  id={'accept-terms-checkbox'}
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  className={'margin-vertical-auto'}
                />
                <InputLabel
                  className={'margin-vertical-auto'}
                  htmlFor={'accept-terms-checkbox'}
                >
                  I accept the <Anchor to={'/terms'}>terms & conditions</Anchor>.
                </InputLabel>
              </Flex>
              <FlexSpacer />
              <div className={'right'}>
                {state === 'SENDING' ? (
                  <Loading className={'padding-none'} />
                ) : (
                  <Button primary onClick={() => apply()} disabled={!acceptTerms}>
                    Apply Now
                  </Button>
                )}
              </div>
            </Flex>
          </Block>
        </>
      )}
    </RichPage>
  )
}

export default OrganizationApply
