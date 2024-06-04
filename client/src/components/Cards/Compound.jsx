import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';

export default function Compound({ item, index = 1 }) {
  const { i18n } = useTranslation();
  console.log(item);
  const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item.thumbnail[0].url}`;
  const developerImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item.developer?.images?.url}`;
  const words = item.name[i18n.language].split(' ');
  const firstTwoWords = words.slice(0, 3).join(' ');
  const description = item.description[i18n.language].slice(0, 250 - 3) + '...';

  return (
    <div
      className="custom-compound-unit bg-white rounded-2"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={200 * index}
      dir={i18n.dir()}
    >
      <div className="custom-compound-image position-relative">
        <img
          className="w-100 custom-compound-thumbnail"
          width="auto"
          loading="lazy"
          height="250"
          src={itemImage}
          alt={item.name[i18n.language]}
        />
        <span className="position-absolute custom-developer-logo">
          <Link to={`/developer-details/${item.developer[0]._id}`}>
            <img
              className="w-100 h-100 rounded-circle"
              src={developerImage}
            //   alt={item.developer[0].name[i18n.language]}
            />
          </Link>
        </span>
      </div>
      <div className="custom-compound-unit-information-wrapper p-2">
        <p className="custom-compound-unit_description mb-1">
          <MapPin size={18} /> {item.area[0].title[i18n.language]}
        </p>
        <Link className="custom-compound-unit_name" to={`/compound-details/${item._id}`}>
          <h3>{firstTwoWords}</h3>
        </Link>
        <p className="custom-compound-unit_description">{description}</p>
        <div className="d-flex justify-content-start gap-2 py-1">
          {item.amenities.map((amenity, idx) => (
            <span key={idx} className="badge bg-primary-blue text-white">
              {amenity.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
