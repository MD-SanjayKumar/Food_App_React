import React from 'react'
import Navbar from './Navbar'

function Orders() {
  return (
    <div>
        <Navbar />
        <div className='p-5 bg-light'>
            <div className='bg-white rounded p-4'>
                <div className='row'>
                        <div className='col-lg-6 d-flex justify-content-start '>
                            <div className='d-flex justify-content-center w-25 ms-5 me-4'>
                                <img
                                    src="https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"
                                    className="w-100 rounded"
                                />
                            </div>
                            <div className=''>
                                <p className='fs-5 mb-0'>McDonald's</p>
                                <p className='mb-0'>Burger</p>
                                <span className='fs-6'>₹ 450.0</span>
                            </div>
                        </div>
                        <div className='col-lg-6 ps-5 d-flex flex-column justify-content-center align-items-end'>
                            <div className=''>
                                UserId - <span className='text-secondary '>1234567890</span>
                            </div>
                            <div className=''>
                                07: 30 pm
                            </div>
                            <div className='text-success'>
                                <i className="fa-regular fa-circle-check"></i> 
                                <span>&nbsp;Success</span>
                            </div>
                        </div>
                        <hr className='my-2'/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Orders