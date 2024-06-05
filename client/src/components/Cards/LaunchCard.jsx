import React from 'react';
import { Link } from 'react-router-dom';

export default function LaunchCard({ item }) {
  const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`;
  
  return (
    <Link className="launch-card" to={`/launch-details/${item._id}`}>
      <img
        loading="lazy"
        className="img-fluid rounded-2"
        src={itemImage}
        alt="Launch Image"
        width="393"
        height="221"
      />
    </Link>
  );
}
