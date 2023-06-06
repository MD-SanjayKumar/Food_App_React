import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Otp from './components/Otp'
import Homepage from './components/Homepage'
import Otp_log from './components/Otp_log'
import Nav from './components/Nav';
import Add_restaurant from './components/Add_restaurant';
import Add_product from './components/Add_product';
import Footer from './components/Footer';
import Get_location from './components/Get_location';
import Items from './components/Items';
import Cart from './components/Cart';
import MyOrders from './components/MyOrders';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import RestaurantDashboard from './components/restaurent-dashboard/RestaurantDashboard';
import RestaurantLogin from './components/restaurent-dashboard/RestaurantLogin';
import DeliveryLogin from './components/delivery-persons/DeliveryLogin';
import DeliveryPersonDashboard from './components/delivery-persons/DeliveryPersonDashboard';


function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/user/reg' element={<Register />} />
          <Route exact path='/user/login' element={<Login />} />
          <Route exact path='/user/reg/otp' element={<Otp />} />
          <Route exact path='/user/log/otp' element={<Otp_log />} />
          <Route exact path='/restaurant/add' element={<Add_product />} />
          <Route exact path='/restaurant/:id/:name/menu' element={<Items />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route path='/*' element={<Homepage />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route exact path='/admin/login' element={<AdminLogin />} />
          <Route exact path='/admin/*' element={<AdminDashboard />} />
          <Route exact path='/restaurant_dash/*' element={<RestaurantDashboard />} />
          <Route exact path='/restaurant_login' element={<RestaurantLogin />} />
          <Route exact path='/delivery_login' element={<DeliveryLogin />} />
          <Route exact path='/delivery-person/*' element={<DeliveryPersonDashboard />} />

          <Route exact path='/test' element={<Get_location />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
