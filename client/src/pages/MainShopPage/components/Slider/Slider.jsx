import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../../../../assets/slide1.png'
import slide2 from '../../../../assets/slide2.png'
import './index.css'


const SliderItem = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Slider className={'slide'} {...settings}>
      <div>
        <img className={'slideItem'} src={slide1} alt="Image 1"/>
      </div>
      <div>
        <img className={'slideItem'} src={slide2} alt="Image 2"/>
      </div>
    </Slider>
  );
};

export default SliderItem;
