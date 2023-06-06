import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Home from './Home';
import MenuList from './MenuList';
import Add_product from '../Add_product';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { useRestaurantStore } from '../../Store';
import axios from 'axios';


function RestaurantDashboard() {

  const email = useRestaurantStore((e => e.email))
  let rid = read_cookie("restaurant_id")

  useEffect(() => {
    // getData()
    console.log(rid)
  }, [])

  // async function getData() {
  //   console.log(email)
  //   if (email != "") {
  //     axios.post('/api/restaurant_id', {
  //       email
  //     }).then((response) => {
  //       console.log(response.data)
  //       bake_cookie("id",response.data)
  //     }).catch(err => {
  //       alert(err)
  //       console.log(err)
  //     })
  //   } else {
  //     alert("Please login to see you order history.")
  //   }
  // }

  return (
    <div className='d-flex'>
      <div className='w-auto'>
        <Sidebar />
      </div>
      <div className='col overflow-auto'>
        <Routes>
          <Route path='' element={<><Navbar /><Home /></>}></Route>
          <Route path='add-menu' element={<Add_product />}></Route>
          <Route path='list-menu' element={<MenuList />}></Route>
          {/* <Route path='delivery-persons-list' element={<DeliveryPersonsList />}></Route>
                        <Route path='orders' element={<Orders />}></Route> */}
        </Routes>

      </div>
    </div>
  )
}

export default RestaurantDashboard