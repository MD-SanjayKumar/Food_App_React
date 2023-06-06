import React from 'react'
import Navbar from './Navbar'

function Profile() {
  return (
    <div className='vh-100 hide-scroll'>
        <Navbar />
        <div className='h-100 d-flex justify-content-center align-items-center'>
            <div className='bg-light d-flex flex-column align-items-center justify-content-center border rounded px-5' style={{width:'20em', height:'25em'}}>
                <div className='mb-1' style={{width: '80px', height: '80px'}}>
                    <img src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1686042919~exp=1686043519~hmac=48ac51d5ea029baec65e1e002cca68fe0b8d46b462986848e687df60b2dcdf40' alt="undraw-Male-avatar-g98d" className='d-block h-100 rounded-circle'></img>
                </div>
                <p>Sanjay suthar🙂</p>
                <div className='d-flex pb-4' style={{fontSize:'14px'}}>
                    <div style={{fontWeight:'bold'}}>
                        <p className='mb-1'>Email:&nbsp;</p>
                        <p className='mb-1'>Contect:&nbsp;</p>
                        <p className='mb-1'>Address:&nbsp;</p>
                    </div>
                    <div>
                        <p className='mb-1'>sanjaykumar@gmail.com</p>
                        <p className='mb-1'>+91 <span>1234567890</span></p>
                        <p className='mb-1'>sahibag, ahmedabad, gujarat, india</p>
                    </div>
                </div>
                <button className='btn btn-primary'>Edit</button>
            </div>
            
        </div>
    </div>
  )
}

export default Profile