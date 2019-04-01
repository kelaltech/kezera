import React, { Component } from 'react'

import { Block, Page, Image, AccordionSlider, SlideShow } from 'gerami'
import img3 from '../../../../assets/images/login/promo-1.jpg'
import img1 from '../../../../assets/images/news-temp.jpg'

export default class RequestImages extends Component<any, any> {
  render() {
    return (
      <Page>
        <Block first>
          <SlideShow
            images={[
              { image: img3, caption: 'Baby 1' },
              { image: img1, caption: 'Baby 2' },
              { image: img3, caption: 'Baby 3' },
              { image: img1, caption: 'Baby 4' },
              { image: img3, caption: 'Baby 5' }
            ]}
            height={'400px'}
            autoPlay={true}
            showControls={true}
            interval={5000}
            animation={'fade'}
          />
        </Block>
      </Page>
    )
  }
}
