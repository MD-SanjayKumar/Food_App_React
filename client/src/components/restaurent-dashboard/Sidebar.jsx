import React, { useState } from 'react';
import './style.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js"
import { Link } from 'react-router-dom';

function Sidebar() {
    const [active, setActive] = useState(1);
  return (
    <div className=' sidebar d-flex justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-5 vh-100'>
        <div>
            <Link to='' className='p-3 text-decoration-none text-white'>
                <span className='fs-3 me-1'><strong>myFood</strong></span>
                <i className="fa-solid fa-utensils fs-4 text-warning"></i>
            </Link>
            <hr className='text-white mt-2'/>
            <ul className='nav nav-pills flex-column mt-2'>

                {/* dashboard */}

                <li className={active ===1 ? ' active nav-item p-2 my-1': 'nav-item p-2 my-1'}
                onClick={e => setActive(1)}>
                    <Link  to="" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-speedometer2 me-3 fs-6'></i>
                        <span className='fs-6'>Dashboard</span>
                    </Link>
                </li>

                {/* restaurants */}

                <li className={active ===2 ? ' active nav-item p-2 my-1': 'nav-item dropdown p-2 my-1'}
                onClick={e => setActive(2)}>
                    <a className="p-1 text-decoration-nonde text-white">
                    <i className='bi bi-card-checklist me-3 fs-6'></i>
                        <span className='fs-6 '>Menu</span>
                    </a>
                    <button type="button" className="btn dropdown-toggle dropdown-toggle-split p-0 ms-auto fs-6 text-white " data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark border-primary">
                        <li><Link to="/restaurant_dash/add-menu" className="dropdown-item">Add Menu</Link></li>
                        <li><Link to="/restaurant_dash/list-menu" className="dropdown-item">List Menu</Link></li>
                    </ul>

                    {/* <Link to="/admin/restaurants" className='p-1 text-decoration-nonde text-white'>
                        <i className='bi bi-houses me-3 fs-6'></i>
                        <span className='fs-6'>Restaurants</span>
                    </Link> */}
                </li>
                
                {/* order */}

                <li className={active ===4 ? ' active nav-item p-2 my-1': 'nav-item p-2 my-1'}
                onClick={e => setActive(4)}>
                    <Link to="/restaurant_dash" className='p-1 text-decoration-nonde text-white'>
                        <i className='bi bi-table me-3 fs-6'></i>
                        <span className='fs-6'>Orders</span>
                    </Link>
                </li>
            </ul>
        </div>

        <div>
            <hr className='text-white'/>
            <div className='nav-item p-2'>
                <a href='/' className='p-1 text-decoration-none text-white'>
                    <i className='bi bi-person-circle me-3 fs-6'></i>
                    <span className='fs-6'>Admin</span>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Sidebar