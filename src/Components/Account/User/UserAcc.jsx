import React, { useContext, useState, useEffect, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../PageLoader/Loading';
import './UserAcc.css';
import EditUser from './EditUser';
import ProfileContext from '../../Context/ProfileContext';
import OrderBill from '../../OrderDetails/OrderBill';
import axios from 'axios';
import RegisterContext from '../../Context/RegisterContext';
import toast from 'react-hot-toast';
function UserAcc() {

  const { orderData, setOrderData } = useContext(ProfileContext);
  const invoiceContainerRef = useRef(null);
  const [isLoadingUserAcc, setIsLoadingUserAcc] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [showInvoice , setShowInvoice] = useState(false);
    useEffect(() => {
      if (isLoadingUserAcc) {
        document.body.style.overflow = 'hidden'; // Disable scroll
      } else {
        document.body.style.overflow = ''; // Enable scroll
      }
  
      // Cleanup on unmount
      return () => {
        document.body.style.overflow = '';
      };
    }, [isLoadingUserAcc]);


  const navigate = useNavigate();

  const { userData, setUserData } = useContext(ProfileContext);



  const { setLogout } = useContext(RegisterContext);



 const handleLogout = () => {
  setIsLoadingUserAcc(true); // Trigger loading animation immediately

  setTimeout(() => {

    setIsLoadingUserAcc(false); // Stop loading animation after 3 seconds
    setUserData("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogout(true);
    toast.success("You have been logged out successfully.",{ duration: 2000 });

    navigate('/');
  }, 2000);


};

const handleEdit = () => {
  setIsLoadingUserAcc(true);
  setTimeout(() => {
    setIsLoadingUserAcc(false);
    setIsEditing(true);
  }, 1000);
};

const handleCloseEdit = () => {
    setIsEditing(false);
};


  const handleShowInvoice = (order) => {
  setShowInvoice(order);
  window.scrollTo({ top: 0, behavior: 'smooth' }); // ⬆️ Scroll to top only on open
};

  useEffect(() => {
    if (userData?.userOrders?.length > 0) {
      fetchOrdersByIds(userData.userOrders);
    }
  }, [userData?.userOrders]);
    const fetchOrdersByIds = async (orderIds) => {
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      
      return;
    }
  
    try {

      const response = await axios.post("http://localhost:8000/api/v1/orders/getUser-order", { orderIds });
      setOrderData(response.data.data);
    } catch (error) {
     return;
    }
  };
  
  return (
    <>
        {showInvoice ? (
<div className="relative  max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8">
  <OrderBill
    selectedOrder={showInvoice}
    handleClose={() => setShowInvoice(null)}
    invoiceRef={invoiceContainerRef} // 🔁 pass ref here
  />
</div>

    ):(null)}
    {isLoadingUserAcc && <Loading />}
    <div>{isEditing && <EditUser onCloseEditComponent={handleCloseEdit} />}</div>
    {userData?(
          <div className="profile-container">
          <div className="px-4 sm:px-0 flex justify-between">
            <h3 className="text-2xl font-semibold text-gray-900 flex gap-2">
              Welcome
              <span
                className="WelcomeUser"
                style={{ color: "#4f3267" }}
              >
                {userData.fullName?.split(" ")[0] || "Guest"}
              </span>
            </h3>
            <div className="LogOut-Button-EditButton flex gap-4 ml-auto">
              <button className="editUserAcc px-4 py-1 rounded-lg" onClick={handleEdit}>
                Edit
              </button>
              <button
                onClick={handleLogout}
                className="logOutUAcc bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-500 text-white px-4 py-1 rounded-lg  items-center"
              >
                Logout
              </button>
            </div>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500"></p>
          </div>
      
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {[
                { label: "Full Name", value: userData.fullName },
                { label: "Email", value: userData.email },
                { label: "Phone Number", value: userData.phoneNumber },
                { label: "Address Line 1", value: userData.addressLine1 },
                { label: "Address Line 2", value: userData.addressLine2 },
                { label: "Country", value: userData.country },
                { label: "City", value: userData.city },
                { label: "State", value: userData.state },
                { label: "ZIP Code", value: userData.zipCode },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <h3 className="text-sm/6 font-medium text-gray-900">{label}</h3>
                  <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {value || "N/A"}
                  </span>
                </div>
              ))}
      
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <h3 className="text-sm/6 font-medium text-gray-900">About</h3>
                <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  In your account, you can view and update personal details, track orders, manage preferences, and access features like Terms & Conditions, Privacy Policy, and more.
                </span>
              </div>
      
<div className="py-6">
  <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Data & Downloads</h3>

  {orderData && orderData.length > 0 ? (
    <div className="grid gap-4 sm:grid-cols-2">
      {orderData.map((order, index) => {
        const firstProduct = order?.orderDetails?.[0]; // only first product
        const imageUrl =
          firstProduct?.ProductImages?.[0] || "/default-image.jpg";

        return (
          <div
            key={order._id || index}
            className="flex items-start p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={imageUrl}
              alt="Product"
              className="w-20 h-20 object-cover rounded"
            />

            <div className="ml-4 flex-1">
              <p className="font-medium text-gray-900">
                Order #{order.orderId || order._id?.slice(-5)}
              </p>

              <p className="text-sm text-gray-500">
                {firstProduct?.ProductName || "Unnamed Product"} (
                {order.quantity} pcs) — ₹{order.totalAmount}
              </p>

              <p className="text-xs text-gray-400">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

            <button onClick={() => handleShowInvoice(order)}
              className='text-sm font-semibold text-purple-700 hover:underline mt-1 inline-block'
              >View Invoice</button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-sm text-gray-500">No orders found yet.</p>
  )}
</div>

            </dl>
          </div>
        </div>
    ):
      <div className="NotUserData w-full h-96 flex justify-center align-items-center">
      <h1 className='text-lg'>
        Login to Access Your Profile
      </h1>
      </div>
    }
  </>
  
  )
}

export default UserAcc
