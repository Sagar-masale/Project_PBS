import { useContext, useState } from "react";
import axios from "axios";
import { FaTimes, FaLock } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import ProfileContext from '../../Context/ProfileContext';
import CartContext from "../../Context/CartContext";

const CheckOutModel = ({ProductTotalAmt, closeCheckout}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {userData} = useContext(ProfileContext);
  const fullName = userData.fullName?.split(" ") || ["", ""];
  const [formData, setFormData] = useState({
    firstName: fullName[0],
    lastName: fullName[1],
    email: userData.email || "",
    phone: userData.phoneNumber || "",
    address1: userData.addressLine1 || "",
    address2: userData.addressLine2 || "",
    city: userData.city || "",
    state: userData.state || "",
    postalCode: userData.zipCode || "",
    country: "",
    totalAmount: ProductTotalAmt
  });
 
  
  const { cart } = useContext(CartContext);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.address1) newErrors.address1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!/^\d{5,6}$/.test(formData.postalCode)) {
        newErrors.postalCode = "Enter a valid postal code";
      }
      
    if (!formData.country) newErrors.country = "Country is required";
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const addOrder = async () => {
    try {
        if (!cart.length) throw new Error("Cart is empty!");

        const orderData = {
            userId: userData._id,
            totalAmount: formData.totalAmount,
            orderQuantity: cart.length,
            products: cart.map(item => ({
                productId: item._id,
                orderQuantity: item.quantity,
            })),
        };

        console.log("Sending order data:", orderData);

        const response = await axios.post(
            "http://localhost:8000/api/v1/orders/add-order",
            orderData,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Order response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding order:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to place order");
    }
};


  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Order placed successfully!");
        const response = await addOrder();
        console.log("Order Response:", response);
        
        closeCheckout();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          totalAmount: ProductTotalAmt
        });
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="font-sans">
       
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[84vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button
                  onClick={closeCheckout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            disabled={isLoading}
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                            />

                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                        <input
                          type="text"
                          name="address1"
                          value={formData.address1}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border ${errors.address1 ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                        />
                        {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          name="address2"
                          value={formData.address2}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">State</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                          />
                          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                          />
                          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Country</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.country ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                          >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="India">India</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total Amount:</span>
                    <span className="text-2xl font-bold"> ₹{ProductTotalAmt} </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#4f3267] text-white py-3 rounded-lg hover:bg-[#432a58] transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <ImSpinner8 className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaLock />
                        Complete Purchase
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      
    
  );
};

export default CheckOutModel;
