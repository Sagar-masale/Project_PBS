import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";
import { useNavigate, useLocation } from 'react-router-dom';
import CartContext from "../Context/CartContext.js";

const Bangles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);
  const { setBangleProductData } = useContext(ProductContext);

  const [bangles, setBangles] = useState([]);

  useEffect(() => {
    const fetchBanglesData = async () => {
      try {
        const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/products/All-bangles");
        setBangleProductData(response.data.message.bangles);
        setBangles(response.data.message.bangles);
      } catch (error) {
        console.error("Error fetching bangles data", error);
      }
    };
    fetchBanglesData();
  }, []);

  const GetInfo = (bangle) => {
    setCartItems(bangle);
    console.log("AddBangleCart", bangle);
    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };

  const GetProductDetails = (bangle) => {
    setProductItems(bangle);
    console.log("ViewBangleDetails", bangle);
    navigate(`${location.pathname = ''}/ItemDetails`);
  };

  console.log("Bangles Data is ", bangles);

  return (
    <>
      <div className="ResComponent">
        {bangles.map((bangle) => {
          return (
            <div className="Show-Rings-Box" key={bangle._id}>
              <div className="Ring-Box R-Box1 Box-one">
                <div
                  className="Ring-Img-Box"
                  onClick={() => GetProductDetails(bangle)}
                >
                  <div className="Compare-Img-Box">
                    <i className='bx bx-git-compare Compare-Arrow-Img'></i>
                  </div>
                  <div className="Add-Img-Box"></div>
                  <img
                    loading='lazy'
                    src={bangle.ProductImages[0]}
                    className="Finger-Style"
                  />
                </div>
                <div className="Img-Info-Box">
                  <div className="Itm-Stock">
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          color: bangle.ProductQty > 5 ? "black" : bangle.ProductQty > 0 ? "red" : "gray",
                        }}
                        className="font-bold Title-Stock"
                      >
                        {bangle.ProductQty > 5
                          ? "Available"
                          : bangle.ProductQty > 0
                          ? `ONLY ${bangle.ProductQty} LEFT IN STOCK`
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                  <h4 className="Card-Title">{bangle.ProductName}</h4>
                  <div className="Card-Price">
                    <span className="Doller">₹</span>
                    <span className="Price-Rate">{bangle.ProductPrice}</span>
                  </div>
                  <span className="Gender-Name">
                  {bangle.ProductGender || "Women & Men"} <span className="Between-Line-Gender">|</span>
                  </span>
                  <span className="Type-Of-Ring">{bangle.ProductCategory}</span>
                  <div className="Explore-Box" onClick={() => GetInfo(bangle)}>
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

export default Bangles;
