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

export default function AddDeliveryPerson() {

    const navigate = useNavigate()
    const [delivery, setDelivery] = useState({ name: "", address: "", email: "", phone: "", aadhar_no: "" })

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setDelivery({ ...delivery, [name]: value })

    }

    const AddData = async (e) => {
        e.preventDefault()
        const { name, address, email, phone, aadhar_no } = delivery;
        Axios.post('/api/add_delivery_person', {
            name, address, email, phone, aadhar_no
        }).then((response) => {
            console.log(response)
            if (response.data.code === 200) {
                return navigate("/admin")
            }else{
                alert("Something went wrong while adding new person.")
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
            
            <h3>Add Delivery Person</h3>
            <form onSubmit={AddData}>
                <div>
                    <MDBInput className='mb-4' id='form6Example3' label='Name' name="name" value={delivery.name} onChange={handleInput} />
                    <MDBInput className='mb-4' id='form6Example4' label='Address' name="address" value={delivery.address} onChange={handleInput} />
                    <MDBInput className='mb-4' type='email' id='form6Example5' label='Email' name="email" value={delivery.email} onChange={handleInput} />
                    <MDBInput className='mb-4' type='text' id='form6Example5' label='Aadhar No.' name="aadhar_no" value={delivery.aadhar_no} onChange={handleInput} />
                    <MDBInput className='mb-4' type='tel' id='form6Example6' label='Phone' name="phone" value={delivery.phone} onChange={handleInput} />

                    <MDBBtn className='mb-4' block>
                        Add Delivery Person
                    </MDBBtn>
                </div>
            </form>
        </div>
    );
}