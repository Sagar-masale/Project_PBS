import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";
import { useNavigate, useLocation } from 'react-router-dom';
import CartContext from "../Context/CartContext.js";
import MetalContext from "../Context/MetalRateContext.js";

const MangalSutra = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);
  const { setMangalSutraProductData } = useContext(ProductContext);
  const { metalRates, calculateFinalPrice } = useContext(MetalContext);
  const [mangalSutras, setMangalSutras] = useState([]);

  useEffect(() => {
    const fetchMangalSutraData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/products/All-mangalsutra");
        setMangalSutraProductData(response.data.message.mangalsutras)
        setMangalSutras(response.data.message.mangalsutras);
      } catch (error) {
        return;
      }
    };
    fetchMangalSutraData();
  }, []);

  const GetInfo = (mangalSutra) => {
    setCartItems(mangalSutra);
 
    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };

  const GetProductDetails = (mangalSutra) => {
    setProductItems(mangalSutra)    
    navigate(`/ItemDetails/${mangalSutra._id}`);
  };



  return (
    <>
      <div className="ResComponent">
        {mangalSutras.map((mangalSutra) => {
          return (
            <div className="Show-Rings-Box" key={mangalSutra._id}>
              <div className="Ring-Box R-Box1 Box-one">
                <div
                  className="Ring-Img-Box"
                  onClick={() => GetProductDetails(mangalSutra)}
                >
                  <div className="Compare-Img-Box">
                    <i className='bx bx-git-compare Compare-Arrow-Img'></i>
                  </div>
                  <div className="Add-Img-Box"></div>
                  <img
                    loading='lazy'
                    src={mangalSutra.ProductImages[0]}
                    className="Finger-Style"
                  />
                </div>
                <div className="Img-Info-Box">
                  <div className="Itm-Stock">
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          color: mangalSutra.ProductQty > 5 ? "black" : mangalSutra.ProductQty > 0 ? "red" : "gray",
                        }}
                        className="font-bold Title-Stock"
                      >
                        {mangalSutra.ProductQty > 5
                          ? "Available"
                          : mangalSutra.ProductQty > 0
                          ? `ONLY ${mangalSutra.ProductQty} LEFT IN STOCK`
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                  <h4 className="Card-Title">{mangalSutra.ProductName}</h4>
                  <div className="Card-Price">
                    <span className="Doller">₹</span>
                    <span className="Price-Rate">{calculateFinalPrice(mangalSutra)} /-</span>
                  </div>
                  <span className="Gender-Name">
                  {mangalSutra.ProductGender || "Women & Men"} <span className="Between-Line-Gender">|</span>
                  </span>
                  <span className="Type-Of-Ring">{mangalSutra.ProductCategory}</span>
                  <div className="Explore-Box" onClick={() => GetInfo(mangalSutra)}>
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

export default MangalSutra;
