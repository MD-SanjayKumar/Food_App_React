import React, { useEffect, useState } from "react";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBInput,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import { useCart } from "../Store";
import { Link } from "react-router-dom";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";


export default function MyOrders() {
	const [myOrders, setMyOrders] = useState();
	const [num, setNum] = useState([]);
	const [dates, setDates] = useState([]);
	const [quantity, setQuantity] = useState([]);
	const [item, setItem] = useState([]);


	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		let user_id = read_cookie("user_id")
		if (user_id != "") {
			axios.post('/api/user/myorder', {
				user_id
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
				<Nav />
			</div>
			<div className="py-5">
				{
					// num ? num.map((val, i) => {
					// dates !== undefined ? dates[0]?.map((date, i) => {
					// 	return (
					<div>
						<div className='bg-light rounded mx-auto mb-2 w-50 py-2 px-4'>
							{
								item ? item?.map((e, j) => {

									return (
										<React.Fragment key={j}>
											<p>{dates[0][j]}</p>
											{console.log(item.length)}
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
			<div>
				<Footer />
			</div>
		</>
	);
}