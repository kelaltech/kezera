import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './volunteer-product-slider.scss'
function ProductSlider(props: any) {
  const { children, sliderWidth } = props

  const handleNext = () => {
    let parent: any = document.getElementById('product-slider')
    parent.scrollBy(300, 0)
  }
  const handlePrev = () => {
    let parent: any = document.getElementById('product-slider')
    parent.scrollBy(-300, 0)
  }
  return (
    <div className={'gerami-product-slider-container'}>
      <span onClick={handlePrev} className={'product-previous-arrow product-nav'}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>
      <span onClick={handleNext} className={'product-next-arrow product-nav'}>
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
      <div className={'gerami-product-slider-scroll'} id={'product-slider'}>
        <div style={{
          width: sliderWidth
        }} className={'gerami-product-slider-item-box'}>{children}</div>
      </div>
    </div>
  )
}

export default ProductSlider
