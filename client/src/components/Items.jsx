import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
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
import { useRestaurantStore, useStore } from "../Store";
import { useCart } from "../Store";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Items() {
  const [items, setItems] = useState([])
  let params = useParams()
  const [itemCount, setItemCount] = useState(1);
  const addCart = useCart((e) => e.addCart)
  const cart = useCart((e) => e.cart)
  const updateCart = useCart((e) => e.updateItem)
  const user_lat = useStore(state => state.curr_lat)
  const user_long = useStore(state => state.curr_long)
  let apiKey = "438e9167cbe344389c24fa16ceb8e885"
  const [desc, setDesc] = useState('');
  const [km, setKm] = useState(0);
  const [time, setTime] = useState(0);
  const [location, setLocation] = useState('');


  useEffect(() => {
    getData()
    getLatlong(params.id)
  }, [])

  async function getData() {
    Axios.get('/api/menu_data').then((response) => {
      console.log(response)
      setItems(response.data)
    }).catch(err => alert(err))
  }

  const getLatlong = async (i) => {
    if ((i).length !== 0) {
      Axios.post('/api/res/data/conf', {
        i
      }).then((response) => {
        // console.log("response:", response.data.lat_long[0].lat)
        setDesc(response.data.description)
        setLocation(response.data.address)
        getDistance(response.data.lat_long[0].lat, response.data.lat_long[0].long)
      }).catch(err => alert(err))
    } else {
      alert("Resturant ID not found :/")
    }
  }


  const handleAdd = () => {
    setItemCount(itemCount + 1);
  }
  const handleSub = () => {
    if (itemCount !== 1) {
      setItemCount(itemCount - 1);
    } else {
      setItemCount(1)
    }
  }

  const handleCartAdd = async (rid, i_id, name, price, image, qty) => {
    let is_contain = cart.find((item) => item.restaurant_id === rid)
    if (cart.length === 0 ){
      addCart({ restaurant_id: rid, item_id: i_id,fname: name, fprice: price, fimg: image, quantity: qty })
    } else if (is_contain){
      const cartItem = cart.find((item) => item.fname === name);
        cartItem ?
          updateCart({ restaurant_id: rid, item_id: i_id, fname: name, fprice: price, fimg: image, quantity: qty })
          :
          addCart({ restaurant_id: rid, item_id: i_id, fname: name, fprice: price, fimg: image, quantity: qty,  })
    }else{
      alert("Your cart contains items from other restaurant.")
    }

        // const cartItem = cart.find((item) => item.fname === name);
        // cartItem ?
        //   updateCart({ restaurant_id: rid, fname: name, fprice: price, fimg: image, quantity: qty })
        //   :
        //   addCart({ restaurant_id: rid, fname: name, fprice: price, fimg: image, quantity: qty })
  
  }
  console.log(cart)

  const getDistance = async (lat2, long2) => {
    if (user_lat !== undefined && user_long !== undefined) {
      let longi2 = Math.abs(parseFloat(long2) - 360);
      if (longi2 > 180) {
        longi2 = 360 - longi2;
      }
      const body = { "mode": "motorcycle", "sources": [{ "location": [user_long, user_lat] }], "targets": [{ "location": [longi2, lat2] }] };
      fetch(`https://api.geoapify.com/v1/routematrix?apiKey=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(res => {
          setKm(res.sources_to_targets[0][0].distance / 1000)
          setTime(res.sources_to_targets[0][0].time / 60)
        });
    } else {
      alert("Please select your location")
    }
  }

  return (
    <>
      <div>
        <Nav />
      </div>
      <div>
        <section style={{ backgroundColor: "#eee" }}>
          <div className="container py-5">

            <div className="row justify-content-center mb-3">
              <div className="col-md-12 col-xl-10">
                <div className="mx-5 p-1">
                  <div className="d-flex justify-content-between">
                    <p className="fs-5 mb-1">{params.name}</p>
                    <i className="fa fa-star text-warning">4.5</i>
                  </div>
                  <div>
                    <p className="mb-1" style={{ fontSize: '12px' }}>{desc}</p>
                    <p style={{ fontSize: '12px' }}>{location}, {km.toFixed(2)}km</p>
                  </div>
                  <hr />
                  <div>
                    <i className="fa fa-stopwatch fs-4 pe-2"></i>
                    <span className="fs-5">{time.toFixed(2)} MINS AWAY</span>
                  </div>
                  {/* <div className="mb-4">
                    <input type="checkbox" />
                    <span className="text-success ps-2">
                      Veg Only
                    </span>

                  </div> */}
                </div>

                {
                  items ?
                    items.filter((data) => data.rid === params.id).map((filteredData) => {
                      return (
                        <>
                          <div className="card shadow-0 border rounded-3 mx-5 mb-1">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-3 col-lg-2 mb-lg-0">
                                  <div className="bg-image rounded">
                                    <img
                                      src={filteredData.food_image}
                                      className="w-100"
                                      alt={filteredData.food_name}
                                    />

                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-8 ">
                                  <h5>{filteredData.food_name}</h5>
                                  <div className="d-flex flex-row">
                                    <div className="text-warning mb-1 me-2">
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star-half"></i>
                                    </div>
                                    {filteredData.is_veg ? <span><img src="https://n3.sdlcdn.com/imgs/d/g/8/Veg_symbol_svg-f30b6.png" style={{ width: '30px' }} /></span> : <span><img src="https://clipground.com/images/non-veg-symbol-png-5.png" style={{ width: '25px' }} /></span>}
                                  </div>

                                  <p className=" mb-4 mb-md-0" style={{ fontSize: '10px' }}>
                                    This is description
                                  </p>
                                </div>
                                <div className="col-md-3 col-lg-2  border-sm-start-none border-start">
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <h5 className="mb-1 me-1">₹{filteredData.food_price}</h5>
                                  </div>
                                  {filteredData.food_availability ?
                                    <>
                                      <div className="d-flex justify-content-center my-1">
                                        <button className="btn btn-outline-danger px-1 btn-sm" onClick={handleSub}>
                                          <i className="fa fa-minus"></i>
                                        </button>
                                        <span className="px-2">{itemCount}</span>
                                        <button className="btn btn-outline-success px-1 btn-sm" onClick={handleAdd} >
                                          <i className="fa fa-plus"></i>
                                        </button>
                                      </div>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <button className="btn btn-primary py-2" onClick={() => handleCartAdd(params.id, filteredData._id, filteredData.food_name, filteredData.food_price, filteredData.food_image, itemCount)}>Add</button>
                                      </div>
                                    </>
                                    : <>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        Item Unavailable
                                      </div>
                                    </>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })
                    : <>
                      <p>No item found.</p>
                    </>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
