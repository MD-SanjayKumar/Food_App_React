import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useCart } from "../Store";
import { Link } from "react-router-dom";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";


export default function MyOrders() {
    const [myOrders, setMyOrders] = useState();
    let dates;
    let orders;
    // let dates1 = dates;


    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let email = read_cookie("email")
        console.log(email)
        if (email != "") {
            axios.post('/api/user/myorder', {
                email
            }).then((response) => {
                console.log(response.data)
                setMyOrders(response.data)
            }).catch(err => {
                alert(err)
                console.log(err)
            })
        } else {
            alert("Please login to see you order history.")
        }
    }

    if (myOrders != null) {
        if (Object.keys(myOrders).length > 0 && myOrders["date_values"] != undefined) {
            // console.log(myOrders["date_values"])
            dates = myOrders["date_values"]
            console.log(dates)
        }
    }

    if (myOrders != null) {
        if (Object.keys(myOrders).length > 0 && myOrders["cart_values"] != undefined) {
            // console.log(myOrders["cart_values"])
            orders = myOrders["cart_values"]
            console.log(orders)
            // orders.map((e)=>{
            //     e.map((k)=>{
            //         console.log(k.fname)
            //         console.log(k.fprice)
            //     })
            // })
        }
    }


    return (
        <>
            <div>
                <Nav />
            </div>
            <div className="py-5">
                {
                    dates ? dates.map((date, i) => {
                        // dates1 ? dates1.reverse().map((date, i) => {
                        return (
                            <div>


                                <div className='bg-light rounded mx-auto mb-2 w-50 py-2 px-4'>
                                    <p>{date}</p>
                                    <hr />
                                    {
                                        orders ? orders[i].map((e) => {
                                            // orders1 ? orders1[i].reverse().map((e) => {
                                            return (
                                                <>
                                                    <div className='d-flex'>
                                                        <div className='me-4'>
                                                            <img src={e.fimg} width={100} />
                                                        </div>
                                                        <div className='d-flex flex-column w-100'>
                                                            <p><strong>{e.fname}</strong></p>
                                                            <div className='d-flex justify-content-between'>
                                                                <div className='d-flex'>
                                                                    <p className='me-2'>Price: <span className='text-secondary'>₹ {e.fprice}</span></p>
                                                                    <p>Quantity: <span className='text-secondary'>{e.quantity}</span></p>
                                                                </div>
                                                                <div className=''>Total: <span className='text-secondary'>₹ {e.fprice * e.quantity}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                        }) : 
                                        <>
                                        <p>No Orders Yet!</p>
                                        </>
                                    }
                                </div >
                            </div>

                        )
                    }) :
                        <>
                            <div>
                                <div className='d-flex justify-content-center align-items-center vh-100'>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className=''>
                                            <img src="https://i.ibb.co/r5pH0RP/undraw-No-data-re-kwbl.png" alt="isometric-plate" width={100} />
                                        </div>
                                        <p className='fs-5 mt-4 '>You have not ordered anything yet.</p>
                                        <Link to="/"><button className='btn btn-primary'>Continue shopping</button></Link>
                                    </div>
                                </div>
                            </div>
                        </>
                }

            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}