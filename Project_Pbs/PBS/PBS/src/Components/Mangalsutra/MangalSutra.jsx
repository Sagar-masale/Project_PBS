import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";
import { useNavigate, useLocation } from 'react-router-dom';
import CartContext from "../Context/CartContext.js";

const MangalSutra = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);
  const { setMangalSutraProductData } = useContext(ProductContext);

  const [mangalSutras, setMangalSutras] = useState([]);

  useEffect(() => {
    const fetchMangalSutraData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/products/All-mangalsutra");
        setMangalSutraProductData(response.data.message.mangalsutras)
        setMangalSutras(response.data.message.mangalsutras);
      } catch (error) {
        console.error("Error fetching MangalSutra data", error);
      }
    };
    fetchMangalSutraData();
  }, []);

  const GetInfo = (mangalSutra) => {
    setCartItems(mangalSutra);
    console.log("AddMangalSutraCart", mangalSutra);
    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };

  const GetProductDetails = (mangalSutra) => {
    setProductItems(mangalSutra);
    console.log("ViewMangalSutraDetails", mangalSutra);
    navigate(`${location.pathname = ''}/ItemDetails`);
  };

  console.log("MangalSutra Data is ", mangalSutras);

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
                    <span className="Price-Rate">{mangalSutra.ProductPrice}</span>
                  </div>
                  <span className="Gender-Name">
                    Women <span className="Between-Line-Gender">|</span>
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
