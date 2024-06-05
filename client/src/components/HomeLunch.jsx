import React, { useEffect, useState } from 'react';
import { FetchLatestLunches } from '../Api/ApiCalls';
import Title from './Common/Title';
import { useTranslation } from 'react-i18next';
import Carousel from './Common/Carousel';
import LaunchCard from './Cards/LaunchCard';

export default function HomeLunch() {
  const { t, i18n } = useTranslation();
  const [lunch, setLunch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await FetchLatestLunches();
      console.log(data);
      setLunch(data);
    }
    fetchData();
  }, []);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    lazyLoad: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.2,
        },
      },
    ],
  };

  return (
    <section className="container-xxl section-padding">
      <div className="container">
        <Title title={t('titles.newLaunches')} />
        <div className="row">
          <Carousel items={lunch?.map((item) => item)} Component={LaunchCard} settings={settings} />
        </div>
      </div>
    </section>
  );
}
