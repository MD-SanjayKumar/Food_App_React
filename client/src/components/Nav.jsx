import { Link } from 'react-router-dom'
import '../assets/Nav.css'
import { useStore } from '../Store'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { useEffect, useState } from 'react';
import { useCart } from '../Store';

function Nav() {
    const setCred = useStore(state => state.setCredentials)
    const log = useStore(state => state.log)
    const setLog = useStore(state => state.setLog)
    const setPointer = useStore(state => state.setPointer)
    const lat = useStore(state => state.curr_lat)
    const long = useStore(state => state.curr_long)
    const setAddr = useStore(state => state.setCurrAddress)
    const addr = useStore(state => state.currentAddress)
    const cart = useCart((e) => e.cart)

    let myAPIKey = "438e9167cbe344389c24fa16ceb8e885"

    const handleLog = () => {
        setCred("", "")
        setLog(0)
        delete_cookie("email")
        delete_cookie("user_id")
    }

    useEffect(() => {
        // getLocation()
    }, [])

    const getLocation = async () => {
        if (navigator.geolocation) {
            console.log("called")
            navigator.geolocation.getCurrentPosition(
                // Success function
                showPosition,
                // Error function
                getError,
                // Options. See MDN for details.
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }
    const getError = async (e) => {
        console.log(e)
    }

    const showPosition = async (position) => {
        console.log("called show")
        setPointer(position.coords.latitude, position.coords.longitude)

        const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=${myAPIKey}`;

        await fetch(reverseGeocodingUrl).then(result => result.json())
            .then(featureCollection => {
                setAddr(featureCollection.features[0].properties.formatted);
            }
            ).catch((err) => {
                alert("Can't find current location")
            })
    }

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-sm dashboard_navbar">
                    <div className="container">
                        <Link to='/' className='p-3 text-decoration-none text-black'>
                            <span className='fs-3 me-1'><strong>myFood</strong></span>
                            <i className="fa-solid fa-utensils fs-4 primary-color"></i>
                        </Link>
                        <div className='eat_currentAddress_head ps-3'>
                            <span><Link onClick={getLocation}><i className="fa-solid fa-location-dot fs-6" /></Link></span>
                            <span>
                                {addr}
                            </span>
                        </div>
                        <div className="navbar-collapse" id="navbar-list-2">
                            <ul className="navbar-nav navMenu">
                                
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">
                                        <span className="cart_count">
                                            <svg className="cat_svg" viewBox="-1 0 37 32" height="20" width="20" fill="#686b78">
                                                <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                                            </svg>
                                            <span className="cart_count_value">{cart.length}</span>
                                        </span>
                                        <span>Cart</span>
                                    </Link>
                                </li>
                                { }
                                {(log === 0) && (read_cookie("user_id").length === 0) ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/user/login">
                                                <svg className="_1GTCc" viewBox="6 0 12 24" height="19" width="18" fill="#686b78">
                                                    <path d="M11.9923172,11.2463768 C8.81761115,11.2463768 6.24400341,8.72878961 6.24400341,5.62318841 C6.24400341,2.5175872 8.81761115,0 11.9923172,0 C15.1670232,0 17.740631,2.5175872 17.740631,5.62318841 C17.740631,8.72878961 15.1670232,11.2463768 11.9923172,11.2463768 Z M11.9923172,9.27536232 C14.0542397,9.27536232 15.7257581,7.64022836 15.7257581,5.62318841 C15.7257581,3.60614845 14.0542397,1.97101449 11.9923172,1.97101449 C9.93039471,1.97101449 8.25887628,3.60614845 8.25887628,5.62318841 C8.25887628,7.64022836 9.93039471,9.27536232 11.9923172,9.27536232 Z M24,24 L0,24 L1.21786143,19.7101449 L2.38352552,15.6939891 C2.85911209,14.0398226 4.59284263,12.7536232 6.3530098,12.7536232 L17.6316246,12.7536232 C19.3874139,12.7536232 21.1256928,14.0404157 21.6011089,15.6939891 L22.9903494,20.5259906 C23.0204168,20.63057 23.0450458,20.7352884 23.0641579,20.8398867 L24,24 Z M21.1127477,21.3339312 L21.0851024,21.2122487 C21.0772161,21.1630075 21.0658093,21.1120821 21.0507301,21.0596341 L19.6614896,16.2276325 C19.4305871,15.4245164 18.4851476,14.7246377 17.6316246,14.7246377 L6.3530098,14.7246377 C5.4959645,14.7246377 4.55444948,15.4231177 4.32314478,16.2276325 L2.75521062,21.6811594 L2.65068631,22.0289855 L21.3185825,22.0289855 L21.1127477,21.3339312 Z"></path>
                                                </svg>
                                                <span>Sign In</span>
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/myorders">
                                                <i className="fa fa-cart-shopping"></i>
                                                <span>My Orders</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/user/login" onClick={handleLog}>
                                                <svg className="_1GTCc" viewBox="6 0 12 24" height="19" width="18" fill="#686b78">
                                                    <path d="M11.9923172,11.2463768 C8.81761115,11.2463768 6.24400341,8.72878961 6.24400341,5.62318841 C6.24400341,2.5175872 8.81761115,0 11.9923172,0 C15.1670232,0 17.740631,2.5175872 17.740631,5.62318841 C17.740631,8.72878961 15.1670232,11.2463768 11.9923172,11.2463768 Z M11.9923172,9.27536232 C14.0542397,9.27536232 15.7257581,7.64022836 15.7257581,5.62318841 C15.7257581,3.60614845 14.0542397,1.97101449 11.9923172,1.97101449 C9.93039471,1.97101449 8.25887628,3.60614845 8.25887628,5.62318841 C8.25887628,7.64022836 9.93039471,9.27536232 11.9923172,9.27536232 Z M24,24 L0,24 L1.21786143,19.7101449 L2.38352552,15.6939891 C2.85911209,14.0398226 4.59284263,12.7536232 6.3530098,12.7536232 L17.6316246,12.7536232 C19.3874139,12.7536232 21.1256928,14.0404157 21.6011089,15.6939891 L22.9903494,20.5259906 C23.0204168,20.63057 23.0450458,20.7352884 23.0641579,20.8398867 L24,24 Z M21.1127477,21.3339312 L21.0851024,21.2122487 C21.0772161,21.1630075 21.0658093,21.1120821 21.0507301,21.0596341 L19.6614896,16.2276325 C19.4305871,15.4245164 18.4851476,14.7246377 17.6316246,14.7246377 L6.3530098,14.7246377 C5.4959645,14.7246377 4.55444948,15.4231177 4.32314478,16.2276325 L2.75521062,21.6811594 L2.65068631,22.0289855 L21.3185825,22.0289855 L21.1127477,21.3339312 Z"></path>
                                                </svg>
                                                <span>Logout</span>
                                            </Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Nav