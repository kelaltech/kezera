import React, { CSSProperties, ReactNode, useState } from 'react'
import { Anchor, Block, Button, FlexSpacer, Image, MenuDrop, MenuItem } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './header.scss'
import useLocale from '../../../hooks/use-locale/use-locale'
import { INavigationItem } from './interfaces'
import wordmark from '../../../../assets/images/wordmark-512.png'
import logo from '../../../../assets/images/logo-512.png'
import { useAccountState } from '../../../../app/stores/account/account-provider'
import AccountPhoto from '../../../pages/account-detail/components/account-photo/account-photo'

export interface IHeaderProps {
  centerNode?: ReactNode | null
  className?: string
  leftImage?: ReactNode | null
  navigation?: INavigationItem[]
  overrideLeftNode?: ReactNode | null
  overrideRightNode?: ReactNode | null
  style?: CSSProperties
}

export default function Header({
  centerNode,
  className,
  leftImage,
  navigation,
  overrideLeftNode,
  overrideRightNode,
  style
}: IHeaderProps) {
  const { loading, t } = useLocale([], { loading: null })

  const [isNavOpen, setIsNavOpen] = useState(false)

  const { account } = useAccountState()

  return (
    loading || (
      <header className={`header ${className || ''}`} style={style}>
        <div className="header-shade-area">
          <Block className="header-block bg-white flex">
            {overrideLeftNode === null
              ? undefined
              : overrideLeftNode || (
                  <div className={'margin-right-normal'}>
                    {leftImage === null
                      ? undefined
                      : leftImage || (
                          <>
                            <div className={'header-nav-max-view'}>
                              <Image
                                src={wordmark}
                                className="header-logo middle"
                                to="/"
                                title={t`app-name` + ' | ' + t`Homepage`}
                              />
                            </div>
                            <div className={'header-nav-min-view'}>
                              <Image
                                src={logo}
                                className="header-logo middle"
                                to="/"
                                title={t`app-name` + ' | ' + t`Homepage`}
                              />
                            </div>
                          </>
                        )}
                  </div>
                )}

            {centerNode === null ? undefined : centerNode || <FlexSpacer />}

            {overrideRightNode === null
              ? undefined
              : overrideRightNode || (
                  <div className="header-nav-max-view middle">
                    {navigation &&
                      navigation.map((navRoute, i) => (
                        <Anchor
                          key={i}
                          to={navRoute.to}
                          className="header-nav-links middle"
                          title={navRoute.name}
                        >
                          <div className="flex">
                            <span className="center">
                              <FontAwesomeIcon icon={navRoute.icon} className="font-S" />
                              <span className="padding-horizontal-normal" />
                              {navRoute.shortName || navRoute.name}
                            </span>
                          </div>
                        </Anchor>
                      ))}
                  </div>
                )}

            {overrideRightNode !== undefined || !navigation || !navigation.length ? (
              undefined
            ) : (
              <div className="header-nav-min-view middle">
                <Button
                  className="header-nav-btn middle"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  <FontAwesomeIcon icon="bars" />
                </Button>
              </div>
            )}

            {account && (
              <AccountPhoto
                className={'header-account-photo middle'}
                title={`${t`account:account-settings`}: ${account.displayName}`}
                readonly
                buttonPropsOverride={{ to: '/account' }}
              />
            )}
          </Block>
        </div>

        {overrideRightNode !== undefined || !navigation || !navigation.length ? (
          undefined
        ) : (
          <div className="header-nav-drop-vault header-nav-min-view">
            <MenuDrop
              className="header-nav-drop"
              open={isNavOpen}
              onClose={() => setIsNavOpen(false)}
              align="right"
            >
              <Block className="font-S">
                <Anchor
                  to="/"
                  title={t`app-name` + ' | ' + t`Homepage`}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setIsNavOpen(false)}
                >
                  <span className="bold">{t`app-name`}</span>
                </Anchor>
              </Block>
              {navigation &&
                navigation.map((navRoute, i) => (
                  <MenuItem
                    key={i}
                    to={navRoute.to}
                    onClick={() => setIsNavOpen(false)}
                    className="header-nav-drop-items"
                  >
                    <FontAwesomeIcon icon={navRoute.icon} />
                    <span className="padding-horizontal-normal" />
                    {navRoute.name}
                  </MenuItem>
                ))}
            </MenuDrop>
          </div>
        )}
      </header>
    )
  )
}
