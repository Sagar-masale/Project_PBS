// components/SearchBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ringData, setRingData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { setProductItems } = useContext(CartContext);
  // Fetch ring data once
  useEffect(() => {
    const fetchRingData = async () => {
      try {
        const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/products/All-rings");
        console.log("Rings:",response.data.message.rings);
        
        setRingData(response.data.message.rings || []);

      } catch (error) {
        console.error("Error fetching ring data", error);
      }
    };
    fetchRingData();
  }, []);

  // Filter based on user input
  useEffect(() => {
    if (searchTerm.length > 0) {
    const results = ringData.filter((ring) =>
   ring?.ProductName?.toLowerCase().includes(searchTerm.toLowerCase())

    );


      setFilteredResults(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm, ringData]);

const handleSelect = (item) => {
  setProductItems(item);
  navigate("/ItemDetails"); 
  setShowDropdown(false); 
  
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
    <div className="absolute top-[80px] left-0 w-full h-[calc(100vh-80px)]  bg-opacity-20 backdrop-blur-sm"></div>
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
