import React, { useState } from "react";
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
import Nav from "./Nav";
import Footer from "./Footer";

export default function Cart() {
    const navigate = useNavigate()
    const [fullAddress, setFullAddress] = useState("");
    const cart = useCart((e => e.cart))
    const remove = useCart((e => e.removeCart))
    const setTotal = useCart((e => e.setTotal))
    const cartTotal = useCart((e => e.cartTotal))
    const dropCart = useCart((e => e.dropCart))
    var total;
    if (cart.length !== 0) {
        total = (cart.reduce((a, value) => a = a + parseFloat(value.fprice * value.quantity), 0))
        setTotal(total)
    }

    const handleCheckOut = async () => {
        if (fullAddress.length !== 0) {
            let email = read_cookie("email")
            console.log(email)
            if (email != "") {
                axios.post('/api/user/order_data', {
                    email, cart, order_date: new Date().toDateString(), fullAddress
                }).then((response) => {
                    console.log(response)
                    if (response.data.code === 200) {
                        dropCart()
                        navigate("/")
                    } else {
                        alert("Error while placing order")
                    }
                }).catch(err => {
                    alert(err)
                    console.log(err)
                })
            } else {
                alert("Please login for checkout")
            }
        } else {
            alert("Please enter your full address")
        }
    }

    return (
        <>
            <div>
                <Nav />
            </div>
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                {
                    cart.length !== 0 ?
                        <>
                            <MDBContainer className="py-5 h-100">
                                <MDBRow className="justify-content-center align-items-center h-100">
                                    <MDBCol md="10">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                                                Shopping Cart
                                            </MDBTypography>
                                        </div>
                                        <MDBCard>
                                            <MDBTypography tag="p" className="fw-normal mb-0 text-black">
                                                Enter Full Address
                                            </MDBTypography>
                                            <MDBInput type="text" placeholder="House No.,Flat Name or number, Nearby Landmark, City, State" onChange={(e) => setFullAddress(e.target.value)}></MDBInput>
                                        </MDBCard>

                                        {
                                            cart ?
                                                cart.map((data) => {
                                                    return (
                                                        <>
                                                            <MDBCard className="rounded-3 mb-4">
                                                                <MDBCardBody className="p-4">
                                                                    <MDBRow className="justify-content-between align-items-center">
                                                                        <MDBCol md="2" lg="2" xl="2">
                                                                            <MDBCardImage className="rounded-3" fluid
                                                                                src={data.fimg}
                                                                                alt={data.fname} />
                                                                        </MDBCol>
                                                                        <MDBCol md="3" lg="3" xl="3">
                                                                            <p className="lead fw-normal mb-2">{data.fname}</p>
                                                                            <p>
                                                                                <span className="text-muted">Quantity</span> {data.quantity}
                                                                            </p>
                                                                        </MDBCol>

                                                                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                                                            <MDBTypography tag="h5" className="mb-0">
                                                                                ₹{data.fprice * data.quantity}
                                                                            </MDBTypography>
                                                                        </MDBCol>
                                                                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                                            <Link onClick={() => remove(data.fname)} className="text-danger">
                                                                                <MDBIcon fas icon="trash text-danger" size="lg" />
                                                                            </Link>
                                                                        </MDBCol>
                                                                    </MDBRow>
                                                                </MDBCardBody>
                                                            </MDBCard>
                                                        </>
                                                    )
                                                }) : <>
                                                    <p>No item found</p>
                                                </>}

                                        <MDBCard>
                                            <MDBCardBody>
                                                <label> Total : ₹{cartTotal}</label>
                                            </MDBCardBody>
                                        </MDBCard>


                                        {/* <MDBCard className="mb-4">
                                            <MDBCardBody className="p-4 d-flex flex-row">
                                                <MDBInput label="Discound code" wrapperClass="flex-fill" size="lg" />
                                                <MDBBtn className="ms-3" color="warning" outline size="lg">
                                                    Apply
                                                </MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard> */}

                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBBtn onClick={() => handleCheckOut()} className="ms-3" color="warning" block size="lg">
                                                    Checkout
                                                </MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </>
                        : <>
                            <div>
                                <div className='d-flex justify-content-center align-items-center vh-100'>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className=''>
                                            <img src="https://i.ibb.co/3f0jr5n/isometric-plate.png" alt="isometric-plate" className='d-block' />
                                        </div>
                                        <p className='fs-5 mt-4 '>Your cart is empty</p>
                                        <Link to="/" className='btn btn-primary'>Continue shopping</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </section>
            <div>
                <Footer />
            </div>
        </>
    );
}