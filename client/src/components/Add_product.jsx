import React, { useState, useMemo } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBDropdown,
} from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import BubbleLoadingAnimation from './BubbleLoadingAnimation';

export default function Add_product() {

    const navigate = useNavigate()
    const [product, setProduct] = useState({ food_name: "", food_category: "", food_price: "", food_image: "", food_availability: undefined, is_veg: undefined, food_quantity:"" })
    // const [avail, setAvail] = useState(null);
    let rid = read_cookie("restaurant_id");
    const [loading, setLoading] = useState(false)

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setProduct({ ...product, [name]: value })
        console.log(product)
    }

    const AddData = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { food_name, food_category, food_price, food_image, food_availability, is_veg, food_quantity } = product;
        Axios.post('/api/add_product', {
            rid, food_name, food_category, food_price, food_image, food_availability, is_veg, food_quantity
        }).then((response) => {
            if (response.data.code == 200){
                setLoading(false)
                navigate("/restaurant_dash")
                console.log(response)
            }
            else{
                setLoading(false)
                alert("Something went wrong while adding new item.")
            }
        }).catch(err => {
            alert(err)
            console.log(err)
        })
       
    }

    return (
        <>
          {loading && <BubbleLoadingAnimation/>}
        <div style={{ marginTop: '40px', width: '50%' }}>
            <h3>Add Item</h3>
            <form method='post' onSubmit={AddData}>
                <div>
                    <MDBInput className='mb-4' id='form6Example3' label='Food Name' name="food_name" value={product.food_name} onChange={handleInput} />
                    <MDBInput className='mb-4' id='form6Example4' label='Food Price' name="food_price" value={product.food_price} onChange={handleInput} />
                    <MDBInput className='mb-4' type='text' id='form6Example5' label='Food Category' name="food_category" value={product.food_category} onChange={handleInput} />
                    <MDBInput className='mb-4' type='text' id='form6Example5' label='Food Image URL' name="food_image" value={product.food_image} onChange={handleInput} />
                    <MDBInput className='mb-4' type='text' id='form6Example5' label='Food Quantity' name="food_quantity" value={product.food_quantity} onChange={handleInput} />
                    <label className='mb-4'>Availability</label>
                    <Form.Select name='food_availability' value={product.food_availability} onChange={handleInput}>
                        <option>Select One</option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </Form.Select>
                    <br />
                    <label>Veg / Non-Veg</label>
                    <Form.Select name='is_veg' value={product.is_veg} onChange={handleInput}>
                        <option>Select One</option>
                        <option value={true}>Veg</option>
                        <option value={false}>Non Veg</option>
                    </Form.Select>
                    <br />
                    <MDBBtn className='mb-4' block>
                        Add Item
                    </MDBBtn>
                </div>
            </form>
        </div>
        </>
    );
}