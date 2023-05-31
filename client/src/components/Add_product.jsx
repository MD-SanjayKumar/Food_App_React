import React, { useState, useMemo } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBDropdown,
} from 'mdb-react-ui-kit';
import {Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Add_product() {

    const navigate = useNavigate()
    const [product, setProduct] = useState({ food_name: "", food_category: "", food_price: "", food_image: "", food_availability: undefined, is_veg: undefined })
    // const [avail, setAvail] = useState(null);

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setProduct({ ...product, [name]: value })
        console.log(product)
    }

    const AddData = async (e) => {
        e.preventDefault()

        const { food_name, food_category, food_price, food_image, food_availability, is_veg } = product;
        Axios.post('http://localhost:9000/add_product', {
            food_name, food_category, food_price, food_image, food_availability, is_veg
        })
        return navigate("/")
    }

    return (
        <form>
            <div>
                <MDBInput wrapperClass='mb-4' id='form6Example3' label='Food Name' name="food_name" value={product.food_name} onChange={handleInput} />
                <MDBInput wrapperClass='mb-4' id='form6Example4' label='Food Price' name="food_price" value={product.food_price} onChange={handleInput} />
                <MDBInput wrapperClass='mb-4' type='text' id='form6Example5' label='Food Category' name="food_category" value={product.food_category} onChange={handleInput} />
                <MDBInput wrapperClass='mb-4' type='text' id='form6Example5' label='Food Image URL' name="food_image" value={product.food_image} onChange={handleInput} />
                <Form.Select name='food_availability' value={product.food_availability} onChange={handleInput}>
                    <option>Select One</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </Form.Select> 
                <Form.Select name='is_veg' value={product.is_veg} onChange={handleInput}>
                    <option>Select One</option>
                    <option value={true}>Veg</option>
                    <option value={false}>Non Veg</option>
                </Form.Select>

                <MDBBtn className='mb-4' onClick={AddData} block>
                    Add Product
                </MDBBtn>
            </div>
        </form>
    );
}