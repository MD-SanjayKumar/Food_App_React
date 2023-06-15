import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { io } from 'socket.io-client';
import uniqid from 'uniqid';

const socket = io('http://localhost:9000',{
    autoConnect: false
})

function RestaurantReq() {
    const id = read_cookie("restaurant_id");
    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        getRequests()
        socket.connect();
        socket.on("receive_restaurant", (deliveryData) => {
            console.log(deliveryData)
            setRequestList((list) => [...list, deliveryData])
        })
        return() => {
            socket.off('receive_restaurant')
        }
    }, [socket])

    
    console.log(requestList)

    const getRequests = () =>{
        axios.get("/api/restaurant_request").then((response)=>{
            console.log(response.data);
            let data = response.data
            data.map((e)=>{setRequestList((list) => [...list, e.requests])})
        }).catch((err)=>{
            alert("Error")
        })
    }

    const sendToDeliveryPerson=(oid, uid, address, user_lat, user_long, rid, cart, cart_total) =>{
        const deliveryData = {
            uniqueid: uniqid(),
            order_id: oid, 
            uid: uid,
            address: address,
            user_lat: user_lat,
            user_long: user_long,
            rid: rid,
            cart: cart,
            cart_total: cart_total,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds(),
        }
        socket.emit("send", deliveryData);
    }

    const handleDeleteReq= (uniqueid) =>{
        axios.post("/api/restaurant_request/delete", {uniqueid}).then((response)=>{
            console.log("deleted");
        }).catch((err)=>{
            alert("Error")
        })
    }
    
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='row bg-light justify-content-center py-5'>
                {
                requestList? requestList.filter((e)=> e.rid === id).map((data, i)=>{
                // requestList.map((data, i)=>{
                    return(

               <>                
               <div className='col-lg-6 border rounded bg-white m-2 w-75'>
                    <div className='row'>
                        <p>Request time: {data.time}</p>
                       
                        <div className='col-6 py-2'>
                            <p className='mb-0 text-secondary' style={{ fontSize: '12px', fontWeight: 'bold' }}>Customer's Detail</p>
                            <p className='mb-0 fs-5'>User ID: {data.uid}</p>
                            <p className='mb-0 text-truncate' style={{ fontSize: '12px' }}>{data.address}</p>
                        </div>
                    </div>
                    <hr className='my-1' />
                    <div className='row border-bottom d-flex align-items-end' style={{ fontSize: '13px' }}>
                        <div className='col-2 ms-auto'>Cart Total <span style={{ fontWeight: 'bold' }}>₹{data.cart_total}</span></div>
                    </div>
                    {/* <hr className='m-0' /> */}
                    <div className='row'>
                        <div className='d-flex justify-content-end p-2'>
                            {/* <button className='btn btn-outline-danger  m-2'>Reject</button> */}
                            <button className='btn btn-success m-2' onClick={()=>{
                                console.log("Accept Clicked")
                                sendToDeliveryPerson(data.order_id, data.uid, data.address, data.user_lat, data.user_long, data.rid, data.cart, data.cart_total)
                                handleDeleteReq(data.uniqueid)
                            }}>Accept Order</button>
                        </div>
                    </div>
                </div>
                </>
                )
            }):<>
            </>
        }
        </div>
        </>
    );
}

export default RestaurantReq