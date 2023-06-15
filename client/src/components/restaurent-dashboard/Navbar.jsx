import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { useRestaurantStore } from '../../Store';
import { MDBBtn } from 'mdb-react-ui-kit';

function Navbar() {
  const navigate = useNavigate()
  const setRid = useRestaurantStore((e)=> e.setRid)

  const handleLogout = () =>{
    delete_cookie("restaurant_id");
    setRid("");
    navigate("/restaurant_login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
              <a className="nav-link text-white" aria-current="page" href="#">
                <i className='bi bi-search me-1'></i>Search
              </a>
            </li>
            <li className="nav-item mx-2 border rounded">
              <a className="nav-link text-white" aria-current="page" href="#">
                Account
              </a>
            </li> */}
    
            <li className="nav-item border rounded">
              <MDBBtn color="black" className="btn btn-outline-light" onClick={()=>{
                handleLogout()
              }}>
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