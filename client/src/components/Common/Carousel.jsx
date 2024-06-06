import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider from 'react-slick'

export default function Carousel({ items = [], Component, settings }) {
  const { i18n } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slider, setSlider] = useState(null)

  useEffect(() => {
    if (slider) {
      slider.slickGoTo(currentSlide)
    }
  }, [currentSlide, slider])

  const afterChangeHandler = (current) => {
    setCurrentSlide(current)
  }

  function SampleNextArrow(props) {
    const { onClick } = props
    return (
      <div className="carousel-next" onClick={onClick}>
        <IoIosArrowForward />
      </div>
    )
  }

  function SamplePrevArrow(props) {
    const { onClick } = props
    return (
      <div className="carousel-prev" onClick={onClick}>
        <IoIosArrowBack />
      </div>
    )
  }

  const customSettings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: afterChangeHandler,
    ...settings,
  }


  return (
    <>
      {items.length > 0 ? (
        <div className="carousel-container">
          <Slider ref={c => setSlider(c)} {...customSettings}>
            {items.map((item, index) => (
              <div key={index} className="carousel-slide px-1 px-lg-2">
                <Component item={item} index={index} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center no-data">
          No data to show
        </div>
      )}
    </>
  );
}