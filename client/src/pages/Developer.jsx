import React, { useEffect, useState } from 'react'
import { FetchDeveloper } from '../Api/ApiCalls'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ShareDropdown from '../components/Common/Share'
import { formatNumber } from '../assets/common'
import { FaPhoneAlt } from 'react-icons/fa'
import Compound from '../components/Cards/Compound'
import Property from '../components/Cards/Property'

export default function Developer() {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const [developer, setDeveloper] = useState()
  const [compounds, setCompounds] = useState()
  const [properties, setProperties] = useState()
  console.log(id)
  useEffect(() => {
    async function fetchData() {
      const data = await FetchDeveloper(id)
      setDeveloper(data.developer)
      setCompounds(data.compounds)
      setProperties(data.properties)
    }
    fetchData()
  }, [id])
  console.log(developer)
  console.log(compounds)
  console.log(properties)

  const developerImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${developer?.images[0].url}`
  const developerName = developer?.name[i18n.language]
  const availableProperties = developer?.properties.length
  const developerDescription = developer?.description[i18n.language]
  return (
    <>
      <section className=" container-xxl section-padding">
        <div className="container">
          <div className="col-md-12 mx-auto ">
            <div className="row " style={{ top: '100px' }}>
              <div className="col-md-2 mb-4">
                <div className=" d-flex justify-content-start justify-content-md-center">
                  <img
                    loading="lazy"
                    src={developerImage}
                    alt={developerName}
                    className="shadow-img rounded-circle"
                    width="120"
                    height="120"
                  />
                </div>
              </div>
              <div className="col-md-10">
                <h1 className=" mb-2 fs-3 text-capitalize ">{developerName}</h1>
                <p style={{ fontWeight: '600' }} className=" mb-1">
                  {availableProperties} {t('developers.propertiesAvailable')}{' '}
                </p>
                <p className=" mb-0">{t('developers.priceStartFrom')} </p>
                <div className=" fs-3" style={{ fontWeight: '600' }}>
                  {formatNumber(10000000)} {t('egp')}
                </div>
                <div className=" mt-3 d-flex justify-content-center justify-content-md-end gap-2">
                  <ShareDropdown />
                  <button dir={i18n.dir()} className=" btn button-primary">
                    <FaPhoneAlt size={20} />
                    <span className="mx-2">{t('callUs')}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <h3>
                {t('developers.about')} {developerName}{' '}
              </h3>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: developerDescription }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container-xxl section-padding">
        <div className="container">
        <div className="row gx-4 gy-5">
          <h3> properties</h3>
          { properties?.map((property, index) => {
            console.log(property);
                return (
                  <div dir={i18n.dir} key={index} className=" col-md-4 px-1 px-lg-2">
                    <Property item={property} index={index} />
                  </div>
                )
              })}
        </div>
        </div>
      </section>
    </>
  )
}
