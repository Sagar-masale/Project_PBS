import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";
import MetalContext from "../Context/MetalRateContext.js";
import './FingerRings.css';
import { useNavigate, useLocation  } from 'react-router-dom';
// import Ringsdata from './RingData.jsx';
import CartContext from "../Context/CartContext.js"



const FingerRings=()=>{
  const navigate = useNavigate();
  // CartContext
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);

  // ProductContext
  const { setRingProductData } = useContext(ProductContext);
  const [rings, setRings] = useState([]);

  const { metalRates, calculateFinalPrice } = useContext(MetalContext);


  useEffect(() => {
    const fetchRingData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/products/All-rings");
        setRingProductData(response.data.message.rings)
        setRings(response.data.message.rings)
      } catch (error) {
        return;
      }
    };
    fetchRingData();
  },[])

  const GetInfo=(ring)=>{
    setCartItems(ring)
    document.querySelector('.CartBox').classList.toggle('CartBox-Show')
  }
  
  const GetProductDetails = (ring) => {
    setProductItems(ring)    
    navigate(`/ItemDetails/${ring._id}`);
  }


  return (
    <>
   
<div className="ResComponent">
    {
      rings.map((ring)=>{

        return(
          
          <div className="Show-Rings-Box ">
          <div className="Ring-Box R-Box1 Box-one"  key={ring._id} >
              <div className="Ring-Img-Box"  onClick={() => GetProductDetails(ring)}>

              
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
                  {/* <p className="Product-Price">{ring.ProductDescription}</p> */}
                  <div className="Card-Price">
                      <span className="Doller">₹</span>
                      <span className="Price-Rate">{calculateFinalPrice(ring)}</span>

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