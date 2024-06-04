import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section
      className="hero-section w-100 overflow-hidden position-relative"
      style={{ height: '750px' }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content position-absolute top-50 start-50 translate-middle w-75">
        <h1 className=" display-5  mb-4 text-primary-white text-center">
          {t('Header.Heading.findA')}{' '}
          <span className="text-primary-white">
            {t('Header.Heading.perfectHome')}
          </span>{' '}
          {t('Header.Heading.toLive')}
        </h1>
        <p className="mb-4 pb-2 text-secondary-blue text-center">
          {t('Header.SubHeading')}
        </p>
        <div className="row rounded-2 p-2 bg-primary-white d-flex flex-column flex-md-row justify-content-between">
          <div className="search-select rounded-2 mx-0 my-2">
            <label htmlFor="adv_categ" className="form-label">
              Categories
            </label>
            <Form.Select>
              <option>Property Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="search-select rounded-2 mx-0 my-2">
            <label htmlFor="adv_categ" className="form-label">
            City
            </label>
            <Form.Select>
              <option>Property Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="search-select rounded-2 mx-0 my-2">
            <label htmlFor="adv_categ" className="form-label">
            Beds    
            </label>
            <Form.Select>
              <option>Property Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="search-select rounded-2 mx-0 my-2">
            <label htmlFor="adv_categ" className="form-label">
            Baths
            </label>
            <Form.Select>
              <option>Property Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="search-select rounded-2  mx-0 my-2 d-flex align-items-end">
          <label htmlFor="adv_categ" className="form-label">
         {" "}
            </label>
            <button className=' button-primary w-100 mb-0 rounded-2'>
                Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
