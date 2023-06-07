import React, { useEffect, useState } from "react"
import { useStore } from "../Store"
import { socket } from "./Socket"
import { Link, useNavigate } from "react-router-dom"
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
} from "mdb-react-ui-kit"
import Nav from "./Nav"
import Footer from "./Footer"
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

function Login() {
    const navigate = useNavigate()
    const setCred = useStore(state => state.setCredentials)
    const setUid = useStore(state => state.setUid)
    const [user, setUser] = useState({ email: "", password: "" })

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const SendData = async (e) => {
        e.preventDefault()

        const { email, password } = user;
        Axios.post('/api/user_lg', {
            email, password
        }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
                setUid(response.data.user_id)
                bake_cookie("user_id", response.data.user_id)
                setCred(email, password)
                return navigate("/user/log/otp")
            }else{
                alert("invalid credentials")
            }
        }).catch(err => alert(err.response.data.message))
    }

    return (
        <>
        <div>
                <Nav/>
            </div>
            <form method="post" onSubmit={SendData}>
                <MDBContainer fluid>
                    <MDBCard className="text-black m-5 h-100" style={{ borderRadius: "25px" }}>
                        <MDBCardBody>
                            <MDBRow className="justify-content-center">
                                <MDBCol
                                    md="10"
                                    lg="5"
                                    className="order-2 order-lg-1 d-flex align-items-center "
                                >
                                    <MDBCardImage src="https://i.ibb.co/4mX0dz4/login-Logo2.png" fluid />
                                </MDBCol>
                                <MDBCol
                                    md="10"
                                    lg="6"
                                    className="order-1 order-lg-2 d-flex flex-column align-items-center"
                                >
                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                        Sign in
                                    </p>



                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="envelope me-3" size="lg" />
                                        <MDBInput label="Email address" id="form2" type="email" name="email" value={user.email} onChange={handleInput} />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="lock me-3" size="lg" />
                                        <MDBInput label="Password" id="form3" type="password" name="password" value={user.password} onChange={handleInput} />
                                    </div>

                                    <MDBBtn className="mb-4" size="lg" rounded color='dark'>
                                        Login
                                    </MDBBtn>
                                    <p className="text-center">Not a member? <Link to='/user/reg'>Register</Link></p>
                                </MDBCol>


                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </form>
            <div>
                <Footer/>
            </div>
        </>
    )
}
export default Login