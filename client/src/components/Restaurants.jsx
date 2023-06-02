import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useStore } from "../Store";

function Restaurants() {
  const [restaurant, setRestaurant] = useState([])
  const setRid = useStore(state => state.setRid)
  const lat = useStore(state => state.curr_lat)
  const long = useStore(state => state.curr_long)
  let apiKey = "438e9167cbe344389c24fa16ceb8e885"

  useEffect(() =>{
    getData()
  },[])

  async function getData(){
    Axios.get('/api/restaurant_data', {
          
        }).then((response)=> {
            console.log(response)
            setRestaurant(response.data)
        }).catch(err => alert(err))
  }

  const getDistance = async(lat2, long2) => {
    if(lat !== undefined && long !== undefined){
    await fetch(`https://api.geoapify.com/v1/routing?waypoints=${lat},${long}|${lat2},${long2}&mode=motorcycle&apiKey=${apiKey}`)
                  .then(response => response.json())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error))
    }
  }

  console.log(restaurant)


  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <h4 className="text-center mb-5">
            <strong>Restaurant List</strong>
          </h4>
          <div className="row">
          { restaurant ?
                  restaurant.map((data, index) =>
                  (
                  <>
            <div className="col-md-12 col-lg-3 mb-4 mb-lg-0 ">
              <div className="card hover-shadow">
                <Link to={`/restaurant/${data._id}/${data.name}/menu`}>
                  <img
                    src={data.image_url}
                    className="card-img-top"
                    alt="Food"
                  />

                  <div className="hover-overlay roundad">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    ></div>
                  </div>

                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      {}
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{data.name}</h5>
                      {/* <h5 className="text-dark mb-0">$8</h5> */}
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <p className="text-muted mb-0">
                        Available: <span className="fw-bold">6</span>
                      </p>
                      <div className="ms-auto text-warning">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            </>
          )):<>
          <p>No restaurant found.</p>
          </>
        }
          </div>
        </div>
      </section>
    </div>
  );
}

export default Restaurants;
