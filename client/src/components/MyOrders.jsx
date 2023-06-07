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
    let num;
    let dates;
    let quantity;
    let item;


    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let user_id = read_cookie("user_id")
        console.log(user_id)
        if (user_id != "") {
            axios.post('/api/user/myorder', {
                user_id
            }).then((response) => {
                // console.log(response.data)
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
        if (Object.keys(myOrders).length > 0 && myOrders["item_data"] != undefined) {
            // console.log(myOrders["date_values"])
            item = myOrders["item_data"]
            console.log(item)
        }
    }

    if (myOrders != null) {
        if (Object.keys(myOrders).length > 0 && myOrders["qty"] != undefined) {
            quantity = myOrders["qty"]
            console.log(quantity)
        }
    }

    if (myOrders != null) {
        if (Object.keys(myOrders).length > 0 && myOrders["date"] != undefined) {
            dates = myOrders["date"]
            console.log(dates)
        }
    }

    if (myOrders != null) {
        if (Object.keys(myOrders).length > 0 && myOrders["item"] != undefined) {
            num = myOrders["item"]
            console.log(num)
        }
    }


    return (
        <>
            <div>
                <Nav />
            </div>
            <div className="py-5">
                {
                // num ? num.map((val, i) => {
                    dates ? dates.map((date, i) => {
                        return (
                            <div>
                                <div className='bg-light rounded mx-auto mb-2 w-50 py-2 px-4'>
                                    {/* <p>{date}</p>
                                    <hr /> */}
                                    {
                                        item ? item[i].map((e, j) => {
                                            // quantity ? quantity[0][i].map((k) => {
                                            return (
                                                <>
                                                <p className="mt-3">{date[j]}</p>
                                                <hr />
                                                    <div className='d-flex'>
                                                        <div className='me-4'>
                                                            <img src={e.food_image} width={100} />
                                                        </div>
                                                        <div className='d-flex flex-column w-100'>
                                                            <p><strong>{e.fname}</strong></p>
                                                            <div className='d-flex justify-content-between'>
                                                                <div className='d-flex'>
                                                                    <p className='me-2'>Price: <span className='text-secondary'>₹ {e.food_price}</span></p>
                                                                    <p>Quantity: <span className='text-secondary'>{e.quantity}</span></p>
                                                                </div>
                                                                <div className=''>Total: <span className='text-secondary'>₹ {e.food_price * quantity[0][j]}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                        // }):<></>
                                         
                                        }) : 
                                        <>
                                        <p>No Orders Yet!</p>
                                        </>
                                    }
                                </div >
                            </div>
                        
                        )
                                }) 
                                
                                
                                :
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