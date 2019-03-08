import React, { Component } from 'react'
import { Image } from 'gerami'

import _ from '../../../app/lib/language'
import logo128 from '../../../assets/images/logo-128.png'
import './default-promotion.scss'

export default class DefaultPromotion extends Component<{}, {}> {
  render() {
    return (
      <div className="default-promotion">
        <div className="padding-big">
          <div className="padding-top-big center">
            <Image className="default-promotion-logo" src={logo128} size="XL" />
          </div>
          <h1 className="padding-big center light">
            <span>{_`app-name`}</span>{' '}
            <span className="fg-whitish">is brought to you by</span>{' '}
            <span style={{ fontFamily: 'Kelal Wordmark' }}>{_`kelal tech`}</span>
            <span className="fg-whitish">.</span>
          </h1>
        </div>
      </div>
    )
  }
}
