// import React, { useEffect, useState } from 'react';

// import { useTranslation } from 'react-i18next';


// const MapContainer = ({ locations, mapContainer, expand }) => {
//   const [map, setMap] = useState(null);
// const {i18n:locale} =useTranslation()
//   useEffect(() => {
//     if (!locations || (locations.length == 0 && mapContainer.current)) return;
//     const containerHeight = mapContainer.current.clientHeight;
//     const containerWidth = mapContainer.current.clientWidth;
//     const initializeMap = async ({ setMap }) => {
//       const mapboxgl = (await import('mapbox-gl')).default;
//       mapboxgl.accessToken =
//         'pk.eyJ1IjoiY29vaW5nIiwiYSI6ImNrbnEwNHc1dTBlbXQycW56djNwNmh0eWMifQ.KoEjmTlbLWqEIy4g_RIF-g';
//       const map = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [locations[0].mapData.lng, locations[0].mapData.lat],
//         zoom: locations.length > 1 ? 6 : 13,
//         trackResize: true
//       });

//       //to handle arabic labels
//       if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
//         mapboxgl.setRTLTextPlugin(
//           'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
//           true // Lazy load the plugin only when text is in arabic
//         );
//       }

//       map.on('load', () => {
//         setMap(map);
//         map.resize();
//         locations.forEach(location => {
//           const popup = new mapboxgl.Popup({
//             closeButton: false,
//             offset: [
//               locale == 'ar' ? -containerWidth * 0.75 : 0,
//               -containerHeight
//             ]
//           }).setText(`${location.name}`);

//           const marker = new mapboxgl.Marker({
//             color: 'red',
//             offset: [locale == 'ar' ? -containerWidth : 0, -containerHeight]
//           })
//             .setLngLat([location.mapData.lng, location.mapData.lat])
//             .setPopup(popup);

//           marker.addTo(map);
//           const markerDiv = marker.getElement();

//           markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
//           markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
//         });

//         map.setCenter([locations[0].mapData.lng, locations[0].mapData.lat]);
//       });
//       map.addControl(
//         new mapboxgl.NavigationControl({
//           showCompass: false
//         })
//       );
//     };
//     if (!map) initializeMap({ setMap });
//   }, [map]);

//   useEffect(() => {
//     if (map) {
//       map.resize();
//       locations.length > 1
//         ? map.setCenter([31.233334, 30.033333])
//         : map.setCenter([locations[0].mapData.lng, locations[0].mapData.lat]);
//     }
//   }, [expand]);

//   return <></>;
// };

// export default MapContainer;

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYWhhbWR5MDIiLCJhIjoiY2x3a2RpaWFkMTc5ajJta3gyaW5yd2wwcSJ9.r0bKbuRuQ5DBlG9RaM5Ftg';

export default function MapComponent({ width, height ,lng=-70.9,lat=42.35}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; 

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,

    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [lng, lat, zoom]);

  return (
    <div style={{ width, height }} className='rounded-2'>
      <div ref={mapContainer} loading="lazy" className='rounded-2' style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
