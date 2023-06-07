import React from 'react';
import { Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Home from './Home';
import Orders from './Orders';
import Profile from './Profile';


function DeliveryPersonDashboard() {

  return (
        <div className='d-flex'>
            <div className='w-auto'>
                <Sidebar />
            </div>
            <div className='col overflow-auto'>
                {/* <Navbar/>
                <Home/> */}
                    <Routes>
                        <Route path='' element={<><Navbar /><Home /></>}></Route>
                        <Route path='orders' element={<Orders />}></Route>
                        <Route path='profile' element={<Profile />}></Route>
                    </Routes>
                
            </div>
        </div>
  )
}

export default DeliveryPersonDashboard