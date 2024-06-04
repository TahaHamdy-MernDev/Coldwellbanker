import { useRef } from 'react';
import styled from 'styled-components';
import MapContainer from './MapContainer';

const Map = ({ mapData, name }) => {
  const mapContainer = useRef(null);
  return (
    <Container>
      <div id="map-container" ref={mapContainer}>
        <MapContainer
          locations={[
            {
              mapData: mapData,
              name: name
            }
          ]}
          mapContainer={mapContainer}
          expand={true}
        />
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  #map-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .mapboxgl-canvas-container {
      width: 100%;
      height: 100%;
    }
    canvas {
      aspect-ratio: unset;
    }
    .mapboxgl-marker {
      position: absolute;
      cursor: pointer;
    }
  }

  .mapboxgl-ctrl-zoom-in {
    background: url('/assets/icons/common/plus.svg');
  }
  .mapboxgl-ctrl-zoom-out {
    background: url('/assets/icons/common/minus.svg');
  }
  .mapboxgl-ctrl-zoom-in,
  .mapboxgl-ctrl-zoom-out {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    outline: none;
    border: none;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #ffffff;
  }
  @media screen and (max-width: ${props =>
      props.theme.breakPoints.tablet.max}) {
    height: 50vh;

    #map-container {
      canvas {
        border-radius: 8px;
      }
    }
  }
`;
export default Map;
