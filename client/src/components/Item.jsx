import React, { useState } from 'react'
import { useRestaurantStore, useStore } from "../Store";
import { useCart } from "../Store";

function Item(props) {
  const [itemCount, setItemCount] = useState(1);
  const addCart = useCart((e) => e.addCart)
  const cart = useCart((e) => e.cart)
  const updateCart = useCart((e) => e.updateItem)



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
    console.log(i_id)
    let is_contain = cart.find((item) => item.restaurant_id === rid)
    if (cart.length === 0) {
      addCart({ restaurant_id: rid, item_id: i_id, fname: name, fprice: price, fimg: image, quantity: qty })
    } else if (is_contain) {
      const cartItem = cart.find((item) => item.fname === name);
      cartItem ?
        updateCart({ restaurant_id: rid, item_id: i_id, fname: name, fprice: price, fimg: image, quantity: qty })
        :
        addCart({ restaurant_id: rid, item_id: i_id, fname: name, fprice: price, fimg: image, quantity: qty, })
    } else {
      alert("Your cart contains items from other restaurant.")
    }
  }

  return (
    <>
      <div className="card shadow-0 border rounded-3 mx-5 mb-1">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 col-lg-2 mb-lg-0">
              <div className="bg-image rounded">
                <img
                  src={props.filteredData.food_image}
                  className="w-100"
                  alt={props.filteredData.food_name}
                />

              </div>
            </div>
            <div className="col-md-6 col-lg-8 ">
              <h5>{props.filteredData.food_name}</h5>
              <div className="d-flex flex-row">
              <p className=" mb-4 mb-md-0 me-3">
               Category: {props.filteredData.food_category}
              </p>
                {/* <div className="text-warning mb-1 me-2">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half"></i>
                </div> */}
                {props.filteredData.is_veg ? <span><img src="https://n3.sdlcdn.com/imgs/d/g/8/Veg_symbol_svg-f30b6.png" style={{ width: '30px' }} /></span> : <span><img src="https://clipground.com/images/non-veg-symbol-png-5.png" style={{ width: '25px' }} /></span>}
              </div>

              <p className=" mb-4 mb-md-0" style={{ fontSize: '13px' }}>
                {props.filteredData.food_quantity}
              </p>
            </div>
            <div className="col-md-3 col-lg-2  border-sm-start-none border-start">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <h5 className="mb-1 me-1">₹{props.filteredData.food_price}</h5>
              </div>
              {props.filteredData.food_availability ?
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
                    <button className="btn btn-primary py-2" onClick={() => {
                      console.log(props.filteredData._id)
                      handleCartAdd(props.res_id, props.filteredData._id, props.filteredData.food_name, props.filteredData.food_price, props.filteredData.food_image, itemCount)
                    }
                    }>Add</button>
                  </div>
                </>
                : <>
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <p style={{fontSize: '15px'}}>Item Unavailable</p>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item