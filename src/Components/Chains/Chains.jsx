import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductContext from "../Context/ProductContext.js";
import { useNavigate, useLocation } from 'react-router-dom';
import CartContext from "../Context/CartContext.js";

const Chains = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartItems } = useContext(CartContext);
  const { setProductItems } = useContext(CartContext);
  const { setChainProductData } = useContext(ProductContext);

  const [chains, setChains] = useState([]);

  useEffect(() => {
    const fetchChainsData = async () => {
      try {
        const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/products/All-chains");
        setChainProductData(response.data.message.chains);
        setChains(response.data.message.chains);
      } catch (error) {
        console.error("Error fetching chains data", error);
      }
    };
    fetchChainsData();
  }, []);

  const GetInfo = (chain) => {
    setCartItems(chain);
    console.log("AddChainCart", chain);
    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };

  const GetProductDetails = (chain) => {
    setProductItems(chain);
    console.log("ViewChainDetails", chain);
    navigate(`${location.pathname = ''}/ItemDetails`);
  };

  console.log("Chains Data is ", chains);

  return (
    <>
      <div className="ResComponent">
        {chains.map((chain) => {
          return (
            <div className="Show-Rings-Box" key={chain._id}>
              <div className="Ring-Box R-Box1 Box-one">
                <div
                  className="Ring-Img-Box"
                  onClick={() => GetProductDetails(chain)}
                >
                  <div className="Compare-Img-Box">
                    <i className='bx bx-git-compare Compare-Arrow-Img'></i>
                  </div>
                  <div className="Add-Img-Box"></div>
                  <img
                    loading='lazy'
                    src={chain.ProductImages[0]}
                    className="Finger-Style"
                  />
                </div>
                <div className="Img-Info-Box">
                  <div className="Itm-Stock">
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          color: chain.ProductQty > 5 ? "black" : chain.ProductQty > 0 ? "red" : "gray",
                        }}
                        className="font-bold Title-Stock"
                      >
                        {chain.ProductQty > 5
                          ? "Available"
                          : chain.ProductQty > 0
                          ? `ONLY ${chain.ProductQty} LEFT IN STOCK`
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                  <h4 className="Card-Title">{chain.ProductName}</h4>
                  <div className="Card-Price">
                    <span className="Doller">₹</span>
                    <span className="Price-Rate">{chain.ProductPrice}</span>
                  </div>
                  <span className="Gender-Name">
                  {chain.ProductGender || "Women & Men"} <span className="Between-Line-Gender">|</span>
                  </span>
                  <span className="Type-Of-Ring">{chain.ProductCategory}</span>
                  <div className="Explore-Box" onClick={() => GetInfo(chain)}>
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

export default Chains;
