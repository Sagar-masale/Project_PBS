import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";

import './FingerRings.css';
import { useNavigate, useLocation  } from 'react-router-dom';
// import Ringsdata from './RingData.jsx';
import CartContext from "../Context/CartContext.js"



const FingerRings=()=>{
  const navigate = useNavigate();
  const location = useLocation();
  // CartContext
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);

  // ProductContext
  const { setRingProductData } = useContext(ProductContext);



  const [rings, setRings] = useState([]);

  useEffect(() => {
    const fetchRingData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/products/All-rings");
        setRingProductData(response.data.message.rings)
        setRings(response.data.message.rings)
      } catch (error) {
        console.error("error fetching ring data", error)
      }
    };
    fetchRingData();
  },[])

  const GetInfo=(ring)=>{
    setCartItems(ring)
    console.log("addRingCart"+ring);
    document.querySelector('.CartBox').classList.toggle('CartBox-Show')
  }
  
  const GetProductDetails = (ring) => {
    setProductItems(ring)
    console.log("addRingCart"+ring);
    navigate(`${location.pathname=''}/ItemDetails`);
    
  }

  console.log("RingData is ", rings);
  
  return (
    <>
   
<div className="ResComponent">
    {
      rings.map((ring)=>{
        

        return(
          
          <div className="Show-Rings-Box ">
          <div className="Ring-Box R-Box1 Box-one"  key={ring._id} >
              <div className="Ring-Img-Box"  onClick={() => GetProductDetails(ring)}><div className="Compare-Img-Box">
                  <i className='bx bx-git-compare Compare-Arrow-Img'></i>
              </div>
              <div className="Add-Img-Box">
               </div>
               <img loading='lazy' src={ring.ProductImages[0]}className="Finger-Style" />
          </div>
          <div className="Img-Info-Box">
              <div className="Itm-Stock">
                  {/* <span className="Title-Stock">{ring.stocks}</span> */}
                  <div className="flex justify-between items-center">
                  <span
                  style={{ color: ring.ProductQty > 5 ? "black" : ring.ProductQty > 0 ? "red" : "gray" }}
                  className="font-bold Title-Stock"
                >
                  {ring.ProductQty > 5
                    ? "Available"
                    : ring.ProductQty > 0
                    ? `ONLY ${ring.ProductQty} LEFT IN STOCK`
                    : "Not Available"}
                </span>
     
    </div>
              </div>
                  <h4 className="Card-Title">{ring.ProductName}</h4>
                  <div className="Card-Price">
                      <span className="Doller">₹</span>
                      <span className="Price-Rate">{ring.ProductPrice}</span>
                  </div>
                      <span className="Gender-Name"> {ring.ProductGender || "Women & Men"} <span className="Between-Line-Gender">|</span></span>
                      <span className="Type-Of-Ring">{ring.ProductCategory}</span>
                      <div className="Explore-Box" onClick={()=>GetInfo(ring)}>
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

export default FingerRings;