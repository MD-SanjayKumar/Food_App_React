import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
// import { socket } from '../Socket'
import { io } from 'socket.io-client';
import axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { useDeliveryStore } from '../../Store';

const socket = io('http://localhost:9000', {
    autoConnect: false
})

function Orders() {
    const d_id = read_cookie("delivery_person_id");
    const [status, setStatus] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const onDelivery = useDeliveryStore((e) => e.onDelivery)
    const req_count = useDeliveryStore((e) => e.setRequestCount)

    useEffect(() => {
        getRestaurants()
        getCurrentStatus(d_id)
        getRequests()
        req_count(requestList.length)
        socket.connect();
        socket.on("receive", (deliveryData) => {
            console.log(deliveryData)
            setRequestList((list) => [...list, deliveryData])
        })
        return () => {
            socket.off('receive')
        }
        // console.log(requestList)
    }, [socket])
    console.log(onDelivery)

    const getRestaurants = () => {
        axios.get("/api/restaurant_data").then((response) => {
            console.log(response.data);
            setRestaurant(response.data)
            // data.map((e)=>{setRequestList((list) => [...list, e.requests])})
            // setRequestList(data.map((e)=>{e.requests}))
        }).catch((err) => {
            alert("Error")
        })
    }

    const getRequests = () => {
        axios.get("/api/delivery_request").then((response) => {
            console.log(response.data);
            let data = response.data
            data.map((e) => { setRequestList((list) => [...list, e.requests]) })
            // setRequestList(data.map((e)=>{e.requests}))
        }).catch((err) => {
            alert("Error")
        })
    }
    console.log("--------", requestList)

    const getCurrentStatus = (id) => {
        axios.post("/api/delivery/status", { id }).then((response) => {
            console.log(response.data)
            setStatus(response.data.data.status)
        }).catch((err) => {
            alert("Error")
        })
    }

    const handleAccept = (order_id, uid, rid, address, user_lat, user_long, cart, cart_total) => {
        axios.post("/api/request/accept", { d_id, order_id, uid, rid, address, user_lat, user_long, cart, cart_total }).then((response) => {
            console.log(response.data)
            // handleDeleteReq(uniqueid)
        }).catch((err) => {
            alert("Error")
        })
    }

    const handleDeleteReq = (uniqueid) => {
        axios.post("/api/request/delete", { uniqueid }).then((response) => {
            console.log("deleted");
        }).catch((err) => {
            alert("Error")
        })
    }

    const handleStatus = (id) => {
        axios.post("/api/delivery_person/status_change", { id }).then((response) => {
            console.log("status_changed");
        }).catch((err) => {
            alert("Error")
        })
        getRequests()
    }

    const handleCurrentStatus = () => {
        axios.post("/api/delivery/change_status", { d_id }).then((response) => {
            console.log("status_changed");
        }).catch((err) => {
            alert("Error")
        })
    }



    //   console.log(requestList)
    return (
        <div>
            <Navbar />
            {status === "active" ?
                <div className='row bg-light justify-content-center py-5'>
                    {
                        requestList ? requestList.map((data, i) => {
                            return (

                                <>
                                    <div className='col-lg-6 border rounded bg-white m-2 w-75'>
                                        <div className='row'>
                                            <p>Request time: {data.time}</p>
                                            <div className='col-6 py-2'>
                                                <p className='mb-0 text-secondary' style={{ fontSize: '12px', fontWeight: 'bold' }}>PICK UP</p>
                                                <p className='mb-0 fs-5'>Restaurant ID:{data.rid}</p>
                                                <p className='mb-0 text-truncate' style={{ fontSize: '12px' }}>Address will be here</p>
                                            </div>
                                            <div className='col-6 py-2'>
                                                <p className='mb-0 text-secondary' style={{ fontSize: '12px', fontWeight: 'bold' }}>DROP OFF</p>
                                                <p className='mb-0 fs-5'>User ID: {data.uid}</p>
                                                <p className='mb-0 text-truncate' style={{ fontSize: '12px' }}>{data.address}</p>
                                            </div>
                                        </div>
                                        <hr className='my-1' />
                                        <div className='row border-bottom d-flex align-items-end' style={{ fontSize: '13px' }}>
                                            <div className='col-6 me-auto'>
                                                <div className='row'>
                                                    <div className='col'>Total distance <span style={{ fontWeight: 'bold' }}>12km</span></div>
                                                    <div className='col'>Estimate time <span style={{ fontWeight: 'bold' }}>30min</span></div>
                                                </div>
                                            </div>
                                            <div className='col-2 ms-auto'>Fare <span style={{ fontWeight: 'bold' }}>₹130</span></div>
                                        </div>
                                        {/* <hr className='m-0' /> */}
                                        <div className='row'>
                                            <div className='d-flex justify-content-end p-2'>
                                                {/* <button className='btn btn-outline-danger  m-2'>Reject</button> */}
                                                <button className='btn btn-success m-2' onClick={() => {
                                                    handleAccept(data.order_id, data.uid, data.rid, data.address, data.user_lat, data.user_long, data.cart, data.cart_total)
                                                    handleDeleteReq(data.uniqueid)
                                                    handleStatus(d_id)
                                                    getRequests()
                                                    handleCurrentStatus()
                                                }}>Accept</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : 
                        <></>
                    }

                </div>
                : <>Inactive</>}
        </div>
    )
}

export default Orders