import React, { Component, CSSProperties, ReactNode } from 'react'
import { Anchor, Block, Button, FlexSpacer, Image, MenuDrop, MenuItem } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { INavigationItem } from './interfaces'
import logo128 from '../../../../assets/images/logo-128.png'
import _ from '../../../../app/lib/language'
import './header.scss'

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

interface IHeaderState {
  isNavOpen: boolean
}

export default class Header extends Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    isNavOpen: false
  }

  render() {
    const {
      centerNode,
      className,
      leftImage,
      leftSpace,
      leftTitle,
      navigation,
      overrideLeftNode,
      overrideRightNode,
      style
    } = this.props
    const { isNavOpen } = this.state

    return (
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
                            title={_`app-name` + ' | ' + _`Homepage`}
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
                            title={_`app-name` + ' | ' + _`Homepage`}
                          >
                            <span className="fg-primary bold">{_`app-name`}</span>
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
                  onClick={() => this.setState({ isNavOpen: true })}
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
              onClose={() => this.setState({ isNavOpen: false })}
              align="right"
            >
              <Block className="font-S">
                <Anchor
                  to="/"
                  title={_`app-name` + ' | ' + _`Homepage`}
                  style={{ textDecoration: 'none' }}
                  onClick={() => this.setState({ isNavOpen: false })}
                >
                  <span className="fg-primary bold">{_`app-name`}</span>
                </Anchor>
              </Block>
              {navigation &&
                navigation.map((navRoute, i) => (
                  <MenuItem
                    key={i}
                    to={navRoute.to}
                    onClick={() => this.setState({ isNavOpen: false })}
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
  }
}
