import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Slider from 'react-slick';
import { X } from 'lucide-react';
import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';
export default function Gallery({ property }) {
  const {t,i18n} =useTranslation()
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const openLightbox = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(0);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const onSubmit = (data) => {
    console.log(data); // Log form data
  };


  return (
    <section className="container-xxl section-padding mb-2">
      <div className="container">
        <div className="image-gallery">
          {property?.images.map((image, index) => (
            <div
              className={`image-container ${index === activeIndex ? 'active' : ''}`}
              key={index}
              onClick={() => openLightbox(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <LazyLoad height={200} offset={100}>
                <img
                  loading="lazy"
                  src={`${import.meta.env.VITE_IMAGE_ORIGIN}/${image.url}`}
                  alt={`Image ${index + 1}`}
                  className="gallery-image"
                />
              </LazyLoad>
            </div>
          ))}
        </div>
        {isOpen && (
          <div className="lightbox_property_wrapper">
            <div className="lightbox_property_wrapper_level2">
              <div className="lighbox-image-close"> <X onClick={closeLightbox} /> </div>
              <div className="lightbox_property_content row">
                <div className="lightbox_property_slider col-md-10">
                  <Slider {...settings}>
                    {property.images.map((image, index) => (
                      <div key={index}>
                        <img
                          loading="lazy"
                          src={`${import.meta.env.VITE_IMAGE_ORIGIN}/${image.url}`}
                          className="property-slider"
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className=" col-md-3">
                <div className="d-flex flex-column gap-2 mt-4 p-2">
                    <h3 className=" fs-5">{property?.name[i18n.language]}</h3>
                    <h4 className=" fs-6">Want to find out more?</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className=" p-3">
                      <input
                        className="form-control mb-3"
                        {...register("firstName", { required: true })}
                        placeholder="Your Name"
                      />
                      {errors.firstName && <span>This field is required</span>}
                      <input
                        className="form-control mb-3"
                        {...register("phone", { required: true })}
                        placeholder="Your Phone"
                      />
                      {errors.phone && <span>This field is required</span>}
                      <input
                        className="form-control mb-3"
                        {...register("email", { required: true })}
                        placeholder="Your Email"
                      />
                      {errors.email && <span>This field is required</span>}
                      <textarea
                        id="agent_comment"
                        {...register("comment", { required: true })}
                        className="form-control mb-3"
                        cols="45"
                        rows="6"
                        aria-required="true"
                        placeholder="Comment"
                      />
                      {errors.comment && <span>This field is required</span>}
                      <button
                        type="submit"
                        className="btn button-primary w-100"
                      >
                        Send Email
                      </button>
                    </form>
                  </div>
             
         
                </div>
              </div>
            </div>
            <div className="lighbox_overlay" onClick={closeLightbox}></div>
          </div>
        )}
      </div>
    </section>
  );
}
