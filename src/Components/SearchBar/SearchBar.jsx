// components/SearchBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);

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
        const response = await axios.get(`https://backend-pbs-coo6.onrender.com/api/v1/products/${url}`);
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
    saveToSearchHistory(item);
    navigate(`/ItemDetails/${item._id}`);
    setShowDropdown(false);
    setSearchTerm('');
  };

const SEARCH_HISTORY_KEY = "searchHistory";

const getSearchHistory = () => {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!raw) return [];

    const data = JSON.parse(raw);
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    const valid = data.filter((item) => now - (item.savedAt || 0) < sevenDays);
    
    // Save back cleaned history
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(valid));

    return valid;
  } catch {
    return [];
  }
};

const saveToSearchHistory = (product) => {
  const existing = getSearchHistory();

  const newEntry = {
    ...product,
    savedAt: Date.now(), // 🕒 store timestamp
  };

  const filtered = existing.filter((item) => item._id !== product._id);
  const updated = [newEntry, ...filtered].slice(0, 5); // Keep only latest 5

  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
};


const handleInputFocus = () => {
  const history = getSearchHistory();
  setSearchHistory(history);
  setShowDropdown(true);
};


  return (
    <>
      <div className="relative w-full">
        <div className="relative w-full">
          <input
            type="search"
            className="text-sm search w-full h-[45px] pl-4 pr-10 rounded-lg focus:ring-0 border border-gray-300"
            placeholder="Search for rings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus} // 👈 this triggers history
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-900 w-5 h-5 pointer-events-none" />
        </div>

      {showDropdown && (
        <ul className="absolute bg-white border rounded-md mt-1 z-50 w-full max-h-60 overflow-y-auto shadow-md">
          {searchTerm.trim()
            ? (
              filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer text-sm hover:bg-purple-50 hover:shadow-sm transition-colors duration-150 ease-in-out group"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-purple-600" />
                      <span>{item.ProductName}</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-purple-600 text-base rotate-[320deg]">
                      arrow_forward
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 text-sm">No matches found</li>
              )
            ) : (
              <>
                {searchHistory.map((item) => (
                  
                  <li
                    key={item._id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center px-3 py-2 cursor-pointer text-sm hover:bg-purple-100 transition-colors duration-150 ease-in-out gap-3"
                  >
                    <span className="text-purple-600"><RotateCcw width={15}/></span>
                    <span>{item.ProductName}</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-purple-600 text-base ml-auto rotate-[320deg]">
                      arrow_forward
                    </span>
                  </li>
                ))}
              </>
            )}
        </ul>
      )}


      </div>
    </>
  );
};

export default SearchBar;
