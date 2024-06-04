import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FetchAllDevelopers } from '../Api/ApiCalls';

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchAllDevelopers();
        setDevelopers(data);
        setFilteredDevelopers(data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const language = i18n.language;
    const filtered = developers.filter((developer) =>
      developer.name[language].toLowerCase().includes(searchValue)
    );
    setFilteredDevelopers(filtered);
  };

  return (
    <React.Fragment>
      <section
        className="position-relative w-100"
        style={{
          backgroundImage: "url('/developers.svg')",
          height: '450px',
          backgroundColor: '#222',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="position-absolute start-0 top-0 w-100 h-100 z-1"
          style={{ backgroundColor: '#001a33', opacity: '0.7' }}
        ></div>
        <div className="w-100 position-absolute start-50 top-50 z-3 translate-middle ">
          <h1 className="text-primary-white text-center w-100 fs-1">
            {t('developers.title')}
          </h1>
          <div
            className="font-inter text-center"
            style={{
              color: 'var(--primary-white)',
              textShadow: '1px 1px 3px rgba(68, 68, 68, 0.25)',
              fontSize: '18px',
              fontWeight: '400',
              margin: '0 auto',
            }}
          >
            {t('developers.text')}
          </div>
        </div>
      </section>
      <section className="container-xxl section-padding">
        <div className="d-flex justify-content-center align-items-center">
          <span className="search-container position-relative border-0">
            <input
              placeholder={t('developers.developerSearch')}
              className="search-input"
              type="text"
              name="search-developer"
              id="search-developer"
              onChange={handleSearch}
            />
            <Search />
          </span>
        </div>
        <div className="row mt-4">
          {filteredDevelopers?.map((item, index) => {
            let itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.images[0].url}`;
            return (
              <div key={index} className="col-xl-2 col-sm-3 col-6">
                <Link
                  to={`/developer-details/${item._id}`}
                  className="hoveredLogo d-flex align-items-center flex-column p-4 inner"
                >
                  <img
                  loading='lazy'
                    className="developers-developer-logo"
                    width="150"
                    height="150"
                    src={itemImage}
                    alt={item.name[i18n.language]}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
}
