import React, { useState } from 'react';
import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js"
import { Link } from 'react-router-dom';

function Sidebar() {
    const [active, setActive] = useState(1);
  return (
    <div className=' sidebar d-flex justify-content-between flex-column text-white py-3 ps-3 pe-5 vh-100' style={{backgroundColor:'#2E4F4F'}}>
        <div>
            <Link to='' className='p-3 text-decoration-none text-white'>
                <span className='fs-3 me-1'><strong>myFood</strong></span>
                <i class="fa-solid fa-utensils fs-4 text-black"></i>
            </Link>
            <hr className='text-white mt-2'/>
            <ul className='nav nav-pills flex-column mt-2'>

                {/* dashboard */}
                <li className={active ===1 ? ' active nav-item p-2 my-1': 'nav-item p-2 my-1'}
                onClick={e => setActive(1)}>
                    <Link  to="" className='p-1 text-decoration-nonde text-white'>
                        <i className='bi bi-speedometer2 me-3 fs-6'></i>
                        <span className='fs-6'>Dashboard</span>
                    </Link>
                </li>
                
                {/* order */}
                <li className={active ===2 ? ' active nav-item p-2 my-1': 'nav-item p-2 my-1'}
                onClick={e => setActive(2)}>
                    <Link to="/delivery-person/orders" className='p-1 text-decoration-nonde text-white'>
                        <i className='bi bi-table me-3 fs-6'></i>
                        <span className='fs-6'>Orders</span>
                    </Link>
                </li>

                {/* Profile */}
                <li className={active ===5 ? ' active nav-item p-2 my-1': 'nav-item p-2 my-1'}
                onClick={e => setActive(5)}>
                    <Link to="/delivery-person/profile" className='p-1 text-decoration-nonde text-white'>
                        <i className='bi bi-person-circle me-3 fs-6'></i>
                        <span className='fs-6'>Profile</span>
                    </Link>
                </li>
            </ul>
        </div>

        <div>
            {/* <hr className='text-white'/>
            <div className='nav-item p-2'>
                <a href='/' className='p-1 text-decoration-none text-white'>
                    <i className='bi bi-person-circle me-3 fs-6'></i>
                    <span className='fs-6'>Profile</span>
                </a>
            </div> */}
        </div>
    </div>
  )
}

export default Sidebar