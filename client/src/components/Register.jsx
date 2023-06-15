import React, { useEffect, useState } from "react"
import { useStore } from "../Store"
import { socket } from "./Socket"
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
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
import Nav from "./Nav"
import Footer from "./Footer"
import BubbleLoadingAnimation from "./BubbleLoadingAnimation"

function Register() {
    const navigate = useNavigate()
    const setCred = useStore(state => state.setCredentials)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({ email: "", password: "", cpassword: "", name: "", phone: "" })

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const SendData = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { email, password, cpassword, name, phone } = user;
        Axios.post('/api/user_reg', {
            email, password, cpassword, name, phone
        }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
                setLoading(false)
                navigate("/user/reg/otp")
            }
            else if (response.data.code === 201) {
                setLoading(false)
                alert("User already exists")
            }
            else {
                setLoading(false)
                alert("Please enter valid credentials.")
            }
        }).catch(err => alert(err.response.data.message))
    }

    return (
        <>
        {loading && <BubbleLoadingAnimation/>}
            <div>
                <Nav/>
            </div>
            <form method="post">
                <MDBContainer fluid>

                    <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        <MDBIcon fas icon="user me-3" size='lg' />
                                        <MDBInput label='Your Name' id='form0' type='text' className='w-100' name="name" value={user.name} onChange={handleInput}/>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        <MDBIcon fas icon="phone me-3" size='lg' />
                                        <MDBInput label='Phone number' id='form1' type='text' className='w-100' name="phone" value={user.phone} onChange={handleInput}/>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput label='Email address' id='form2' type='email' name="email" value={user.email} onChange={handleInput}/>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="lock me-3" size='lg' />
                                        <MDBInput label='Password' id='form3' type='password' name="password" value={user.password} onChange={handleInput}/>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="key me-3" size='lg' />
                                        <MDBInput label='Confirm password' id='form4' type='password' name="cpassword" value={user.cpassword} onChange={handleInput}/>
                                    </div>

                                    <MDBBtn className='mb-4 px-3 py-1' size='md' rounded color='dark' onClick={SendData}>Register</MDBBtn>

                                </MDBCol>

                                <MDBCol md='10' lg='5' className='order-1 order-lg-2 d-flex align-items-center '>
                                    <MDBCardImage src='https://i.ibb.co/xhhc2yd/signup-Logo.png' fluid />
                                </MDBCol>

                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                </MDBContainer>





                {/* ----------------------- */}

                {/* <label htmlFor="name">Enter Name</label>
                <input name="name" type="text" placeholder="Enter Name" value={user.name} onChange={handleInput} />

                <label htmlFor="phone">Enter Phone Number</label>
                <input name="phone" type="text" placeholder="Enter Phone Number" value={user.phone} onChange={handleInput} />

                <label htmlFor="email">Email</label>
                <input name="email" type="text" placeholder="Enter Email" value={user.email} onChange={handleInput} />

                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Enter Password" value={user.password} onChange={handleInput} />

                <label htmlFor="cpassword">Confirm Password</label>
                <input name="cpassword" type="password" placeholder="Confirm Password" value={user.cpassword} onChange={handleInput} />

                <button onClick={SendData}>Register</button> */}

            </form>
            <div>
                <Footer/>
            </div>
        </>
    )
}

export default Register