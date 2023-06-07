import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Button, Modal} from "react-bootstrap";
import axios from 'axios';

function DeliveryPersonsList() {
    const [show, setShow] = useState(false);

    const [details, setDetails] = useState();
    
    useEffect(() => {
        getData()
    }, [])
    
    async function getData() {
            axios.get('/api/delivery/list').then((response) => {
                console.log("----",response.data)
                setDetails(response.data)
            }).catch(err => {
                alert(err)
                console.log(err)
            })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
        <Navbar/>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center py-4 ">
            <div className="w-75 pb-3">
              <select name="" className=" w-100 p-2">
                <option className="p-2 m-3 " value={"name"}>
                  Name
                </option>
                <option value={"price"}>Salary</option>
                <option value={"address"}>Address</option>
              </select>
            </div>

            <div className="w-75 pb-4">
              <input
                type="text"
                className="w-100 p-1"
                placeholder="Enter value here"
              />
            </div>

            <div className="">
              <button className="btn btn-outline-secondary">Update</button>
            </div>
          </div>
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
        <div className='p-5 bg-light'>
            <div className='bg-white rounded p-4'>
                <table className='table caption-top'>
                    <caption className='text-black fs-4'>Delivery Persons</caption>

                    <tbody>
                      { details ? details.map((e, i)=>{
                        return(

                      
                        <tr>
                            <th scope='row'>{i+1}</th>
                            <th>{e.name}</th>
                            <th className='text-center'>
                                <button className='bg-transparent border-0' onClick={handleShow}>
                                    <i className='fa fa-edit'></i>
                                </button>

                                <button className='bg-transparent border-0'>
                                <i className='fa-regular fa-trash-can'></i>
                                </button>
                            </th>
                        </tr>
                          )
                        }):<>No data found</>}
                        
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default DeliveryPersonsList