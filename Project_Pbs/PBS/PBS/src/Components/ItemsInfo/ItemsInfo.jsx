import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';

function ItemsInfo({ title = "..." }) {



  const { 
    ringProductData, 
    earringProductData, 
    pendantProductData, 
    chainProductData, 
    bangleProductData, 
    mangalSutraProductData 
  } = useContext(ProductContext);



    const designCounts = {
      Rings: ringProductData.length,
      Earrings: earringProductData.length,
      Pendants: pendantProductData.length,
      Chains: chainProductData.length,
      Bangles: bangleProductData.length,
      Mangalsutra: mangalSutraProductData.length,
    };
    
  
  const totalDesigns = designCounts[title] || "Unknown";

  return (
    <>
      <div className="Go-To-Container">
        <Link to="/" className="Go-Home-Page-Logo">Home</Link>
        <span className="Between-Line">|</span>
        <a href="#Ring-Page" className="Go-Ring-Page-Logo">{title}</a>
      </div>
      <div className="Ring-Type-Box">
        <h1 className="Ring-Name">{title}</h1>
        <h5 className="Between-Line-Type-Box">|</h5>
        <h4 className="Count-Designs">{totalDesigns} DESIGNS</h4>
      </div>
      <div className="Compare-Type-Box">
        <div className="Compare-Box">
          <i className='bx bx-git-compare Compare-Arrow'></i>
          <span className="Compare-Title">COMPARE</span>
        </div>
        <div className="BEST-SELLER-BOX">
          <span className="Seller-Title">SORT BY : BEST SELLERS</span>
          <i className='bx bx-chevron-down SELLER-Arrow'></i>
        </div>
      </div>
    </>
  );
}

export default ItemsInfo;
