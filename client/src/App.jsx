import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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

function App() {

  return (
    <>
      <Nav />
       <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/user/reg' element={<Register/>} />
            <Route exact path='/user/login' element={<Login />} />
            <Route exact path='/user/reg/otp' element={<Otp />} />
            <Route exact path='/user/log/otp' element={<Otp_log />} />
            <Route exact path='/admin/restaurant/add' element={<Add_restaurant />} />
            <Route exact path='/restaurant/add' element={<Add_product />} />
            <Route exact path='/cur' element={<Get_location />} />
            <Route path='/*' element={<Homepage />} />
          </Routes>
        </BrowserRouter>
        <Footer/>
    </>
  )
}

export default App
