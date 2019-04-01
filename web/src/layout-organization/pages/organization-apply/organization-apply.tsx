import React, { useState } from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Block, Content, Page, Yoga } from 'gerami'
import { IOrganizationRequest } from '../../../../../api/modules/organization/organization.apiv'
import { IAccountRequest } from '../../../../../api/modules/account/account.apiv'
import AccountRegister from '../../../shared/components/account-register/account-register'
import OrganizationApplyAbout from './components/organization-apply-about/organization-apply-about'
import OrganizationApplyLegal from './components/organization-apply-legal/organization-apply-legal'
import OrganizationApplyBrand from './components/organization-apply-brand/organization-apply-brand'
import OrganizationApplyBio from './components/organization-apply-bio/organization-apply-bio'

function OrganizationApply() {
  const { loading, t } = useLocale(['organization'])

  const [organization, setOrganization] = useState<IOrganizationRequest>({
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
    // ... logo
    motto: undefined,
    website: undefined,

    // about
    type: 'NGO',
    locations: [],

    // bio
    bio: ''
  })

  const setAccount = (account: IAccountRequest): void => {
    setOrganization({ ...organization, ...{ account } })
  }

  return (
    loading || (
      <Page>
        <Content size={'XXL'} transparent>
          <Block first className={'padding-horizontal-normal'}>
            <h1>Organization Application</h1>
          </Block>

          <hr />

          <Block last className={'padding-horizontal-normal font-S fg-blackish'}>
            Fill in your organization's information and submit this form. We will review,
            cross-check and verify your information to register you on the system. We will
            send you an email, right after submission of this form and when we finish
            reviewing your application.
          </Block>

          <Yoga maxCol={2}>
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
        </Content>
      </Page>
    )
  )
}

export default OrganizationApply
