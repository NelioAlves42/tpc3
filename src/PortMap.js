import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ports from './ports';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFuYmV5b25kNDIiLCJhIjoiY2xnaHp5aTc0MDBpYTNkb2J5bjd2NGo1ZiJ9.cu-cehEaAqgzy4dZghi35A';

function PortMap({ selectedPort }) {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-24);
  const [lat, setLat] = useState(15.72);
  const [zoom, setZoom] = useState(7);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });
      setMap(newMap);

      newMap.on('move', () => {
        setLng(newMap.getCenter().lng.toFixed(6));
        setLat(newMap.getCenter().lat.toFixed(6));
        setZoom(newMap.getZoom().toFixed(2));
      });

      ports.forEach((port) => {
        const marker = new mapboxgl.Marker({
          color: 'blue',
        })
          .setLngLat([port.longitude, port.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(port.name))
          .addTo(newMap);
      });
    }
  }, [map]);

  useEffect(() => {
    if (selectedPort && map) {
      map.flyTo({
        center: [selectedPort.longitude, selectedPort.latitude],
        zoom: 14,
      });

      new mapboxgl.Marker({
        color: 'red',
      })
        .setLngLat([selectedPort.longitude, selectedPort.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(selectedPort.name))
        .addTo(map);
    }
  }, [selectedPort, map]);

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="map-container" ref={mapContainer}>
      <div className="sidebar">
        <div>Longitude: {lng}</div>
        <div>Latitude: {lat}</div>
        <div>Zoom: {zoom}</div>
      </div>
      <div>
        <div className="zoom-buttons">
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
        </div>
      </div>
    </div>
  );
}

export default PortMap;
