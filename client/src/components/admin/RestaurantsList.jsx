import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';


function RestaurantsList() {
  const [show, setShow] = useState(false);
  const [restaurant, setRestaurant] = useState([])
  const [current_option, setCurrentOption] = useState("")
  const [changeVal, SetChangeVal] = useState("")

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    axios({
      url: '/api/restaurant_data',
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data)
        setRestaurant(response.data)
      })
      .catch(err => {
        console.log(err);
        alert(err)
      })
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = (id) => {
    axios.post('/api/restaurant_data/update', {
      id, current_option, changeVal
    }).then((response) => {
      if (response.status == 200) {
        getData()
        setShow(false)
        alert(`Updated Restaurant with ID: ${id}`)
      }
      console.log(response)
    }).catch(err => alert(err))
  };

  const handleDelete = (id) => {
    axios.post('/api/restaurant_data/del', {
      id
    }).then((response) => {
      if (response.status == 200) {
        getData()
        alert(`Deleted Restaurant with ID: ${id}`)
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

            <tbody>
              {restaurant ?
                restaurant.map((data, index) =>
                (
                  <>
                    <tr>
                      <th scope='row'>{index + 1}</th>
                      <th><b>{data.name}</b></th>
                      <th>{data.address}</th>
                      <th className='text-center'>
                        <button className='bg-transparent border-0' onClick={handleShow}>
                          <i className='fa fa-edit'></i>
                        </button>

                        <button className='bg-transparent border-0' onClick={() => handleDelete(data._id)}>
                          <i className='fa-regular fa-trash-can'></i>
                        </button>
                      </th>
                    </tr>

                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Information</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="d-flex flex-column align-items-center py-4 ">
                          <div className="w-75 pb-3">
                            <select name="" className=" w-100 p-2" onChange={(e) => setCurrentOption(e.target.value)}>
                            <option>Select One Option</option>
                              <option value="name">Name</option>
                              <option value="address">Address</option>
                            </select>
                          </div>

                          <div className="w-75 pb-4">
                            <input
                              type="text"
                              className="w-100 p-1"
                              placeholder="Enter value here"
                              onChange={(e)=>SetChangeVal(e.target.value)}
                            />
                          </div>

                          <div className="">
                            <button className="btn btn-outline-secondary" onClick={() => handleUpdate(data._id)}>Update</button>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                )) : <>No Restaurant Found</>}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default RestaurantsList