import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes, FaLock } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import ProfileContext from "../../Context/ProfileContext";
import CartContext from "../../Context/CartContext";
import toast from "react-hot-toast";
import MetalContext from "../../Context/MetalRateContext";
const CheckOutModel = ({ ProductTotalAmt, closeCheckout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(ProfileContext);
  const { cart, calculateCartSummary } = useContext(CartContext);
  const { totalPrice, totalDiscount, discountedTotal } = calculateCartSummary();
  const [errors, setErrors] = useState({});
  
  const { metalRates, refreshMetalRates, couponCode, clearCouponCode  } = useContext(MetalContext);
  const [formData, setFormData] = useState({
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
    totalAmount: ProductTotalAmt,
  });
    console.log("Metal response in check",metalRates);
  // ✅ Check if profile is complete before showing the form
  useEffect(() => {
    const requiredFields = [
      userData.fullName,
      userData.email,
      userData.phoneNumber,
      userData.addressLine1,
      userData.city,
      userData.state,
      userData.zipCode,
    ];

    const isProfileComplete = requiredFields.every(
      (field) => field && field.trim() !== ""
    );

    if (!isProfileComplete) {
      toast.error("Please complete your profile before placing an order.",{ duration: 2000 });
      closeCheckout();
      return;
    }

    const fullName = userData.fullName?.split(" ") || ["", ""];
    setFormData({
      firstName: fullName[0],
      lastName: fullName[1],
      email: userData.email || "",
      phone: userData.phoneNumber || "",
      address1: userData.addressLine1 || "",
      address2: userData.addressLine2 || "",
      city: userData.city || "",
      state: userData.state || "",
      postalCode: userData.zipCode || "",
      country: userData.country,
      totalAmount: ProductTotalAmt,
    });
  }, [userData, ProductTotalAmt, closeCheckout]);

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
    if (!formData.postalCode || !/^\d{5,6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Valid postal code is required";
    }
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  console.log("Cart Data",cart)
  const addOrder = async () => {
    if (!cart.length) throw new Error("Cart is empty");
    await refreshMetalRates();

    const orderData = {
  userId: userData._id,
  totalAmount: totalPrice,
  discount: totalDiscount,
  totalAmountWithDiscount: discountedTotal,
  orderQuantity: cart.length,
  products: cart.map((item) => {
    const metalPrice =
       item.metalType  === "gold"
        ? metalRates.gold
        : item.metalType === "silver"
        ? metalRates.silver
        : 0;
console.log("Cart Product:",item);

    return {
      productId: item._id,
      orderProductSize: item.selectedSize || "Default",
      orderProductWeight: item.selectedWeight,
      orderQuantity: item.quantity,
      ProductName:item.ProductName,
      ProductImages:item.ProductImages,
      price: item.finalPrice,
      ProductCouponCode:couponCode ,
      mackingCharges:item.makingCharges,
      orderedProductPrice: metalPrice,
    };
  }),
};

    const response = await axios.post(
      "http://localhost:8000/api/v1/orders/add-order",
      orderData,
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.success) {
      toast.success("Order placed successfully!",{ duration: 2000 });
      clearCouponCode()
     
    } else {
      throw new Error("Order failed");
    }
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      await addOrder();
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
        totalAmount: ProductTotalAmt,
      });
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again.",{ duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("Form Data",formData);
  
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
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`mt-1 w-full rounded-md border ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        } px-3 py-2`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`mt-1 w-full rounded-md border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } px-3 py-2`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-1 w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } px-3 py-2`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`mt-1 w-full rounded-md border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } px-3 py-2`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Address Line 1</label>
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className={`mt-1 w-full rounded-md border ${
                        errors.address1 ? "border-red-500" : "border-gray-300"
                      } px-3 py-2`}
                    />
                    {errors.address1 && (
                      <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`mt-1 w-full rounded-md border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } px-3 py-2`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`mt-1 w-full rounded-md border ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        } px-3 py-2`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`mt-1 w-full rounded-md border ${
                          errors.postalCode ? "border-red-500" : "border-gray-300"
                        } px-3 py-2`}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`mt-1 w-full rounded-md border ${
                          errors.country ? "border-red-500" : "border-gray-300"
                        } px-3 py-2`}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total Amount:</span>
                <span className="text-2xl font-bold">
                  ₹{ProductTotalAmt.toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4f3267] text-white py-3 rounded-lg hover:bg-[#432a58] transition-colors disabled:bg-purple-300 flex items-center justify-center gap-2"
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
