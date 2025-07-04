import React, {useState ,useEffect, useContext } from "react";
import MetalContext from "./MetalRateContext";
import axios from "axios";


 const MetalRateProvider = ({ children }) => {
  const [metalRates, setMetalRates] = useState({ gold: 0, silver: 0 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/metal_prise/metal-rate");
        setMetalRates(response.data);
    
        
      } catch (err) {
        console.error("Error fetching metal rates", err);
      }
    };

    fetchRates();
  }, []);

  // shared calculation function
  const calculateFinalPrice = (product) => {
    const { gold, silver } = metalRates;
    const rate = product?.metalType === "silver" ? silver : gold;
   const weight = product?.weightInGrams;
const metalRate = rate || 0; // metal rate per gram
const makingChargePerGram = product?.makingCharges || 0;

const totalPrice = Math.round((metalRate + makingChargePerGram) * weight);
console.log("in metal ",totalPrice);

return totalPrice;

  };

  return (
    <MetalContext.Provider value={{ metalRates, calculateFinalPrice }}>
      {children}
    </MetalContext.Provider>
  );
};

export default MetalRateProvider;