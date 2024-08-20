import React, { useState } from 'react';
import './FingerRings.css';

import Ringsdata from './RingData.jsx';
import CartBox from '../CartAdd/CartBox.jsx';



const FingerRings=()=>{
  const [cart, setCart]= useState('')
  const GetInfo=(curEle)=>{
    // console.log(curEle);
    setCart(curEle)
    document.querySelector('.CartBox').classList.toggle('CartBox-Show')
 
  }


  return (
    <>
    <CartBox
    Img={cart.img}
    Title={cart.title}
    Price={cart.price}
    Dec={cart.dec}
    ImgM1={cart.imgM1}
    ImgM2={cart.imgM2}
    ImgM3={cart.imgM3}
    
    />
<div className="ResComponent">
    {
      Ringsdata.map((curEle, index)=>{
        console.log(curEle.img);

        return(
          
          <div className="Show-Rings-Box">
          <div className="Ring-Box R-Box1 Box-one" onClick={()=>GetInfo(curEle)} >
              <div className="Ring-Img-Box"><div className="Compare-Img-Box">
                  <i className='bx bx-git-compare Compare-Arrow-Img'></i>
              </div>
              <div className="Add-Img-Box">
               </div><img src={curEle.img}className="Finger-Style" loading='lazy' key={index}/>
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

export default FingerRings;
