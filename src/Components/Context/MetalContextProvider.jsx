import React, {useState ,useEffect, useContext } from "react";
import MetalContext from "./MetalRateContext";
import axios from "axios";


 const MetalRateProvider = ({ children }) => {
  const [metalRates, setMetalRates] = useState({ gold: 0, silver: 0 });
  const [couponCode , setCouponCode] = useState(null);

useEffect(() => {
  const fetchRates = async () => {
    try {
      const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/metal_prise/metal-rate");
      setMetalRates(response.data);
    } catch (err) {
      console.error("Error fetching metal rates", err);
    }
  };

  // Initial fetch
  fetchRates();

  // Poll every 60 seconds
  const interval = setInterval(fetchRates, 3000);

  return () => clearInterval(interval);

}, []);

  const refreshMetalRates = async () => {
  try {
    const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/metal_prise/metal-rate");
    setMetalRates(response.data);
  } catch (err) {
    console.error("Failed to refresh rates", err);
  }
};
  // shared calculation function
  const ProductCouponCode = (code) => {
    // console.log("Saved Delivery Code:", code);
    setCouponCode(code);
    
  };
  const clearCouponCode = () =>{
    setCouponCode(null);
  }

  const calculateFinalPrice = (product) => {
    const { gold, silver } = metalRates;
    const rate = product?.metalType === "silver" ? silver : gold;
   const weight = product?.weightInGrams;
const metalRate = rate || 0; // metal rate per gram
const makingChargePerGram = product?.makingCharges || 0;

const totalPrice = Math.round((metalRate + makingChargePerGram) * weight);
// console.log("in metal ",totalPrice);

return totalPrice;

  };

  return (
    <MetalContext.Provider value={{ metalRates, calculateFinalPrice, refreshMetalRates, ProductCouponCode,couponCode,clearCouponCode
     }}>
      {children}
    </MetalContext.Provider>
  );
};

export default MetalRateProvider;