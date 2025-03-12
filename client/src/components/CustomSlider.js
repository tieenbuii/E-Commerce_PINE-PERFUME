import React, {memo} from 'react'
import Slider from 'react-slick'
import {Product} from './'

var settings = {
    dots: false,
    infinity: false,
    speed: 500,
    sliderToShow: 3,
    sliderToScroll: 1,
  };

const CustomSlider = ({products, activeTab}) => {
  return (
    <>
        {products && <Slider {...settings}>
          {products?.map((el,index) => (
                <Product
                    key={index}
                    pid={el.id}
                    productData={el}
                    isNew={activeTab === 1 ? false : true}
                />
          ))}
        </Slider>}
    </>
  )
}

export default memo(CustomSlider)