import React, {useEffect} from 'react';
import WeddingProducts from './Collections/WeddingProducts';
import '../NavBar/NavBar';
import './Home.css';

import '../MediaQueries/MediaQueries.css';
import { Link } from 'react-router-dom';
import MainPage from '../images/Home.png';
import MainPagePhn from '../images/H.png';

import MainPage2nd from '../images/Home2.png';
import MainPage2ndPhn from '../images/Home2Phn.png';

import MainPage3rd from '../images/Home3.png';
import MainPage3rdPhn from '../images/Home3Phn.png';

import MangalSutraImg from '../images/Mangalsutra.jpg';
import BanglesImg from '../images/Bangles.jpg';
import ChainsImg from '../images/Chains.jpg';
import About from '../About_PBS/About';


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
          href: '/Ring-Page',
        },
        {
          id:2,
          nameCollectionImgTitle: 'Golden Glamour',
          description: 'Classic gold earrings for timeless elegance.',
          CollectionImgs: './HomeImgs/CollectionImg2.jpg',
          imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
          href: '/Earrings-Page',
        },
        {
          id:3,
          nameCollectionImgTitle : 'Diamond Dreams',
          description: 'A modern silver necklace with a contemporary diamond design',
          CollectionImgs: './HomeImgs/CollectionImg3.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          href: '/Pendants-Page',
        },
        
        
      ]
      useEffect(() => {
        const carousel = document.querySelector('#carouselExampleAutoplaying');
        if (carousel && !window.bootstrap.Carousel.getInstance(carousel)) {
          new window.bootstrap.Carousel(carousel, {
            interval: 4000,
            ride: 'carousel',
            touch: true,
            pause: false,
          });
        }
      }, []);
      
      
    return(
        <>

<div className="w-full overflow-hidden relative" id="Category-Move">
  <div
    id="carouselExampleAutoplaying"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    {/* Carousel Inner */}
    <div className="carousel-inner">
      {/* Slide 1 */}
      <div className="carousel-item active">
        <picture>
          <source media="(max-width: 480px)" srcSet={MainPagePhn} />
          <img
            src={MainPage}
            alt="MainPage"
            className="w-full object-cover h-[60vh] sm:h-[80vh] lg:h-[90vh]"
          />
        </picture>
      </div>

      {/* Slide 2 */}
      <div className="carousel-item">
        <picture>
          <source media="(max-width: 500px)" srcSet={MainPage2ndPhn} />
          <img
            src={MainPage2nd}
            alt="MainPage2"
            className="w-full object-cover h-[60vh] sm:h-[80vh] lg:h-[90vh]"
          />
        </picture>
      </div>

      {/* Slide 3 */}
      <div className="carousel-item">
        <picture>
          <source media="(max-width: 480px) (height: 300px)" srcSet={MainPage3rdPhn} />
          <img
            src={MainPage3rd}
            alt="MainPage3"
            className="w-full object-cover h-[60vh] sm:h-[80vh] lg:h-[90vh]"
          />
        </picture>
      </div>
    </div>

    {/* Previous Button */}
    <button
      className="carousel-control-prev absolute top-1/2 left-2 -translate-y-1/2 z-10"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="prev"
    >
      <span className="material-symbols-outlined text-white text-3xl">
        chevron_left
      </span>
    </button>

    {/* Next Button */}
    <button
      className="carousel-control-next absolute top-1/2 right-2 -translate-y-1/2 z-10"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="next"
    >
      <span className="material-symbols-outlined text-white text-3xl">
        chevron_right
      </span>
    </button>
  </div>
</div>
      
   <div className="shop-category Category-List-First-Box  flex flex-col justify-center items-center">
<div className="text-center px-4 sm:px-6 lg:px-8 py-6">
  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4f3267]">
    Choose Your Category
  </h2>

  <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
    Find Your Favorites – We’ve Got Every Category Covered!
  </p>
</div>


<div
  id="Category-Move"
  className="w-full px-4 sm:px-6 py-8"
  style={{ paddingLeft: window.innerWidth >= 1024 ? "30px" : "", paddingRight: window.innerWidth >= 1024 ? "30px" : "" }}
>



  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {/* Ring */}
    <Link to="/Ring-Page" className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src="./RingImgs/imgR2.jpg"
          alt="Rings"
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="text-center py-2">
          <h6 className="text-sm font-medium text-[#4f3267]">{CatTitle1}</h6>
        </div>
      </div>
    </Link>

    {/* Earrings */}
    <Link to="/Earrings-Page" className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src="./Erraings/imgR3.jpg"
          alt="Earrings"
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="text-center py-2">
          <h6 className="text-sm font-medium text-[#4f3267]">{CatTitle2}</h6>
        </div>
      </div>
    </Link>

    {/* Pendants */}
    <Link to="/Pendants-Page" className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src="./Pendants/MainPendant.webp"
          alt="Pendants"
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="text-center py-2">
          <h6 className="text-sm font-medium text-[#4f3267]">{CatTitle3}</h6>
        </div>
      </div>
    </Link>

    {/* Mangalsutra */}
    <Link to="/Mangalsutra-Page" className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src={MangalSutraImg}
          alt="Mangalsutra"
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="text-center py-2">
          <h6 className="text-sm font-medium text-[#4f3267]">{CatTitle4}</h6>
        </div>
      </div>
    </Link>

    {/* Bangles */}
    <Link to="/Bangles-Page" className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src={BanglesImg}
          alt="Bangles"
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="text-center py-2">
          <h6 className="text-sm font-medium text-[#4f3267]">{CatTitle5}</h6>
        </div>
      </div>
    </Link>

    {/* Chains */}
    <Link to="/Chains-Page" className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src={ChainsImg}
          alt="Chains"
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="text-center py-2">
          <h6 className="text-sm font-medium text-[#4f3267]">{CatTitle6}</h6>
        </div>
      </div>
    </Link>
  </div>
</div>

</div>


{/* Collection */}
<div className="bg-white py-12">
  <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
    <div className="text-left">
      <h2 className="Collection-Name text-2xl font-bold text-[#4f3267]">Collections</h2>
    </div>

    <div className="mt-10 grid grid-cols-1 gap-y-10 gap-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-4">
      {Collections.map((collection) => (
        <div key={collection.id} className="group relative">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={collection.CollectionImgs}
              alt={collection.imageAlt}
              className="h-[200px] w-full object-cover object-center transition duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          <div className="mt-4 text-left">
            <h3 className="text-sm text-gray-700">
              <Link to={collection.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {collection.nameCollectionImgTitle}
              </Link>
            </h3>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {collection.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    {/* Wedding Section */}
    
    <div className="bg-white">
     <WeddingProducts/>
    </div>
        <div className="bg-white">
     <About/>
    </div>
    
        </>
    )
    
}
export default Home