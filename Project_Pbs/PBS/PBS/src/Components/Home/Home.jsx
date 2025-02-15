import React from 'react';
import WeddingProducts from './Collections/WeddingProducts';
import '../NavBar/NavBar';
import './Home.css';

import '../MediaQueries/MediaQueries.css';
import { Link } from 'react-router-dom';
import MainPage from '../images/Home.png';

import MainPage2nd from '../images/Products.jpg';
import MainPage3rd from '../images/Product2.jpg';
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

  


      const Collections = [
        {
          id:1,
          nameCollectionImgTitle: 'Ring of Elegance',
          description: 'Perfect for Every Occasion',
          CollectionImgs: './HomeImgs/CollectionImg1.jpg',
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          href: '#',
        },
        {
          id:2,
          nameCollectionImgTitle: 'Golden Glamour',
          description: 'Classic gold earrings for timeless elegance.',
          CollectionImgs: './HomeImgs/CollectionImg2.jpg',
          imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
          href: '#',
        },
        {
          id:3,
          nameCollectionImgTitle : 'Diamond Dreams',
          description: 'A modern silver necklace with a contemporary diamond design',
          CollectionImgs: './HomeImgs/CollectionImg3.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          href: '#',
        },
        
        
      ]
    
      
    return(
        <>

 <div className="img-slide">


 <div
  id="carouselExampleAutoplaying"
  className="SlideImagesBox carousel slide"
  data-bs-ride="carousel"
>
  <div className="carousel-inner ImageSlide-Carousel-Inner">
    <div className="carousel-item active">
      <img
        src={MainPage}
        className="d-block w-100 h-[90vh] object-fill"
        alt="MainPage"
      />
    </div>
    <div className="carousel-item">
      <img
        src={MainPage2nd}
        className="d-block w-100 h-[90vh] object-fill"
        alt="..."
      />
    </div>
    <div className="carousel-item">
      <img
        src={MainPage3rd}
        className="d-block w-100 h-[90vh] object-fill"
        alt="..."
      />
    </div>
  </div>
  <button
    className="carousel-control-prev w-40"
    type="button"
    data-bs-target="#carouselExampleAutoplaying"
    data-bs-slide="prev"
  >
    <span className="material-symbols-outlined Carousel-Arrows">
      chevron_left
    </span>
  </button>
  <button
    className="carousel-control-next w-40"
    type="button"
    data-bs-target="#carouselExampleAutoplaying"
    data-bs-slide="next"
  >
    <span className="material-symbols-outlined Carousel-Arrows">
      chevron_right
    </span>
  </button>
</div>

   </div>
   <div className="shop-category Category-List-First-Box  flex flex-col justify-center items-center">
<h2 className="shop-c">Choose Your Category</h2><br/>
<p className="instruction">Find Your Favorites – We’ve Got Every Category Covered!</p><br/>

<div className="image-lists Category-List-First" id="Category-Move">
     <Link to="/Ring-Page" className="list-items items1"><div className="list-item1 HomeList-Items" ><div className="items-background"><img src='./RingImgs/imgR2.jpg' className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle1}</h6></div> </div></Link> 
     <Link to="/Earrings-Page" className="list-items items2"><div className="list-item2 HomeList-Items" ><div className="items-background"><img src='./Erraings/imgR3.jpg' className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle2}</h6></div> </div></Link> 
     <Link to="/Pendants-Page" className="list-items items3"><div className="list-item3 HomeList-Items" ><div className="items-background"><img src='./Pendants/MainPendant.webp' className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle3}</h6></div> </div></Link> 
     <Link to="/Mangalsutra-Page" className="list-items items4"><div className="list-item4 HomeList-Items" ><div className="items-background"><img src={MangalSutraImg} className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle4}</h6></div> </div></Link> 
     <Link to="/Bangles-Page" className="list-items items5"><div className="list-item5 HomeList-Items" ><div className="items-background"><img src={BanglesImg} className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle5}</h6></div> </div></Link> 
     <Link to="/Chains-Page" className="list-items items6"><div className="list-item6 HomeList-Items" ><div className="items-background"><img src={ChainsImg} className="shop-category-images shop-category-img1"/></div><div className="card-title"><h6 className="card-title-name">{CatTitle6}</h6></div> </div></Link> 
     
</div>
{/* <img src={LineImg} className="line"/> */}
</div>


{/* Collection */}
    <div className="bg-white ">
      <div className="mx-auto l px-4 sm:px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 ">
          <h2 className="Collection-Name text-2xl font-bold text-purple-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 ">
            {Collections.map((Collections) => (
              <div key={Collections.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={Collections.imageAlt}
                    src={Collections.CollectionImgs}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={Collections.href}>
                    <span className="absolute inset-0" />
                    {Collections.nameCollectionImgTitle}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{Collections.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Wedding Section */}
    
    <div className="bg-white ">
     <WeddingProducts/>
    </div>
    
 
        </>
    )
    
}
export default Home