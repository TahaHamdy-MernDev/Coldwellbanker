import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FetchLaunchDetails } from '../Api/ApiCalls'
import DataLoader from '../components/Common/DataLoader'
import { useTranslation } from 'react-i18next'
import { ContactUs, Whatsapp } from '../components/Common/Buttons'
import MapContainer from '../components/Map/MapContainer'
import Map from '../components/Map/Map'
import MapComponent from '../components/Map/MapContainer'

export default function LunchDetails() {
  const { t, i18n } = useTranslation()
  const [launch, setLaunch] = useState()
  const { id } = useParams()
  useEffect(() => {
    async function fetchData() {
      const data = await FetchLaunchDetails(id)
      setLaunch(data)
    }

    fetchData()
  }, [id])
  console.log(launch)
  if (!launch) {
    return <DataLoader />
  }
  const launchVideo = `${import.meta.env.VITE_IMAGE_ORIGIN}/${launch?.video[0].url}`
  const developerImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${launch?.developer.images[0].url}`
  const launchDescription = launch?.description[i18n.language]
  return (
    <React.Fragment>
      <section className=" container-xxl section-padding">
        <div className="container">
          <div className="video-container w-100">
            <video
              width="100%"
              height="100%"
              playsInline
              controls
              autoPlay
              loop
            >
              <source src={launchVideo} type="video/mp4" />
            </video>
          </div>

          <div className=" row " style={{ marginTop: '32px' }}>
            <div className="col-md-1 mb-2 d-flex justify-content-center justify-content-md-start">
              <Link to={`/developer-details/${launch?.developer._id}`}>
                <img
                  src={developerImage}
                  width="80"
                  height="80"
                  className=" shadow rounded-circle"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center justify-content-md-start align-items-center align-items-md-start">
              <h1 className=" launch-title fs-3 text-center text-md-start">
                {' '}
                {launch?.launchName[i18n.language]}
              </h1>
              <Link
                to={`/developer-details/${launch?.developer._id}`}
                style={{ textDecoration: 'underline ' }}
              >
                {launch?.developer.name[i18n.language]} &#10095;
              </Link>
              <p className="">{launch?.location.name[i18n.language]} </p>
            </div>
            <div className="col-md-5 d-flex justify-content-center  justify-content-md-end align-items-end">
              <div>
                <Whatsapp number={launch?.developer.callUsNumber} />{' '}
                <ContactUs number={launch?.developer.callUsNumber} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-xxl section-padding">
        <div className="container">
          <h2 className="title">{t('launches.details')}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: launchDescription }}
          />
        </div>
      </section>
      <section className="container-xxl section-padding">
        <div className="container">
          <div className="row">
            <h2 className="title">{t('launches.viewMap')}</h2>
            <div className='map-container'>
            <MapComponent width="100%" height="100%"/>

            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}