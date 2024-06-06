import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  MapPin,
  Printer,
  Share2,
  X,
} from 'lucide-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link, useParams } from 'react-router-dom'
import { FetchProperty } from '../Api/ApiCalls'
import ShareDropdown from '../components/Common/Share'
import { useTranslation } from 'react-i18next'
import { FaPhone, FaPhoneAlt, FaPrint, FaWhatsapp } from 'react-icons/fa'
import { formatNumber } from '../assets/common'
import { BathRoom, BedRoom, FT, GarageAttached } from '../assets/icons'
import Gallery from '../components/Common/Gallery'
import { ContactUs, Whatsapp } from '../components/Common/Buttons'
import ContactForm from '../components/ContactForm'
import Form from '../components/Common/Form'

export default function PropertyDetails() {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  console.log(id)
  const [property, setProperty] = useState()
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchProperty(id)
        setProperty(data)
      } catch (error) {
        console.error('Error fetching developers:', error)
      }
    }
    fetchData()
  }, [id])
  console.log('property', property)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = (index) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(0)
  }

  const openLightbox = (index) => {
    setActiveIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className="custom-slick-arrow left"
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      >
        <ArrowLeft size={18} />
      </div>
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className="custom-slick-arrow right"
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      >
        <ArrowRight size={18} />
      </div>
    )
  }

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    lazyLoad: true,
    focusOnSelect: true,
    autoplaySpeed: 10000,
    nextArrow: <SampleNextArrow className="custom-slick-arrow" />,
    prevArrow: <SamplePrevArrow className="custom-slick-arrow" />,
    initialSlide: activeIndex,
  }
  const images = [
    '/property/1.jpg',
    '/property/2.jpg',
    '/property/3.jpg',
    '/property/4.jpg',
    '/property/5.jpg',
    '/property/6.jpg',
  ]
  const [selectedAmenities, setSelectedAmenities] = useState([
    'WiFi',
    'Gym',
    'Laundry',
    'City View',
    'Gated Community',
  ])
  const baseText = `Hello ${property?.developer[0].name[i18n.language]}! I'm interested in your property ${property?.name[i18n.language]}. Link: `
  const encodedBaseText = encodeURIComponent(baseText)
  const encodedUrl = encodeURIComponent(window.location.href)

  const whatsappLink = `https://wa.me/${property?.contactUs}?text=${encodedBaseText}${encodedUrl}`

  const developerImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${property?.developer[0].images[0].url}`
  const propertyDescription = property?.description[i18n.language]
  return (
    <>
      <Gallery property={property} />
      <section className=" position-relative container-xxl section-padding">
        <div className="mt-2 w-100 position-absolute d-none top-0 d-md-flex justify-content-end align-items-center gap-2 px-4">
          <button
            style={{ cursor: 'pointer' }}
            className=" btn font-inter bg-white rounded-2 p-2 shadow-sm"
          >
            <FaPrint /> {t('print')}
          </button>
          <ShareDropdown />
        </div>
        <div className="row">
          <div className="col-md-12 d-flex flex-column flex-md-row mx-auto">
            <div className="col-md-2 d-flex justify-content-md-center align-items-center ">
              <Link to={`/developer-details/${property?.developer[0]._id}`}>
                <img
                  loading="lazy"
                  src={developerImage}
                  className=" object-fit-cover rounded-4 border shadow"
                  draggable="false"
                  width="140"
                  height="140"
                  alt="developer logo"
                />
              </Link>
            </div>
            <div
              className="col-md-10 d-flex flex-column mt-2 "
              style={{ marginRight: '15px' }}
            >
              {/* <div className=" d-flex">
                <span className="tag tag-blue text-white">
                  {t(property?.forRent ? 'rent' : 'sale')}
                </span>
              </div> */}
              <div className=" col-md-12 d-flex flex-column ">
                <div className=" d-flex flex-column flex-md-row">
                  <h1 className="property-title fs-3 mt-2 col-md-10 justify-content-center align-items-center">
                    {property?.name[i18n.language]}
                  </h1>
                </div>

                <div className=" d-flex gap-1 justify-content-start">
                  <MapPin size={16} />
                  <p className="">
                    {property?.area[0].title[i18n.language]},{' '}
                    {property?.addressLocality[i18n.language]}
                  </p>
                </div>
                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <div>
                    <p style={{ fontSize: '12px' }} className="mb-0">
                      {' '}
                      {t('propertyDetails.pricesStartFrom')}
                    </p>
                    <span className=" d-flex justify-content-start gap-0 gap-md-2 flex-column flex-md-row">
                      <h3>
                        {formatNumber(property?.min_price)} {t('egp')}
                      </h3>
                      <span className=" d-flex justify-content-start align-items-start flex-column flex-md-row align-items-md-center ">
                        <p style={{ fontSize: '12px' }} className=" mb-0">
                          {t('propertyDetails.maxPrice')}:
                        </p>{' '}
                        <h3>
                          {formatNumber(property?.max_price)} {t('egp')}
                        </h3>
                      </span>
                    </span>
                  </div>
                  <div className=" mt-2 d-flex justify-content-start flex-wrap align-items-center justify-content-md-end gap-2">
                    <ContactUs number={property?.contactUs} />
                    <Whatsapp
                      number={property?.contactUs}
                      itemName={property?.name[i18n.language]}
                      developerName={property?.developer[0].name[i18n.language]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-xxl section-padding">
        <div className="container">
          <div className="row gy-4 gx-5">
            <div className="col-md-9">
              <div className="card-style">
                <div className="d-flex flex-column flex-md-row justify-content-start gap-4">
                  <div className=" d-flex flex-column gap-1 justify-content-center align-items-start align-items-md-start">
                    <p className=" mb-1 fs-6">{t('propertyType')}</p>
                    <p>{property?.type[0].name[i18n.language]}</p>
                  </div>
                  <div className=" d-flex flex-column gap-1 justify-content-center align-items-start align-items-md-center">
                    <BathRoom />
                    <p>
                      {' '}
                      {property?.number_of_bathrooms} {t('bathRooms')}
                    </p>
                  </div>
                  <div className=" d-flex flex-column gap-1 justify-content-center align-items-start align-items-md-center">
                    <BedRoom />
                    <p>
                      {' '}
                      {property?.number_of_bedrooms} {t('bedRooms')}
                    </p>
                  </div>
                  <div className=" d-flex flex-column gap-1 justify-content-center align-items-start align-items-md-center">
                    <GarageAttached />
                    <p>
                      {' '}
                      {property?.number_of_cars || 0} {t('car')}
                    </p>
                  </div>
                  <div className=" d-flex flex-column gap-1 justify-content-center align-items-start align-items-md-center">
                    <FT />
                    <p> {property?.max_unit_area || 0} m2</p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h2 className="fs-5 mb-3">
                  {t('propertyDetails.about')} {property?.name[i18n.language]}
                </h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: propertyDescription }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className=' card-style p-2 position-sticky' style={{top:"160px"}}>
                <Form/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
