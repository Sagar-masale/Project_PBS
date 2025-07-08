import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IndianRupee, Trash2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const validWishlist = stored.filter((item) => item.expiry > Date.now());
    setWishlist(validWishlist);
    localStorage.setItem("wishlist", JSON.stringify(validWishlist));
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success("Item removed from wishlist.");
  };

  const clearAll = () => {
    localStorage.removeItem("wishlist");
    setWishlist([]);
    toast.success("Wishlist cleared.");
  };

  return (
    <div className="min-h-screen bg-[#f6eff6] py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4f3267] text-left mb-10 tracking-tight">
        Your Wishlist
      </h1>


        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">Your wishlist is empty.</p>
            <Link to="/" className="mt-2 inline-block text-[#4f3267] font-medium hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={clearAll}
                className="bg-[#4f3267] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#3f2554] transition"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row bg-white shadow-sm rounded-xl overflow-hidden p-4 items-center gap-5 hover:shadow-md transition"
                >
                  {/* Product Image */}
                  <div className="w-28 h-28 shrink-0">
                    <img
                      src={item.ProductImages[0]}
                      alt={item.ProductName}
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={() => navigate(`/ItemDetails/${item._id}`)}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 w-full">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#4f3267] hover:underline cursor-pointer"
                    onClick={() => navigate(`/ItemDetails/${item._id}`)}
                    >
                      {item.ProductName}
                    </h2>
                    <p className="text-sm text-gray-500">Weight: {item.selectedWeight}</p>
                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                    <p className="text-[#4f3267] font-semibold text-lg mt-1 flex items-center gap-1">
                      <IndianRupee size={16} /> {item.finalPrice}
                    </p>

                    <div className="flex items-center gap-4 text-sm mt-3 text-[#4f3267]">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="flex items-center gap-1 hover:text-red-600 transition"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                     
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WishList;
