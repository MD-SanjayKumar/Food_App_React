import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useAdminStore } from '../../Store';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate()
  const setCred = useAdminStore(state => state.setCredentials)
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
    axios.post('/api/admin/login', {
      email, password
    }).then((response) => {
      console.log(response)
      if (response.status === 202) {
        setCred(email, password)
        return navigate("/admin/dashboard")
      }
    }).catch(err => alert(err))
  }


  return (
    <div>
      <form method="post" onSubmit={SendData}>
        <MDBContainer fluid>
          <MDBCard className="text-black m-5" style={{ borderRadius: "25px", height: '80vh' }}>
            <MDBCardBody className="d-flex align-items-center">
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
                    Admin<br/>Sign in
                  </p>



                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput label="Your Email" id="form2" type="email" name="email" value={user.email} onChange={handleInput} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput label="Password" id="form3" type="password" name="password" value={user.password} onChange={handleInput} />
                  </div>

                  <MDBBtn className="mb-4" size="lg">
                    Login
                  </MDBBtn>

                </MDBCol>


              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  )
}

export default AdminLogin