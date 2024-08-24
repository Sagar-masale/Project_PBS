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


      const callouts = [
        {
          namCollectionImgTitle: 'Ring of Elegance',
          description: 'Perfect for Every Occasion',
          CollectionImgs: './HomeImgs/CollectionImg1.jpg',
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          href: '#',
        },
        {
          namCollectionImgTitle: 'Golden Glamour',
          description: 'Classic gold earrings for timeless elegance.',
          CollectionImgs: './HomeImgs/CollectionImg2.jpg',
          imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
          href: '#',
        },
        {
          namCollectionImgTitle : 'Diamond Dreams',
          description: 'A modern silver necklace with a contemporary diamond design',
          CollectionImgs: './HomeImgs/CollectionImg3.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          href: '#',
        },
        
        
      ]
      
      
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


{/* Collection */}
    <div className="bg-white">
      <div className="mx-auto l px-4 sm:px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-red-900"> PBS Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.CollectionImgTitle} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={callout.imageAlt}
                    src={callout.CollectionImgs}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.namCollectionImgTitle}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

        </>
    )
    
}
export default Home