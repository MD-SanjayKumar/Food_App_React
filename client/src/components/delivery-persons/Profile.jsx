import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

function Profile() {
    const [details, setDetails] = useState();
    const id = read_cookie("delivery_person_id");
    
    useEffect(() => {
        getData()
    }, [])
    
    async function getData() {
        if (id != "") {
            axios.post('/api/delivery/profile', {
                id
            }).then((response) => {
                console.log("----",response.data)
                setDetails(response.data)
            }).catch(err => {
                alert(err)
                console.log(err)
            })
        } else {
            alert("Unable to fetch.")
        }
    }

  return (
    <div className='vh-100 hide-scroll'>
        <Navbar />
        <div className='h-100 d-flex justify-content-center align-items-center'>
            {details? details.map((e)=>{
                return(

             
            <div className='bg-light d-flex flex-column align-items-center justify-content-center border rounded px-5' style={{width:'20em', height:'25em'}}>
                <div className='mb-1' style={{width: '80px', height: '80px'}}>
                    <img src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1686042919~exp=1686043519~hmac=48ac51d5ea029baec65e1e002cca68fe0b8d46b462986848e687df60b2dcdf40' alt="undraw-Male-avatar-g98d" className='d-block h-100 rounded-circle'></img>
                </div>
                <p>{e.name}</p>
                <div className='d-flex pb-4' style={{fontSize:'14px'}}>
                    <div style={{fontWeight:'bold'}}>
                        <p className='mb-1'>Email:&nbsp;</p>
                        <p className='mb-1'>Contect:&nbsp;</p>
                        <p className='mb-1'>Address:&nbsp;</p>
                    </div>
                    <div>
                        <p className='mb-1'>{e.email}</p>
                        <p className='mb-1'>+91 <span>{e.phone}</span></p>
                        <p className='mb-1'>{e.address}</p>
                    </div>
                </div>
                {/* <button className='btn btn-primary'>Edit</button> */}
            </div>
               )
            }):<>No user found</> }
        </div>
    </div>
  )
}

export default Profile