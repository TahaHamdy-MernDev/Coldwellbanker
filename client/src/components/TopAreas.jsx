import React, { useEffect, useState } from 'react'
import Title from './Common/Title'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FetchTopAreas } from '../Api/ApiCalls'
import DataLoader from './Common/DataLoader'

export default function TopAreas() {
  const { t, i18n } = useTranslation()
  const [topArea, setTopArea] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchTopAreas()
        console.log(data)
        setTopArea(data)
      } catch (error) {
        console.error('Error fetching latest properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <section className="container-xxl section-padding">
      <div className="container">
        <Title title={t('topArea')} />
        <div className="row p-0">
          {loading ? (
            <DataLoader />
          ) : (
            topArea?.map((area, index) => {
              const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${area?.images[0].url}`
              const name = area.title[i18n.language] 
              return (
                <Link
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={300 * index}
                  key={index}
                  to={`/properties-in/${area._id}`}
                  className="position-relative area-card p-0 d-flex justify-content-start align-items-center gap-2"
                >
                  <span className="area-overlay position-absolute top-0 start-0 w-100 h-100 z-2 "></span>
                  <img
                    loading="lazy"
                    src={itemImage}
                    className="area-image w-100"
                  />
                  <div className=" z-3 text-primary-white position-absolute bottom-0 start-0 w-100 d-flex justify-content-center flex-column gap-2 align-items-center">
                    <h3 className="text-primary-white text-center text-wrap ">
                      {name}
                    </h3>
                    <h6 className="text-primary-white">
                      {area.numberOfCompounds || 0} {t('properties')}
                    </h6>
                    <h6 className="text-primary-white">
                      {area.numberOfProperties || 0} {t('properties')}
                    </h6>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
