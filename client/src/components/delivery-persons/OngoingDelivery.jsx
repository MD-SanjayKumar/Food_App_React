import React, {useState, useEffect} from "react"
import { read_cookie } from 'sfcookies';
import axios from "axios"
import { useDeliveryStore } from "../../Store";

export default function OngoingDelivery(){
    const id = read_cookie("delivery_person_id")
    const [ongoing, setOngoing] = useState("");
    const setUserLocation = useDeliveryStore((state)=>state.setUserLocation)
    const setRestaurantLocation = useDeliveryStore((state)=>state.setRestaurantLocation)
    const timeDistance = useDeliveryStore((val)=> val.time_km)
    // const fare = (7* timeDistance[0].slice(0,4)).toFixed(0)


    useEffect(()=>{
        getOngoingOrder()
    },[])

    const getOngoingOrder=()=>{
        console.log("Id",id)
        axios.post("/api/delivery/ongoing_data",{id}).then((response)=>{
            setOngoing(response.data)
            setUserLocation(response.data.user_lat_long[0],response.data.user_lat_long[1])
            setRestaurantLocation(response.data.res_location[0].lat,response.data.res_location[0].long)
            console.log("RES_________-",response.data.res_location[0].lat,response.data.res_location[0].long)
        }).catch((err)=>{
            console.log("error",err)
        })
    }

    return(
            <div>
            <div className='row bg-light justify-content-center py-5'>
                {console.log(ongoing)}      
               <div className='col-lg-6 border rounded bg-white m-2 w-75'>
                    <div className='row'>
                        <p>Time: {ongoing.createdAt}</p>
                        <div className='col-6 py-2'>
                            <p className='mb-0 text-secondary' style={{ fontSize: '12px', fontWeight: 'bold' }}>PICK UP</p>
                            <p className='mb-0 fs-5'>{ongoing.res_name}</p>
                            <p className='mb-0 text-truncate' style={{ fontSize: '12px' }}>{ongoing.res_address}</p>
                        </div>
                        <div className='col-6 py-2'>
                            <p className='mb-0 text-secondary' style={{ fontSize: '12px', fontWeight: 'bold' }}>DROP OFF</p>
                            <p className='mb-0 fs-5'>{ongoing.username}</p>
                            <p className='mb-0 text-truncate' style={{ fontSize: '12px' }}>{ongoing.user_address}</p>
                        </div>
                    </div>
                    <hr className='my-1' />
                    <div className='row border-bottom d-flex align-items-end' style={{ fontSize: '13px' }}>
                        <div className='col-6 me-auto'>
                            <div className='row'>
                                <div className='col'>Total distance <span style={{ fontWeight: 'bold' }}>{timeDistance? timeDistance[0] : 0}</span></div>
                                <div className='col'>Estimate time <span style={{ fontWeight: 'bold' }}>{timeDistance? timeDistance[1] : 0}</span></div>
                            </div>
                        </div>
                        {/* timeDistance[0].slice(0,4)).toFixed(0) */}
                        <div className='col-2 ms-auto'>Cart Total <span style={{ fontWeight: 'bold' }}>{ongoing.total_amount} Rs</span></div>
                    </div>
                    {/* <div className='col-2 ms-auto align-items-end' style={{ fontSize: '13px' }}>Fare <span style={{ fontWeight: 'bold' }}>{fare} Rs</span></div> */}
                </div>
            </div>
        </div>
    )
} 