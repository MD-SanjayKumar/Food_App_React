import Restaurants from "./Restaurants"
import Offers from "./Offers"
import Nav from "./Nav"
import Footer from "./Footer"

function Homepage(){
    return(
        <>
        <div>
            <Nav/>
        </div>
        <Offers/>
        <Restaurants/>
        <div>
            <Footer/>
        </div>
        </>
    )
}

export default Homepage