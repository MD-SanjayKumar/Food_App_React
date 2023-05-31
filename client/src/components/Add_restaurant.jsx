import React, {useState} from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Add_restaurant() {

    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState({ name:"", address:"", email: "", password: "", phone:"", gst_in:"", pan_no:"", image_url:"" })

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setRestaurant({ ...restaurant, [name]: value })
        console.log(restaurant)
    }

    const AddData = async (e) => {
        e.preventDefault()

        const { name, address, email, password, phone, gst_in, pan_no, image_url } = restaurant;
        Axios.post('http://localhost:9000/add_restaurant', {
            name, address, email, password, phone, gst_in, pan_no, image_url
        })
        return navigate("/")
    }

    return (
        <form>
            <div>
                <MDBInput wrapperClass='mb-4' id='form6Example3' label='Restaurant name' name="name" value={restaurant.name} onChange={handleInput} />
                <MDBInput wrapperClass='mb-4' id='form6Example4' label='Address' name="address" value={restaurant.address} onChange={handleInput}/>
                <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='Email' name="email" value={restaurant.email} onChange={handleInput}/>
                <MDBInput wrapperClass='mb-4' type='password' id='form6Example5' label='Password' name="password" value={restaurant.password} onChange={handleInput}/>
                <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Phone' name="phone" value={restaurant.phone} onChange={handleInput}/>
                <MDBInput wrapperClass='mb-4' type='text' id='form6Example6' label='Image URL' name="image_url" value={restaurant.image_url} onChange={handleInput}/>
                <MDBInput wrapperClass='mb-4' id='form6Example3' label='GST No.' name="gst_in" value={restaurant.gst_in} onChange={handleInput}/>
                <MDBInput wrapperClass='mb-4' id='form6Example4' label='PAN No.' name="pan_no" value={restaurant.pan_no} onChange={handleInput}/>

                <MDBBtn className='mb-4' onClick={AddData} block>
                    Add Restaurant
                </MDBBtn>
            </div>
        </form>
    );
}