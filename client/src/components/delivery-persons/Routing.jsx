import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import mapIcon from "./../../images/map-marker.png";
import restIcon from "./../../images/restaurant-marker.png";
import driverIcon from "./../../images/delivery-icon.png";
var routingControl = null;

export default function Routing({ userCoords, restCoords, driverCoords }) {
  const RouterEle = document.querySelector(".leaflet-routing-container");
  //   const [routingControl, setRoutingControl] = useState(null);
  const map = useMap();
  useEffect(() => {
    console.log(routingControl)
    // return () => {
        if(routingControl !== null) {
            console.log('anythin')
            map.removeControl(routingControl);
            routingControl = null;
        }
        routingControl = L.Routing.control({
          waypoints: [
            L.latLng(driverCoords[0], driverCoords[1]),
            L.latLng(restCoords[0], restCoords[1]),
            L.latLng(userCoords[0], userCoords[1]),
          ],
          addWaypoints: false,
          draggableWaypoints: false,
          routeWhileDragging: true,
          showAlternatives: false,
          lineOptions: {
            styles: [{ color: "#000", weight: 4 }],
          },
          createMarker: function (i, waypoints, n) {
            var marker_icon;
            var startIcon = L.icon({
              iconUrl: driverIcon,
              iconSize: [35, 25],
            });
            var sampahIcon = L.icon({
              iconUrl: restIcon,
              iconSize: [25, 40],
            });
            var destinationIcon = L.icon({
              iconUrl: mapIcon,
              iconSize: [25, 40],
            });
            if (i == 0) {
              marker_icon = startIcon;
            } else if (i > 0 && i < n - 1) {
              marker_icon = sampahIcon;
            } else if (i == n - 1) {
              marker_icon = destinationIcon;
            }
            var marker = L.marker(waypoints.latLng, {
              draggable: false,
              bounceOnAdd: false,
              bounceOnAddOptions: {
                duration: 1000,
                height: 800,
              },
              icon: marker_icon,
            });
            return marker;
          },
        }).addTo(map);
    // };
    console.log(routingControl)
    setTimeout(() => {
        const time = document.querySelector('.leaflet-routing-alternatives-container h3')
        console.log(time.innerHTML.split(','))
    },1000)
    return () => routingControl;
  }, [driverCoords, map]);
  return null;
}
