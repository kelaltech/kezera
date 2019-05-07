import React, { CSSProperties, ReactNode, useState } from 'react'
import { Anchor, Block, Button, FlexSpacer, Image, MenuDrop, MenuItem } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './header.scss'
import useLocale from '../../../hooks/use-locale/use-locale'
import { INavigationItem } from './interfaces'
import logo128 from '../../../../assets/images/logo-128.png'

export interface IHeaderProps {
  centerNode?: ReactNode | null
  className?: string
  leftImage?: ReactNode | null
  leftSpace?: ReactNode | null
  leftTitle?: ReactNode | null
  navigation?: INavigationItem[]
  overrideLeftNode?: ReactNode | null
  overrideRightNode?: ReactNode | null
  style?: CSSProperties
}

export default function Header({
  centerNode,
  className,
  leftImage,
  leftSpace,
  leftTitle,
  navigation,
  overrideLeftNode,
  overrideRightNode,
  style
}: IHeaderProps) {
  const { loading, t } = useLocale([], { loading: null })

  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    loading || (
      <header className={`header ${className || ''}`} style={style}>
        <div className="header-shade-area">
          <Block className="header-block bg-white flex">
            {overrideLeftNode === null
              ? undefined
              : overrideLeftNode || (
                  <div>
                    {leftImage === null
                      ? undefined
                      : leftImage || (
                          <Image
                            src={logo128}
                            className="header-logo middle"
                            to="/"
                            title={t`app-name` + ' | ' + t`Homepage`}
                          />
                        )}
                    {leftSpace === null
                      ? undefined
                      : leftSpace || (
                          <span className="header-separator middle light">|</span>
                        )}
                    {leftTitle === null
                      ? undefined
                      : leftTitle || (
                          <Anchor
                            to="/"
                            className="header-wordmark middle"
                            title={t`app-name` + ' | ' + t`Homepage`}
                          >
                            <span className="bold">{t`app-name`}</span>
                          </Anchor>
                        )}
                  </div>
                )}

            {centerNode === null ? undefined : centerNode || <FlexSpacer />}

            {overrideRightNode === null
              ? undefined
              : overrideRightNode || (
                  <div className="header-nav-max-view">
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
              <div className="header-nav-min-view">
                <Button
                  className="header-nav-btn middle"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  <FontAwesomeIcon icon="bars" />
                </Button>
              </div>
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
