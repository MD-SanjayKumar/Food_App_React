import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client';
import DeliveryRouteMap from './DeliveryRouteMap';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import axios from 'axios';

const socket = io('http://localhost:9000',{
    autoConnect: false
})

function Home() {
    const d_id = read_cookie("delivery_person_id");
    const [status, setStatus]= useState("")

    const [request, setRequest] = useState([])
    useEffect(() => {
        socket.connect();
        socket.on("receive", (deliveryData) => {
            console.log(deliveryData)
            setRequest((list) => [...list, deliveryData])
        })
        return() => {
            socket.off('receive')
        }
    }, [socket])

    useEffect(()=>{
        getCurrentStatus(d_id)
    })

    const getCurrentStatus= (id) =>{
        axios.post("/api/delivery/status", {id}).then((response)=>{
            console.log(response.data)
            setStatus(response.data.data.status)
        }).catch((err)=>{
            alert("Error")
        })
    }

  return (
    <div className='p-3 bg-light'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light'>
                    <div className='d-flex justify-content-around align-items-center 
                     p-4 bg-white boarder border-secondary shadow-sm'>
                        <i class="fa-solid fa-indian-rupee-sign fs-1 text-success"></i>
                        <div>
                            <span>Earn</span>
                            <h2>Total Earning</h2>
                        </div>
                    </div>
                </div>
                
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light'>
                    <div className='d-flex justify-content-around align-items-center 
                     p-4 bg-white boarder border-secondary shadow-sm'>
                        <i className='fa-solid fa-person-biking fs-1 text-primary'></i>
                        <div>
                            <span>Delivery</span>
                            <h2>No. of delivery</h2>
                        </div>
                    </div>
                </div>

                <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light'>
                    <div className='d-flex justify-content-around align-items-center 
                     p-4 bg-white boarder border-secondary shadow-sm'>
                        <i className='fa-solid fa-mobile-screen-button fs-1 text-danger'></i>
                        <div>
                            <span>Requests</span>
                            <h2>{request.length}</h2>
                        </div>
                    </div>
                </div>                
                
            </div>
        </div>
        {status === "active" ?
        <div>
        <DeliveryRouteMap/>
        </div>
        :<>Inactive</>}
    </div>
  )
}

export default Home