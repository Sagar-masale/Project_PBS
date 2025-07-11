import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";
import { useNavigate, useLocation } from 'react-router-dom';
import CartContext from "../Context/CartContext.js";
import MetalContext from "../Context/MetalRateContext.js";

const Pendants = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);
  const { setPendantProductData } = useContext(ProductContext);
  const { metalRates, calculateFinalPrice } = useContext(MetalContext);
  const [pendants, setPendants] = useState([]);

  useEffect(() => {
    const fetchPendantData = async () => {
      try {
        const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/products/All-pendants");
        setPendantProductData(response.data.message.pendants)
        setPendants(response.data.message.pendants);
      } catch (error) {
        return;
      }
    };
    fetchPendantData();
  }, []);

  const GetInfo = (pendant) => {
    setCartItems(pendant);

    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };

  const GetProductDetails = (pendant) => {
    setProductItems(pendant)    
    navigate(`/ItemDetails/${pendant._id}`);
  };


  return (
    <>
      <div className="ResComponent">
        {pendants.map((pendant) => {
          return (
            <div className="Show-Rings-Box" key={pendant._id}>
              <div className="Ring-Box R-Box1 Box-one">
                <div
                  className="Ring-Img-Box"
                  onClick={() => GetProductDetails(pendant)}
                >
                  <div className="Compare-Img-Box">
                    <i className='bx bx-git-compare Compare-Arrow-Img'></i>
                  </div>
                  <div className="Add-Img-Box"></div>
                  <img
                    loading='lazy'
                    src={pendant.ProductImages[0]}
                    className="Finger-Style"
                  />
                </div>
                <div className="Img-Info-Box">
                  <div className="Itm-Stock">
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          color: pendant.ProductQty > 5 ? "black" : pendant.ProductQty > 0 ? "red" : "gray",
                        }}
                        className="font-bold Title-Stock"
                      >
                        {pendant.ProductQty > 5
                          ? "Available"
                          : pendant.ProductQty > 0
                          ? `ONLY ${pendant.ProductQty} LEFT IN STOCK`
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                  <h4 className="Card-Title">{pendant.ProductName}</h4>
                  <div className="Card-Price">
                    <span className="Doller">₹</span>
                    <span className="Price-Rate">{calculateFinalPrice(pendant)} /-</span>
                  </div>
                  <span className="Gender-Name">
                  {pendant.ProductGender || "Women & Men"} <span className="Between-Line-Gender">|</span>
                  </span>
                  <span className="Type-Of-Ring">{pendant.ProductCategory}</span>
                  <div className="Explore-Box" onClick={() => GetInfo(pendant)}>
                    <h3 className="Explore-Name">Add to Cart</h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Pendants;
