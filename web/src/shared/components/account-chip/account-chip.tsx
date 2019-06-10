import React from 'react'
import { Anchor, Content, Flex, Image } from 'gerami'
import { IContentProps } from 'gerami/src/components/Content/Content'
import { IAnchorProps } from 'gerami/src/components/Anchor/Anchor'

import './account-chip.scss'
import logo128 from '../../../assets/images/logo-128.png'
import { IAccountPublicResponse } from '../../../apiv/account.apiv'

type Props = IContentProps & {
  account: IAccountPublicResponse
  anchorProps?: IAnchorProps

  setSelected?: (selected: boolean) => void
  selected?: boolean
}

function AccountChip({
  account,
  anchorProps: allAnchorProps = {},

  setSelected,
  selected = false,

  className = '',
  ...contentProps
}: Props) {
  const { className: anchorClassName = '', ...anchorProps } = allAnchorProps

  return (
    <Content
      {...contentProps}
      className={`${className} ${selected ? 'account-chip-selected' : ''} ${
        setSelected ? 'account-chip-selectable' : ''
      } account-chip`}
    >
      <Flex className={'account-chip-flex'}>
        <Image
          className={'account-chip-photo'}
          src={account.photoUri ? `${account.photoUri}?size=64&quality=50` : logo128}
          title={setSelected && `Click to ${selected ? 'unselect' : 'select'}`}
          onClick={() => setSelected && setSelected(!selected)}
        />
        <Anchor
          className={`${anchorClassName} account-chip-anchor`}
          {...anchorProps}
          title={account.displayName}
        >
          {account.displayName}
        </Anchor>
      </Flex>
    </Content>
  )
}

export default AccountChip
