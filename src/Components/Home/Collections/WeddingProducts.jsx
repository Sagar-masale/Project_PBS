import React from 'react';
import wed from './wed1.png'
import wed1 from './wed2.webp';
import wed2 from './wed3.png';
import wed3 from './wed4.png';
import { useNavigate } from 'react-router-dom';
function WeddingProducts() {
  const navigate = useNavigate();
  const weddingProducts = [
    {
      id: 1,
      name: "Mangalsutra",
      img: wed1,
      span: "md:col-span-1 md:h-80",
      slug:"/Mangalsutra-Page"
    },
    {
      id: 2,
      name: "Forest Grace Set",
      img: wed2,
      span: "md:col-span-2 md:h-80",
      slug:"/Pendants-Page"
    },
    {
      id: 3,
      name: "Celestial Promise",
      img: wed3,
      span: "md:col-span-2 md:h-96",
      slug:"/Ring-Page"
    },
    {
      id: 4,
      name: "Solitaire Ring",
      img: wed,
      span: "md:h-full",
      slug:"/Ring-Page"
    },
    
  ];
  
  return (
    <>
<div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
  {/* Heading */}
  <div className="mb-10 text-left">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#4f3267]">Wedding Collection</h2>
    <p className="text-sm text-gray-500 mt-2">Explore elegant wedding jewelry</p>
  </div>

  {/* Responsive Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-4">
    {weddingProducts.map((product) => (
      <div
        key={product.id}
        onClick={()=>{navigate(product.slug)}}
        className="relative group rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition duration-300"
      >
        {/* Image */}
        <img
          src={product.img}
          alt={product.name || "Wedding Product"}
          loading="lazy"
          className="h-56 sm:h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>

        {/* Product Name */}
        {product.name && (
          <span className="absolute bottom-3 left-4 text-white text-sm sm:text-base font-semibold z-10">
            {product.name}
          </span>
        )}
      </div>
    ))}
  </div>
</div>



    </>
  )
}

export default WeddingProducts
