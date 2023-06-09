import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

function Orders_Del() {
    const id = read_cookie("restaurant_id");

    const [myOrders, setMyOrders] = useState();
    const [num, setNum] = useState([]);
	const [dates, setDates] = useState([]);
	const [quantity, setQuantity] = useState([]);
	const [item, setItem] = useState([]);
    const [status, setStatus] = useState([]);
    const [userid, setUserid] = useState([]);

    useEffect(() => {
        getData()
    }, [])
    
    async function getData() {
        if (id != "") {
            axios.post('/api/restaurant/order/list', {
                id
            }).then((response) => {
				// console.log("resss", response.data)
				setMyOrders(response.data)
				if (response.data != null) {
					if (Object.keys(response.data).length > 0 && response.data["item_data"] != undefined) {
						console.log(response.data)
						setItem(response.data["item_data"])
						// console.log(item)
					}
				}

				if (response.data != null) {
					if (Object.keys(response.data).length > 0 && response.data["qty"] != undefined) {
						setQuantity(response.data["qty"][0])
						// console.log(quantity)
					}
				}

				if (response.data != null) {
					if (Object.keys(response.data).length > 0 && response.data["date"] != undefined) {
						setDates(response.data["date"])
						// console.log(dates)
					}
				}

				if (response.data != null) {
					if (Object.keys(response.data).length > 0 && response.data["item"] != undefined) {
						setNum(response.data["item"])
						// console.log(num)
					}
				}

                if (response.data != null) {
					if (Object.keys(response.data).length > 0 && response.data["status"] != undefined) {
						setStatus(response.data["status"])
						// console.log(num)
					}
				}

                if (response.data != null) {
					if (Object.keys(response.data).length > 0 && response.data["user"] != undefined) {
						setUserid(response.data["user"])
						// console.log(num)
					}
				}
			}).catch(err => {
				alert(err)
				console.log(err)
			})
		} else {
			alert("Please login to see you order history.")
		}
	}


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="py-5">
            {
					// num ? num.map((val, i) => {
					// dates !== undefined ? dates[0]?.map((date, i) => {
					// 	return (
					<div>
						<div className='bg-light rounded mx-auto mb-2 w-75 py-2 px-4'>
							{
								item ? item?.map((e, j) => {

									return (
										<React.Fragment key={j}>
											<p>{dates[0][j]}</p>
                                            <p>{userid[0][j]}</p>
											{/* {console.log(userid)} */}
											{quantity ? quantity[j].map((q,k) => {
												return (
													<React.Fragment key={k}>
														<hr />
														<div className='d-flex'>
															<div className='me-4'>
																<img src={e[k].food_image} width={100} />
															</div>
															<div className='d-flex flex-column w-100'>
																<p><strong>{e[k].fname}</strong></p>
																<div className='d-flex justify-content-between'>
																	<div className='d-flex'>
																		<p className='me-2'>Price: <span className='text-secondary'>₹ {e[k].food_price}</span></p>
																		<p>Quantity: <span className='text-secondary'>{q}</span></p>
																	</div>
                                                                    <div className=''>Status: <span className='text-secondary'>{status[0][j]}</span></div>
																	<div className=''>Total: <span className='text-secondary'>₹ {e[k].food_price * q}</span></div>
																</div>
															</div>
														</div>
													</React.Fragment>
												)
											}) :
												<>
												</>}
										</React.Fragment>
									)
									// }):<></>

								}) :
									<div>
										<div className='d-flex justify-content-center align-items-center vh-100'>
											<div className='d-flex flex-column justify-content-center align-items-center'>
												<div className=''>
													<img src="https://i.ibb.co/r5pH0RP/undraw-No-data-re-kwbl.png" alt="isometric-plate" width={100} />
												</div>
												<p className='fs-5 mt-4 '>You have not ordered anything yet.</p>
												<Link to="/"><button className='btn btn-primary'>Continue shopping</button></Link>
											</div>
										</div>
									</div>
							}
						</div >
					</div>
					// 	)
					// })

				}

            </div>
        </>
    );
}

export default Orders_Del