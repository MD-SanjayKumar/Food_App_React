import React, { useEffect, useState } from 'react'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { useDeliveryStore } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';

function Navbar() {
  const navigate = useNavigate()
  const dpid = useDeliveryStore((e)=> e.dp_id);
  const setDid = useDeliveryStore((e)=> e.setDpId)
  const uid = read_cookie("delivery_person_id");
  const [status, setStatus] = useState('')
  const is_log = useDeliveryStore((e)=> e.is_logged)
  const setLog = useDeliveryStore(state => state.setLog)
  let coords = []

  useEffect(()=>{
    getStatus(uid)
    if(status === 'inactive'){
      getCurrentMovements()
    }
  })

  const getStatus = (i) =>{
    axios.post("/api/delivery_person/status",{i})
    .then((res)=> {
      setStatus(res.data.status)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getCurrentMovements = () =>{
    navigator.geolocation.watchPosition(
        (data)=>{
            console.log(data)
            coords.push([data.coords.latitude, data.coords.longitude])
            console.log(coords)
        },
        (err) =>{
            console.log(err)
        },{
            enableHighAccuracy: true
        }
    )
  }

  const handleStart = (id) =>{
    getCurrentMovements()
    axios.post("/api/delivery_person/start",{id})
    .then((res)=> {
      if (res.data.code == 200){
        setLog(1)
      }
      console.log(res.data.code)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleStop = (id) =>{
    axios.post("/api/delivery_person/stop",{id})
    .then((res)=> {
      if (res.data.code == 200){
        setLog(0)
      }
      console.log(res.data.code)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleLogout = () =>{
    console.log("Called logout")
    delete_cookie("delivery_person_id")
    setDid("")
    navigate("/delivery_login")
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:'#2E4F4F'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item border rounded">
              <a className="nav-link text-white" aria-current="page" href="">
                <i className='bi bi-search me-1'></i>Search
              </a>
            </li> */}
            { status === 'inactive' && is_log === 0 ?
            <li className="nav-item mx-2 border rounded">
              <MDBBtn onClick={()=> handleStart(uid)}>
                Start
              </MDBBtn>
            </li> 
            : 
            <li className="nav-item mx-2 border rounded">
            <MDBBtn onClick={()=> handleStop(uid)}>
              Stop
            </MDBBtn>
          </li>
            } 
            <li className="nav-item border rounded">
              <MDBBtn onClick={()=>handleLogout()}>
                Logout
              </MDBBtn>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar