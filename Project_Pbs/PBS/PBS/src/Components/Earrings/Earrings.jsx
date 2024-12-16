import React, { useContext } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import '../Ringpage/FingerRings.css';

import EarringData from './EarringData.jsx';
import CartContext from "../Context/CartContext.js"



const Earrings=()=>{
  
  // CartContext
  const navigate = useNavigate();
  const location = useLocation();
  // CartContext
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);

  const GetInfo=(curEle)=>{
    // console.log(curEle);
    setCartItems(curEle)
    document.querySelector('.CartBox').classList.toggle('CartBox-Show')
 
  }


  const GetProductDetails = (curEle) => {
    setProductItems(curEle)
    navigate(`${location.pathname=''}/ItemDetails`);
    
  }
  return (
    <>

<div className="ResComponent">
    {
      EarringData.map((curEle)=>{
        // console.log(curEle);

        return(
          
          <div className="Show-Rings-Box">
          <div className="Ring-Box R-Box1 Box-one"  key={curEle.id} >
              <div className="Ring-Img-Box" onClick={() => GetProductDetails(curEle)}><div className="Compare-Img-Box">
                  <i className='bx bx-git-compare Compare-Arrow-Img'></i>
              </div>
              <div className="Add-Img-Box">
               </div><img src={curEle.img}className="Finger-Style"/>
          </div>
          <div className="Img-Info-Box">
              <div className="Itm-Stock">
              <div className="flex justify-between items-center">
                  <span
                  style={{ color: curEle.stocksQty > 5 ? "black" : curEle.stocksQty > 0 ? "red" : "gray" }}
                  className="font-bold Title-Stock"
                >
                  {curEle.stocksQty > 5
                    ? "Available"
                    : curEle.stocksQty > 0
                    ? `ONLY ${curEle.stocksQty} LEFT IN STOCK`
                    : "Not Available"}
                </span>
     
    </div>
              </div>
                  <h4 className="Card-Title">{curEle.title}</h4>
                  <div className="Card-Price">
                      <span className="Doller">₹</span>
                      <span className="Price-Rate">{curEle.price}</span>
                  </div>
                      <span className="Gender-Name">Women <span className="Between-Line-Gender">|</span></span>
                      <span className="Type-Of-Ring">Finger Ring</span>
                      <div className="Explore-Box" onClick={()=>GetInfo(curEle)}>
                          <h3 className="Explore-Name">Add to Cart</h3>
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
