import { useTranslation } from 'react-i18next'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const ContactUs = ({ number }) => {
  const { t, i18n } = useTranslation()
  return (
    <a href={`tel:${number}`}>
      <button className=" btn button-primary">
        <span className=" d-flex justify-content-center align-items-center gap-1">
          <FaPhoneAlt  /> {t('contact.callUs')}
        </span>
      </button>
    </a>
  )
}
export const Whatsapp = ({ number }) => {
  const { t, i18n } = useTranslation()
  return (
    <a href={`wa.me:${number}`}>
      <button
        style={{
          backgroundColor: 'rgb(76, 217, 100)',
          borderColor: 'rgb(76, 217, 100)',
          backgroundImage: 'none',
        }}
        className="whatsapp-btn btn button-primary"
      >
        <span className=" d-flex justify-content-center align-items-center gap-1">
          <FaWhatsapp /> {t('contact.whatsapp')}
        </span>{' '}
      </button>
    </a>
  )
}
