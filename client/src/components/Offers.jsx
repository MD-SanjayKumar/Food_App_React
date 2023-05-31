import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

function Offers() {
  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row flex-nowrap hide-scroll">
            <div className="col-lg-3 col-md-12 mb-4">
              <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                <Link to="">
                  <img
                    src="https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"
                    className="w-100"
                  />
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >

                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    ></div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                <img
                  src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  className="w-100"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >

                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                <img
                  src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  className="w-100"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >

                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                <img
                  src="https://images.unsplash.com/photo-1536304575888-ccb70eeef59b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  className="w-100"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >

                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                <img
                  src="https://images.unsplash.com/photo-1536304575888-ccb70eeef59b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  className="w-100"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >

                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* <div className="row">
      <div className="col-lg-4 col-md-12 mb-4">
        <div className="bg-image hover-zoom ripple shadow-1-strong rounded ripple-surface">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
            className="w-100" />
          <a href="#!">
            <div className="mask" style="background-color: rgba(0, 0, 0, 0.3);">
              <div className="d-flex justify-content-start align-items-start h-100">
                <h5><span className="badge bg-light pt-2 ms-3 mt-3 text-dark">$83</span></h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div className="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
            </div>
          </a>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp"
            className="w-100" />
          <a href="#!">
            <div className="mask" style="background-color: rgba(0, 0, 0, 0.3);">
              <div className="d-flex justify-content-start align-items-start h-100">
                <h5><span className="badge bg-light pt-2 ms-3 mt-3 text-dark">$106</span></h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div className="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
            </div>
          </a>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(6).webp"
            className="w-100" />
          <a href="#!">
            <div className="mask" style="background-color: rgba(0, 0, 0, 0.3);">
              <div className="d-flex justify-content-start align-items-start h-100">
                <h5><span className="badge bg-light pt-2 ms-3 mt-3 text-dark">$58</span></h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div className="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
            </div>
          </a>
        </div>
      </div>
    </div> */}
        </div>
      </section>
    </div>
  );
}

export default Offers;