import React from 'react'
import Navbar from './Navbar'

function Orders() {
  return (
    <div>
        <Navbar />
        <div className='row bg-light justify-content-center py-5'>
            
            {/* this div will be in map function */}
                <div className='col-lg-6 border rounded bg-white m-2'>
                    <div className='row'>
                        <div className='col-6 py-2'>
                            <p className='mb-0 text-secondary' style={{fontSize: '12px', fontWeight: 'bold'}}>PICK UP</p>
                            <p className='mb-0 fs-5'>Mc Donald's</p>
                            <p className='mb-0 text-truncate' style={{fontSize: '12px'}}>Address will be here</p>
                        </div>
                        <div className='col-6 py-2'>
                            <p className='mb-0 text-secondary' style={{fontSize: '12px', fontWeight: 'bold'}}>DROP OFF</p>
                            <p className='mb-0 fs-5'>Sanjay suthar🙂</p>
                            <p className='mb-0 text-truncate' style={{fontSize: '12px'}}>Address will be here</p>
                        </div>
                    </div>
                    <hr className='my-1' />
                    <div className='row border-bottom d-flex align-items-end' style={{fontSize: '13px'}}>
                        <div className='col-6 me-auto'>
                            <div className='row'>
                                <div className='col'>Total distance <span style={{fontWeight: 'bold'}}>12km</span></div>
                                <div className='col'>Estimate time <span style={{fontWeight: 'bold'}}>30min</span></div>
                            </div>
                        </div>
                        <div className='col-2 ms-auto'>Fare <span style={{fontWeight: 'bold'}}>₹130</span></div>
                    </div>
                    {/* <hr className='m-0' /> */}
                    <div className='row'>
                        <div className='d-flex justify-content-end p-2'>
                            <button className='btn btn-outline-danger  m-2'>Reject</button>
                            <button className='btn btn-success m-2'>Accept</button>
                        </div>
                    </div>
                </div>
            {/* map function end here */}


        </div>
    </div>
  )
}

export default Orders