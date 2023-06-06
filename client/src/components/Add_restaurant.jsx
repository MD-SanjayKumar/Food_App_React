import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import GetLatLong from './admin/GetLatLong';
import { useAdminStore } from '../Store';

export default function Add_restaurant() {

    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState({ name: "", address: "", email: "", phone: "", gst_in: "", pan_no: "", description: "",image_url: "" })
    const [address, setAddress] = useState()
    const [opt, setOptions] = useState([])
    const [singleSelections, setSingleSelections] = useState([]);
    const lat = useAdminStore((e)=>e.lat)
    const long = useAdminStore((e)=>e.long)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setRestaurant({ ...restaurant, [name]: value })
        console.log(restaurant)
    }

    const AddData = async (e) => {
        e.preventDefault()

        const { name, address, email, phone, gst_in, pan_no, description, image_url } = restaurant;
        Axios.post('/api/add_restaurant', {
            name, address, email, phone, gst_in, pan_no, description, image_url, lat, long
        }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
                return navigate("/admin")
            }else{
                alert("Something went wrong while adding new restaurant.")
            }
        }).catch(err => alert(err))
    }

    let apiKey = "438e9167cbe344389c24fa16ceb8e885"
    const suggestionsAddr = async (e) => {
        console.log(e.target.value)
        // const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${e}&format=json&apiKey=${apiKey}`);
        // const data = await response.json();
        // console.log(data.results);
        // setOptions(data.results);
        // setAddress(e);
    }

    return (
        <div style={{ marginTop: '40px', width: '50%' }}>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GetLatLong />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
                </Modal.Footer>
            </Modal>
            <h3>Add Restaurant</h3>
            <form onSubmit={AddData}>
                <div>
                    <MDBInput className='mb-4' id='form6Example3' label='Restaurant name' name="name" value={restaurant.name} onChange={handleInput} />
                    <MDBInput className='mb-4' id='form6Example4' label='Address' name="address" value={restaurant.address} onChange={handleInput} />
                    <MDBInput className='mb-4' type='email' id='form6Example5' label='Email' name="email" value={restaurant.email} onChange={handleInput} />
                    {/* <MDBInput wrapperClass='mb-4' type='password' id='form6Example5' label='Password' name="password" value={restaurant.password} onChange={handleInput} /> */}
                    <MDBInput className='mb-4' type='tel' id='form6Example6' label='Phone' name="phone" value={restaurant.phone} onChange={handleInput} />
                    <MDBInput className='mb-4' type='text' id='form6Example6' label='Image URL' name="image_url" value={restaurant.image_url} onChange={handleInput} />
                    <MDBInput className='mb-4' id='form6Example3' label='GST No.' name="gst_in" value={restaurant.gst_in} onChange={handleInput} />
                    <MDBInput className='mb-4' id='form6Example4' label='PAN No.' name="pan_no" value={restaurant.pan_no} onChange={handleInput} />
                    <MDBInput className='mb-4' type='text' id='form6Example6' label='Restaurant Description' name="description" value={restaurant.description} onChange={handleInput} />

                    <MDBBtn className='mb-4' block>
                        Add Restaurant
                    </MDBBtn>
                </div>
            </form>
            <button onClick={handleShow}>Set location from map</button>
        </div>
    );
}