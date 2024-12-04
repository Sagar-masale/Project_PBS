import React, { useContext } from 'react';

import '../Ringpage/FingerRings.css';

import EarringData from './EarringData.jsx';
import CartContext from "../Context/CartContext.js"



const Earrings=()=>{
  
  // CartContext
  const { setCartItems } = useContext(CartContext);

  const GetInfo=(curEle)=>{
    // console.log(curEle);
    setCartItems(curEle)
    document.querySelector('.CartBox').classList.toggle('CartBox-Show')
 
  }
  return (
    <>

<div className="ResComponent">
    {
      EarringData.map((curEle)=>{
        // console.log(curEle);

        return(
          
          <div className="Show-Rings-Box">
          <div className="Ring-Box R-Box1 Box-one" onClick={()=>GetInfo(curEle)} key={curEle.id} >
              <div className="Ring-Img-Box"><div className="Compare-Img-Box">
                  <i className='bx bx-git-compare Compare-Arrow-Img'></i>
              </div>
              <div className="Add-Img-Box">
               </div><img src={curEle.img}className="Finger-Style"/>
          </div>
          <div className="Img-Info-Box">
              <div className="Itm-Stock">
                  <span className="Title-Stock">{curEle.stocks}</span>
              </div>
                  <h4 className="Card-Title">{curEle.title}</h4>
                  <div className="Card-Price">
                      <span className="Doller">₹</span>
                      <span className="Price-Rate">{curEle.price}</span>
                  </div>
                      <span className="Gender-Name">Women <span className="Between-Line-Gender">|</span></span>
                      <span className="Type-Of-Ring">Finger Ring</span>
                      <div className="Explore-Box">
                          <h3 className="Explore-Name">Explore Now</h3>
                          </div>
                      </div>
           </div>
           </div>
        )
     
  
      })
    }
    </div>
    </>
  );
}

export default Earrings;
