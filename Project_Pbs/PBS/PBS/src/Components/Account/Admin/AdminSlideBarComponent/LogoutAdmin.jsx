import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../../Context/AdminContext.js";
import Loading from "../../../PageLoader/Loading.jsx";

function LogoutAdmin({ onCancel }) {
  const { setAdminData } = useContext(AdminContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Disable scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleConfirm = () => {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.removeItem("accessTokenAdmin");
      localStorage.removeItem("refreshTokenAdmin");
      setAdminData(null);
      setIsLoading(false);
      navigate("/"); // Redirect to home/login page
    }, 3000);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Logout</h2>
          <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
          <div className="flex justify-around">
            <button
              onClick={handleConfirm}
              className="bg-[#4f3267] hover:bg-[#432a58] text-white px-4 py-2 rounded transition duration-300"
            >
              Logout
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogoutAdmin;
