import React from 'react';
import ReactLoading from 'react-loading';
 
const BubbleLoadingAnimation = () => (
    <div className="loading-animation w-100 h-100 d-flex justify-content-center align-items-center flex-column" style={{backgroundColor:'rgba(255,255,255, 0.5)', position:'absolute',zIndex:'1'}}>
      <ReactLoading type="spinningBubbles" color="#535bf2" height={50} width={50} />
      {/* <p>Loading...</p> */}
    </div>
);
export default BubbleLoadingAnimation;