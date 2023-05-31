import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function Items() {
  const [items, setItems] = useState([])

  useEffect(() =>{
    getData()
  },[])

  async function getData(){
    Axios.get('http://localhost:9000/menu_data', {
          
        }).then((response)=> {
            console.log(response)
            setItems(response.data)
        }).catch(err => alert(err))
  }

  console.log(items)

  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <h4 className="text-center mb-5">
            <strong>Restaurant List</strong>
          </h4>
          <div className="row">
          { items ?
                  items.map((data, index) => (
                  <>
            <div className="col-md-12 col-lg-3 mb-4 mb-lg-0 ">
              <div className="card hover-shadow">
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
                      <p className="small">
                        <p className="text-muted">
                          name
                        </p>
                      </p>
                      <p className="small text-danger">
                        <s>$10</s>
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{data.food_name}</h5>
                      <h5 className="text-dark mb-0">{data.food_price}</h5>
                    </div>
                  </div>
              </div>
            </div>
            </>
          )):<>
          <p>No item found.</p>
          </>
        }
          </div>
        </div>
      </section>
    </div>
  );
}

export default Restaurants;
