import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";


import { useNavigate, useLocation } from 'react-router-dom';
import CartContext from "../Context/CartContext.js";

const Earrings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);
  const { setEarringProductData } = useContext(ProductContext);

  const [earrings, setEarrings] = useState([]);

  useEffect(() => {
    const fetchEarringData = async () => {
      try {
        const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/products/All-earrings");
        setEarringProductData(response.data.message.earrings)
        setEarrings(response.data.message.earrings);
      } catch (error) {
        console.error("Error fetching earring data", error);
      }
    };
    fetchEarringData();
  }, []);

  const GetInfo = (earring) => {
    setCartItems(earring);
    console.log("AddEarringCart", earring);
    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };

  const GetProductDetails = (earring) => {
    setProductItems(earring);
    console.log("ViewEarringDetails", earring);
    navigate(`${location.pathname = ''}/ItemDetails`);
  };

  console.log("Earring Data is ", earrings);

  return (
    <>
      <div className="ResComponent">
        {earrings.map((earring) => {
          return (
            <div className="Show-Rings-Box" key={earring._id}>
              <div className="Ring-Box R-Box1 Box-one">
                <div
                  className="Ring-Img-Box"
                  onClick={() => GetProductDetails(earring)}
                >
                  <div className="Compare-Img-Box">
                    <i className='bx bx-git-compare Compare-Arrow-Img'></i>
                  </div>
                  <div className="Add-Img-Box"></div>
                  <img
                    loading='lazy'
                    src={earring.ProductImages[0]}
                    className="Finger-Style"
                  />
                </div>
                <div className="Img-Info-Box">
                  <div className="Itm-Stock">
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          color: earring.ProductQty > 5 ? "black" : earring.ProductQty > 0 ? "red" : "gray",
                        }}
                        className="font-bold Title-Stock"
                      >
                        {earring.ProductQty > 5
                          ? "Available"
                          : earring.ProductQty > 0
                          ? `ONLY ${earring.ProductQty} LEFT IN STOCK`
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                  <h4 className="Card-Title">{earring.ProductName}</h4>
                  <div className="Card-Price">
                    <span className="Doller">₹</span>
                    <span className="Price-Rate">{earring.ProductPrice}</span>
                  </div>
                  <span className="Gender-Name">
                    {earring.ProductGender || "Women & Men"} <span className="Between-Line-Gender">|</span>
                  </span>
                  <span className="Type-Of-Ring">{earring.ProductCategory}</span>
                  <div className="Explore-Box" onClick={() => GetInfo(earring)}>
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

export default Earrings;
