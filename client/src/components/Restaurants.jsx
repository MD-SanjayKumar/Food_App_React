import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useStore } from "../Store";

function Restaurants() {
  const [restaurant, setRestaurant] = useState([])
  const setRid = useStore(state => state.setRid)
  let apiKey = "438e9167cbe344389c24fa16ceb8e885"
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    Axios({
      url: '/api/restaurant_data',
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data)
        setRestaurant(response.data)
      })
      .catch(err => {
        console.log(err);
        alert(err)
      })
  }

  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container pb-5">
          <h3 className="text-center mb-5 ggl-font">
            <strong>Restaurant List</strong>
          </h3>
          <div className="row">
            {restaurant ?
              restaurant.map((data) =>
              (
                <>
                  <div className="col-md-12 col-lg-3 mb-4 mb-lg-0 ">
                    <div className="card hover-shadow mb-3">
                      <Link to={`/restaurant/${data._id}/${data.name}/menu`}>
                        <img
                          src={data.image_url}
                          className="card-img-top"
                          style={{ height: "200px", width: "215px" }}
                          alt={data.name}
                        />

                        <div className="hover-overlay roundad">
                          <div
                            className="mask"
                            style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                          ></div>
                        </div>

                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            { }
                          </div>

                          <div className="d-flex justify-content-between mb-3 text-dark">
                            <h5 className="mb-0">{data.name}</h5>
                            {/* <h5 className="text-dark mb-0">$8</h5> */}
                          </div>

                          <div className="d-flex justify-content-between mb-2">
                            <p className="text-muted mb-0">
                              {data.description} <span className="fw-bold">{}</span>
                            </p>
                            {/* <div className="ms-auto text-warning">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div> */}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )) : <>
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
