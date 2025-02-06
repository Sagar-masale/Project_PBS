import React, { useContext, useState } from 'react';
import axios from 'axios';
import Loading from '../../PageLoader/Loading';
import ProfileContext from '../../Context/ProfileContext';
import './EditUser.css';

const EditUser = ({onCloseEditComponent}) => {
  const {userData, setUserData, setUpdateUserData} = useContext(ProfileContext);

   const [isLoading, setIsLoading] = useState(false); 
  
  const [formData, setFormData] = useState({
    userId: userData._id,
    fullName: '',
    phoneNumber: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userEditeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading before making the request
  
    try {
      const response = await axios.put('http://localhost:8000/api/v1/users/update-User', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
  
      if (response.status === 200) {
        setUserData(response.data.data)
        setIsLoading(false);      // ✅ Stop loading
        setUpdateUserData(true);
        onCloseEditComponent();   // ✅ Close form right away
      }
      
    } catch (error) {
      setIsLoading(false); // ✅ Stop loading on error
      console.error('Error updating user:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Failed to update user');
    }
  };
  

  return (
    <>
    {isLoading && <Loading />}
    <span className='close-EditUserAc position-absolute mt-[-50px] right-10 cursor-pointer' onClick={onCloseEditComponent}>Close</span>
    <form onSubmit={userEditeSubmit} className='mt-16'>
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-[100%] px-10">
        <div>
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#432a58] focus:border-[#432a58] block w-full p-2.5"
            placeholder={userData.fullName}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#432a58] focus:border-[#432a58] block w-full p-2.5"
            placeholder={userData.phoneNumber}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#432a58] focus:border-[#432a58] block w-full p-2.5"
            placeholder={userData.email}
          />
        </div>
        <div>
          <label htmlFor="addressLine1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address Line 1
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#432a58] focus:border-[#432a58] block w-full p-2.5"
            placeholder={userData.addressLine1 || "solapur"}
          />
        </div>
        <div>
          <label htmlFor="addressLine2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address Line 2
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#432a58] focus:border-[#432a58] block w-full p-2.5"
            placeholder={userData.addressLine2 || "Apartment, suite, etc. (optional)"}
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Country
          </label>
          <select id="country" name="country" value={formData.country} onChange={handleChange} className="bg-gray-50 border border-gray-300 focus:ring-[#432a58] text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
            <option value="Japan">Japan</option>
            <option value="Brazil">Brazil</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>
        <div>
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input 
          type="text" 
          id="city" 
          name="city" 
          value={formData.city} 
          onChange={handleChange} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={userData.city || "eg: Solapur"}
          />
        </div>
        <div>
          <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
          <input 
          type="text" 
          id="state" 
          name="state" 
          value={formData.state} 
          onChange={handleChange} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={userData.state || "eg: Maharashtra"}
          />
        </div>
        <div>
          <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ZIP Code</label>
          <input 
          type="text" 
          id="zip" 
          name="zipCode" 
          value={formData.zipCode} 
          onChange={handleChange} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={userData.zip || "eg: 413005"}
          />
        </div>
      </div>
      <button type="submit" className="text-white bg-[#4f3267] hover:bg-[#432a58] focus:ring-4 focus:outline-none focus:ring-[#432a58] font-medium rounded-lg text-sm w-[5%] px-5 py-2.5 text-center flex justify-center ml-10">Save</button>
    </form>
    </>
  );
};

export default EditUser;