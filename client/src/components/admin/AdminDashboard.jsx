import React from 'react';
import Sidebar from './Sidebar';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Navbar';
import Home from './Home';
import { Routes, Route} from 'react-router-dom';
import Restaurants from './Restaurants';
import RestaurantsList from './RestaurantsList';
import DeliveryPersonsList from './DeliveryPersonsList';
import Orders from './Orders';
import Add_restaurant from '../Add_restaurant';
import AddDeliveryPerson from './AddDeliveryPerson';

function AdminDashboard() {
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
                        <Route path='restaurants' element={<Add_restaurant />}></Route>
                        <Route path='restaurants-list' element={<RestaurantsList />}></Route>
                        <Route path='delivery_person' element={<AddDeliveryPerson />}></Route>
                        <Route path='delivery-persons-list' element={<DeliveryPersonsList />}></Route>
                        <Route path='orders' element={<Orders />}></Route>

                    </Routes>
                
            </div>
        </div>
  )
}

export default AdminDashboard