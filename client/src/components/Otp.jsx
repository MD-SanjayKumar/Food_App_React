import React, { useEffect, useState } from "react"
import { useStore } from "../Store"
import { socket } from "./Socket"
import Axios from "axios"
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function Otp() {
    const navigate = useNavigate()
    // useEffect(() =>{

    // },[])
    const setCred = useStore(state => state.setCredentials)
    const [otp, setOtp] = useState("")

    const SendOtp = async (e) => {
        e.preventDefault()

        Axios.post('/api/verify', {
            otp
        }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
                return navigate("/user/login")
            } else {
                alert("Found some error while creating account.")
            }
        }).catch(err => alert(err))
    }

    const ResendOtp = async (e) => {
        e.preventDefault()

        Axios.get('/api/resend_otp', {
        }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
                alert("OTP Resent")
            }else{
                alert("Something went wrong")
            }
        }).catch(err => alert(err))
    }

    return (
        <>
            <form method="post">
                <MDBContainer fluid>

                    <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">OTP Verification</p>

                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        <MDBIcon fas icon="user me-3" size='lg' />
                                        <MDBInput label='Enter OTP' id='form0' type='text' className='w-100' name="otp" onChange={(e) => setOtp(e.target.value)} />
                                    </div>

                                    <MDBBtn className='mb-4' size='lg' rounded color='dark' onClick={SendOtp}>Verify</MDBBtn>
                                    <MDBBtn className='mb-4' size='lg' rounded color='dark' onClick={ResendOtp}>Resend</MDBBtn>

                                </MDBCol>

                                <MDBCol md='10' lg='5' className='order-1 order-lg-2 d-flex align-items-center '>
                                    <MDBCardImage src='https://i.ibb.co/pfLhKsS/login-Logo.png' fluid />
                                </MDBCol>

                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                </MDBContainer>
                {/* <label htmlFor="email">Enter OTP</label>
                <input name="otp" type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} /> <br />
                <button onClick={SendOtp}>Verify</button> */}
            </form>
        </>
    )
}
export default Otp