import React, { useEffect } from 'react'
import { Anchor, Block, Button, Content, Flex, Input } from 'gerami'

import useLocale from '../../../../../shared/hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../../../api/modules/organization/organization.apiv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useField from '../../../../../shared/hooks/use-field/use-field'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationApplyLegal({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const licensedNamesInput = useField()

  const removeLicensedName = (name: string, index: number): void => {
    emitChanges({
      licensedNames: organization.licensedNames.filter(
        (n, i) => n !== name && i !== index
      )
    })
  }
  const addLicensedName = (): void => {
    emitChanges({
      licensedNames: organization.licensedNames.concat([licensedNamesInput.value])
    })
    licensedNamesInput.setValue('', false)
  }

  return (
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          Legal
        </Block>

        <hr />

        <Block>
          <Flex>
            <FontAwesomeIcon className={'margin-right-big margin-auto'} icon={'hammer'} />
            <div className={'full-width'}>
              <div className={'font-S'}>
                <span className={'light fg-blackish'}>
                  Licensed Names
                  {!organization.licensedNames.length ? null : (
                    <span className={'italic'}> (double click to remove)</span>
                  )}
                  :{' '}
                </span>
                <span>
                  {organization.licensedNames.map((name, i) => (
                    <span key={i}>
                      <Anchor onDoubleClick={() => removeLicensedName(name, i)}>
                        {name}
                      </Anchor>
                      {i >= organization.licensedNames.length - 1 ? null : <>, </>}
                    </span>
                  ))}
                </span>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault()
                  addLicensedName()
                }}
              >
                <Flex>
                  <Input
                    className={'margin-vertical-normal margin-auto full-width'}
                    {...licensedNamesInput.inputProps}
                    label={`New licensed name`}
                  />
                  <Button
                    type={'submit'}
                    className={
                      'margin-auto margin-left-normal padding-vertical-small padding-horizontal-normal font-S'
                    }
                    title={'Add licensed name'}
                  >
                    <FontAwesomeIcon icon={'plus'} />
                  </Button>
                </Flex>
              </form>
            </div>
          </Flex>
        </Block>

        <Block last>registrations: ...</Block>
      </Content>
    )
  )
}

export default OrganizationApplyLegal
