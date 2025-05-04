import React from 'react';
import wed from './wed1.png'
import wed1 from './wed2.webp';
import wed2 from './wed3.png';
import wed3 from './wed4.png';
function WeddingProducts() {
  const weddingProducts = [
    {
      id: 1,
      name: "Mangalsutra",
      img: wed1,
      span: "md:col-span-1 md:h-80"
    },
    {
      id: 2,
      name: "Forest Grace Set",
      img: wed2,
      span: "md:col-span-2 md:h-80"
    },
    {
      id: 3,
      name: "Celestial Promise",
      img: wed3,
      span: "md:col-span-2 md:h-96"
    },
    {
      id: 4,
      name: "Solitaire Ring",
      img: wed,
      span: "md:h-full"
    },
    
  ];
  
  return (
    <>
            <div className="mb-4 ml-6 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold text-[#4f3267] lg:text-3xl ">Wedding</h2>
          </div>
   
        </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8 p-4">
      
  {weddingProducts.map((product) => (
    <a
      key={product.id}
      href="#"
      className={`group relative  flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${product.span}`}
    >
      <img
        src={product.img}
        loading="lazy"
        alt={product.name || "Wedding Jewelry"}
        className="absolute inset-0 h-full w-full object-center  transition duration-200 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
      {product.name && (
        <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
          {product.name}
        </span>
      )}
    </a>
  ))}
</div>

    </>
  )
}

export default WeddingProducts
