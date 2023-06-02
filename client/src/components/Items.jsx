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
import { useStore } from "../Store";
import { useCart } from "../Store";

export default function Items() {
  const [items, setItems] = useState([])
  let params = useParams()
  const [itemCount, setItemCount] = useState(1);
  const addCart = useCart((e) => e.addCart)
  const cart = useCart((e) => e.cart)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    Axios.get('/api/menu_data').then((response) => {
      console.log(response)
      setItems(response.data)
    }).catch(err => alert(err))
  }

  // console.log(items)

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

  const handleCartAdd = async (name, price, image, qty) => {
    addCart({ fname: name, fprice: price, fimg: image, quantity: qty })
  }

  console.log(cart)

  return (
    <div className="item-section">
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container-fluid">
          <h4 className="text-center mb-5">
            <strong>Items List</strong>
          </h4>

          <div className="row">
            {
              items ?
                items.filter((data) => data.rid === params.id).map((filteredData) => {
                  // console.log(filteredData)
                  return (
                    <>
                      <div className="col-md-12 col-lg-3 mb-4 mb-lg-0 ">
                        <div className="card hover-shadow">
                          <img
                            src={filteredData.food_image}
                            className="card-img-top"
                            alt={filteredData.food_name}
                          />

                          <div className="hover-overlay roundad">
                            <div
                              className="mask"
                              style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                            ></div>
                          </div>

                          <div className="card-body">

                            <div className="d-flex justify-content-between mb-3">
                              <h5 className="mb-0">{filteredData.food_name}</h5>
                              <h5 className="text-dark mb-0">Rs. {filteredData.food_price}</h5>
                            </div>
                            <div>
                              Availability: <span>{filteredData.food_availability ? <p>Available</p> : <p>Unavailable</p>}</span>
                            </div>
                            <div>
                              {filteredData.food_availability ? <><MDBBtn onClick={handleSub} color="link" className="px-2"><MDBIcon fas icon="minus"></MDBIcon></MDBBtn><span>{itemCount}</span><MDBBtn onClick={handleAdd} color="link" className="px-2"><MDBIcon fas icon="plus" /></MDBBtn></> : <></>}
                            </div>
                            <div>
                              {filteredData.food_availability ? <MDBBtn onClick={() => handleCartAdd(filteredData.food_name, filteredData.food_price, filteredData.food_image, itemCount)}>Add to cart</MDBBtn>
                                : <></>}
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
      </section >
    </div >
  );
}
