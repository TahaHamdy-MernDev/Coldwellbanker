import React from 'react'
import { FetchLatestProperties } from '../Api/ApiCalls'
import Property from './Cards/Property'
import Title from './Common/Title'
import { useTranslation } from 'react-i18next'
import DataLoader from './Common/DataLoader'

export default function LatestProperties() {
  const { t } = useTranslation()
  const [latestProperties, setLatestProperties] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchLatestProperties()
        console.log(data)
        setLatestProperties(data)
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
        <Title title={t('latestProperties')} />
        <div className="row gx-4 gy-5">
          {loading ? (
            <DataLoader />
          ) : (
            latestProperties?.map((item, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <Property item={item} index={index} />
                </div>
              )
            })
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3">
          {latestProperties && latestProperties.length == 6 && (
            <button className=" btn button-primary">{t('showMore')}</button>
          )}
        </div>
      </div>
    </section>
  )
}
