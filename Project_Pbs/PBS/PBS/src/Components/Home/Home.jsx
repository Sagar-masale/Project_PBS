import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import '../NavBar/NavBar';
import './Home.css';

import '../MediaQueries/MediaQueries.css';
import { Link } from 'react-router-dom';
import MainPage from '../images/Home.jpg';
import MainPage2nd from '../images/Products.jpg';
import MainPage3rd from '../images/Product2.jpg';
import LineImg from '../images/line.png';
import MangalSutraImg from '../images/Mangalsutra.jpg';
import BanglesImg from '../images/Bangles.jpg';
import ChainsImg from '../images/Chains.jpg';
import FirstPageData from './HomeData';


function Home({
    CatTitle1="...",
    CatTitle2="...",
    CatTitle3="...",
    CatTitle4="...",
    CatTitle5="...",
    CatTitle6="..."
}){

  
    const images = [
        { url: MainPage},
        { url: MainPage2nd},
        { url: MainPage3rd},
      ];
    return(
        <>

 <div className="img-slide">

        <div>
      <SimpleImageSlider
        width={"100%"}
        height={"100%"}
        images={images}
        // showBullets={true}
        // showNavs={true}
        slideDuration={1}
        autoPlay={true}
        autoPlayDelay={4}
        navStyle={1}
        navSize={40}
        
      />
    </div>
   
   </div>
   <div className="shop-category Category-List-First-Box">
<h2 className="shop-c">Shop By Category</h2><br/>
<p className="instruction">Browse through your favourite categories. We've got them all!</p><br/>

<div className="image-lists Category-List-First " id="Category-Move">
     <Link to="/Ring-Page" className="list-items items1"><div className="list-item1" ><div className="items-background"><img src='./RingImgs/imgR2.jpg' className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle1}</h6></div> </div></Link> 
     <Link to="/Earrings-Page" className="list-items items2"><div className="list-item2" ><div className="items-background"><img src='./Erraings/imgR3.jpg' className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle2}</h6></div> </div></Link> 
     <Link to="/Pendants-Page" className="list-items items3"><div className="list-item3" ><div className="items-background"><img src='./Pendants/MainPendant.webp' className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle3}</h6></div> </div></Link> 
     <Link to="/Mangalsutra-Page" className="list-items items4"><div className="list-item4" ><div className="items-background"><img src={MangalSutraImg} className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle4}</h6></div> </div></Link> 
     <Link to="/Bangles-Page" className="list-items items5"><div className="list-item5" ><div className="items-background"><img src={BanglesImg} className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle5}</h6></div> </div></Link> 
     <Link to="/Chains-Page" className="list-items items6"><div className="list-item6" ><div className="items-background"><img src={ChainsImg} className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle6}</h6></div> </div></Link> 
     
</div>
<img src={LineImg} className="line"/>
</div>

<div className="shop-category Occasion-category">
    <h2 className="shop-c shop-Occasion">Shop By Occasion</h2><br/>
    <p className="instruction">Whatever the occasion, we've got a beatiful piece of jewellery for you.</p><br/>
    <div className="bg-white">
      <div className="mx-auto w-100 px-4  sm:px-6  lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {FirstPageData.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                
                  src={product.MainImg}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.MainImgTitle}
                    
                  </h3>
                  
                </div>
                <p className="text-sm font-medium text-gray-900">{product.MainImgNow}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      <img src={LineImg} className="front-img1"/>
    </div>

        </>
    )
    
}
export default Home