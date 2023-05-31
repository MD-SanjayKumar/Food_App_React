import { useEffect, useState } from "react";
import { useStore } from "../Store";

export default function Get_location() {
    const [err, setErr] = useState('');
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const rid = useStore(state => state.restaurant_id)

    useEffect(()=>{

    },[])
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success function
                showPosition,
                // Error function
                null,
                // Options. See MDN for details.
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
        } else {
            setErr("Geolocation is not supported by this browser.")
        }
    }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude)
            setLat(position.coords.latitude),
            setLong(position.coords.longitude)
    }

    function show(){
        console.log(lat+" "+ long)
    }

    return (
        <>
        <button onClick={()=>getLocation()}>Get location</button>
        <button onClick={()=>console.log(rid)}>Show RID</button>
        </>
    )

}