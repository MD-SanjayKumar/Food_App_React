import React, { useRef, useEffect, useState } from "react";
// import * as tt from '@tomtom-international/web-sdk-maps';
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import mapMarker from "../../assets/map-marker.png";
import Routing from "./Routing";
import { useDeliveryStore } from "../../Store";
let coords = []

const DeliveryRouteMap = () => {
    const [lat, setLat] = useState();
    const [long, setLong]= useState();
    const userLat = useDeliveryStore((e)=>e.UserLat)
    const userLong = useDeliveryStore((e)=>e.UserLong)
    const resLat = useDeliveryStore((e)=>e.RestaurantLat)
    const resLong = useDeliveryStore((e)=>e.RestaurantLong)

    useEffect(()=>{
        // getCurrentMovements()
        navigator.geolocation.watchPosition(
            (data)=>{
                console.log(data)
                // setFollowUp(data.coords.latitude, data.coords.longitude)
                coords.push([data.coords.latitude, data.coords.longitude])
                console.log(data.coords.latitude)
                console.log(data.coords.longitude)
                setLat(data.coords.latitude)
                setLong(data.coords.longitude)
                // console.log("--",followUpslat,followUpslong)
            },
            (err) =>{
                console.log(err)
            },{
                enableHighAccuracy: true
            }
        )
    },[lat, long])
//     const APP_KEY = "fTbxeEhl0jfa2vOn5uKnoB5ihcGwSUAf"
//     const mapElement = useRef()
//     // const [map, setMap] = useState({})
//     const [longitude, setLongitude] = useState(72.50956144653692);
//     const [latitude, setLatitude] = useState(23.075840784435368);
//     let mapi = tt.map({
//         key: APP_KEY,
//         container: mapElement.current,
//         stylesVisibility: {
//           trafficFlow: true,
//           trafficIncidents: true,
//         },
//         center: [longitude, latitude],
//         zoom: 14
//       })
//   useEffect(() => {
    

//     // setMap(mapi)

//   }, [])
const getCurrentMovements = () =>{
    
  }



const icon = new L.icon({
    iconUrl: mapMarker,
    iconSize: [30, 45],
  });

  return <div>
        {/* fTbxeEhl0jfa2vOn5uKnoB5ihcGwSUAf */}
        {/* <div ref={mapElement} className="map"></div> */}
        <MapContainer center={[20,30]} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* <Marker position={[20, 30]} icon={icon}> */}
            {/* </Marker> */}
            {console.log(lat)}
                {lat && long && <Routing userCoords={[userLat, userLong]} restCoords={[resLat, Math.abs(parseFloat(resLong) - 360)]} driverCoords={[lat, long]} /> }
        </MapContainer>
    </div>;
};

export default DeliveryRouteMap;
