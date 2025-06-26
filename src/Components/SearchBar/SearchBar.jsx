// components/SearchBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { setProductItems } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]); // 👈 Single combined array

  // Generic fetcher for all categories
const categoryEndpoints = [
  { url: "All-rings", key: "rings" },
  { url: "All-earrings", key: "earrings" },
  { url: "All-pendants", key: "pendants" },
  { url: "All-mangalsutra", key: "mangalsutras" }, // ✅ correct key here
  { url: "All-bangles", key: "bangles" },
  { url: "All-chains", key: "chains" }
];


useEffect(() => {
  const fetchAllProducts = async () => {
    try {
      const fetchPromises = categoryEndpoints.map(async ({ url, key }) => {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${url}`);
        return response.data.message?.[key] || [];
      });

      const allResults = await Promise.all(fetchPromises);
      const merged = allResults.flat();
      setAllProducts(merged);

      console.log("✅ All products loaded:", merged.map(p => p.ProductName));
    } catch (error) {
      console.error("❌ Error loading products:", error);
      setAllProducts([]); // fallback
    }
  };

  fetchAllProducts();
}, []);
  // Filter logic
useEffect(() => {
  if (searchTerm.trim().length > 0) {
    const searchWords = searchTerm.toLowerCase().split(/\s+/); // Split by spaces

    const results = allProducts.filter((item) => {
      const name = item?.ProductName?.toLowerCase() || "";

      return searchWords.every((word) => name.includes(word)); // All words must match
    });

    setFilteredResults(results);
    setShowDropdown(true);
  } else {
    setShowDropdown(false);
  }
}, [searchTerm, allProducts]);


  const handleSelect = (item) => {
    setProductItems(item);
    navigate(`/ItemDetails/${item._id}`);
    setShowDropdown(false);
    setSearchTerm('');
  };



  return (
    <>
{showDropdown && (
  <div
    className="fixed inset-0 z-40"
    onClick={() => {
      setShowDropdown(false);
      setSearchTerm('');
    }}
  >
    <div className="absolute top-[95px] left-0 w-full h-[calc(100vh-80px)] bg-opacity-20 backdrop-blur-sm pointer-events-none  md:mt-0" />
  </div>
)}


      <div className="relative w-full">
        <div className="relative w-full">
          <input
            type="search"
            className="text-sm search w-full h-[45px] pl-4 pr-10 rounded-lg focus:ring-0 border border-gray-300"
            placeholder="Search for rings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-900 w-5 h-5 pointer-events-none" />
        </div>

        {showDropdown && (
          <ul className="absolute bg-white border rounded-md mt-1 z-50 w-full max-h-60 overflow-y-auto shadow-md">
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-purple-100 transition-colors duration-150 ease-in-out"
                >
                  {item.ProductName}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No matches found</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
