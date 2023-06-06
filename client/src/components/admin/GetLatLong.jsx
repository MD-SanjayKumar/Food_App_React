import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useRef, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'
import { useAdminStore } from '../../Store';


function GetLatLong() {
  const mapRef = useRef(null);
  const setLocation = useAdminStore((e)=>e.setLatLong)
  const [position, setPosition] = useState([23.07581820987211, 432.50958000246743]);
  const icon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize: [25, 35],
  });
  function SearchControl() {
    const map = useMap();

    useMapEvent('click', (e) => {
      // const marker = L.marker(e.latlng).addTo(map);
      map.flyTo(e.latlng, map.getZoom())
      setPosition([e.latlng.lat, e.latlng.lng]);
      setLocation(e.latlng.lat, e.latlng.lng)
      console.log(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
    });

    useEffect(() => {
      const searchControl = L.Control.geocoder({
        defaultMarkGeocode: false,
        collapsed: false,
        placeholder: 'Search for a location',
        errorMessage: 'Location not found',
        showResultIcons: false,
        geocoder: L.Control.Geocoder.nominatim({
          geocodingQueryParams: {
            countrycodes: 'in',
          },
        }),
        searchLabel: 'Enter address',
        autocomplete: true,
      }).on('markgeocode', (e) => {
        const { center } = e.geocode || {};
        if (center) {
          const { lat, lng } = center;
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        }
      });

      // searchControl.addTo(map);

      return () => {
        searchControl.remove();
      };
    }, [map]);

    return null;
  }

  return (
    <MapContainer center={position} zoom={13} ref={mapRef}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={icon}>
        <Popup>"Lat: {position[0]}, Lng: {position[1]}"</Popup>
      </Marker>
      <SearchControl />
    </MapContainer>
  );
}

export default GetLatLong;