import React, { useState } from "react";
import ProductContext from "./ProductContext.js";

const ProductContextProvider = ({ children }) => {
  const [ringProductData, setRingProductData] = useState([]);
  const [earringProductData, setEarringProductData] = useState([]);
  const [pendantProductData, setPendantProductData] = useState([]);
  const [chainProductData, setChainProductData] = useState([]);
  const [bangleProductData, setBangleProductData] = useState([]);
  const [mangalSutraProductData, setMangalSutraProductData] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        ringProductData,
        setRingProductData,
        earringProductData,
        setEarringProductData,
        pendantProductData,
        setPendantProductData,
        chainProductData,
        setChainProductData,
        bangleProductData,
        setBangleProductData,
        mangalSutraProductData,
        setMangalSutraProductData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
