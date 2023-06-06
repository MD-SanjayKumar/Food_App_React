import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Button, Modal } from "react-bootstrap";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import axios from 'axios';


function MenuList() {
    const [show, setShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [itemData, setItemData] = useState();
    const [current_option, setCurrentOption] = useState("")
    const [changeVal, SetChangeVal] = useState("")
    const id = read_cookie("restaurant_id");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleDeleteClose = () => setDeleteModal(false);
    // const handleDeleteShow = () => setDeleteModal(true);

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        axios.get('/api/menu_data').then((response) => {
            console.log(response)
            setItemData(response.data)
        }).catch(err => alert(err))
    }

    const handleUpdate = (id) => {
        axios.post('/api/item/update', {
            id, current_option, changeVal
        }).then((response) => {
            if (response.data.code === 200) {
                getData()
                setShow(false)
                alert(`Updated Item with ID: ${id}`)
            }else{
                alert("Unable to update.")
            }
            console.log(response)
        }).catch(err => alert(err))
    };

    const handleDelete = (id) => {
        axios.post('/api/item/delete', {
            id
        }).then((response) => {
            if (response.data.code == 200) {
                getData()
                alert(`Item deleted Successfully.`)
            }else{
                alert("Something went wrong while deleting item")
            }
            console.log(response)
        }).catch(err => alert(err))
    };

    return (
        <div>
            <Navbar />


            <div className='p-5 bg-light'>
                <div className='bg-white rounded p-4'>
                    <table className='table caption-top'>
                        <caption className='text-black fs-4'>Restaurants</caption>

                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Type</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                itemData ?
                                    itemData.filter((data) => data.rid == id).map((filteredData, i) => {

                                        return (
                                            <>
                                                <tr>
                                                    <th scope='row'>{i + 1}</th>
                                                    <th style={{ width: '100px' }}>
                                                        <img src={filteredData.food_image}
                                                            className="w-100" />
                                                    </th>
                                                    <th>{filteredData.food_name}</th>
                                                    <th>₹{filteredData.food_price}</th>
                                                    <th>{filteredData.food_category}</th>
                                                    {filteredData.is_veg === true ? <th><i className='fa fa-circle text-success'></i></th> : <th><i className='fa fa-circle text-danger'></i></th>}
                                                    <th className='text-center'>
                                                        <button className='bg-transparent border-0' onClick={handleShow}>
                                                            <i className='fa fa-edit'></i>
                                                        </button>

                                                        <button className='bg-transparent border-0' onClick={() => { handleDelete(filteredData._id) }}>
                                                            <i className='fa-regular fa-trash-can'></i>
                                                        </button>
                                                    </th>
                                                </tr>


                                                {/* Edit menu modal */}

                                                <Modal show={show} onHide={handleClose} animation={false}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Edit Information</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="d-flex flex-column align-items-center py-4 ">
                                                            <div className="w-75 pb-3">
                                                                <select name="" className=" w-100 p-2" onChange={(e) => setCurrentOption(e.target.value)}>
                                                                    <option>Select one option</option>
                                                                    <option value="name">Name</option>
                                                                    <option value="img"> Image link</option>
                                                                    <option value="price">Price</option>
                                                                </select>
                                                            </div>

                                                            <div className="w-75 pb-4">
                                                                <input
                                                                    type="text"
                                                                    className="w-100 p-1"
                                                                    placeholder="Enter value here"
                                                                    onChange={(e) => SetChangeVal(e.target.value)}
                                                                />
                                                            </div>

                                                            <div className="">
                                                                <button className="btn btn-outline-secondary" onClick={()=>{handleUpdate(filteredData._id)}}>Update</button>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </>
                                        )

                                    }) : <><p>No item found :/</p></>
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default MenuList



{/* <Modal show={deleteModal} onHide={handleDeleteClose} animation={false}>
<Modal.Header closeButton>
     <Modal.Title>Edit Information</Modal.Title> 
</Modal.Header>
<Modal.Body>
    <div className="d-flex flex-column align-items-center py-4 ">
        <p className='fs-5'>Are you sure you want to delete this item?</p>

        <div className="">
            <button className="btn btn-outline-secondary m-1" onClick={()=>{handleDelete}}>Yes</button>
            <button className="btn btn-outline-secondary m-1" onClick={handleDeleteClose}>No</button>
        </div>
    </div>
</Modal.Body>
</Modal>  */}