import React, { useContext, useState, useRef } from "react";
import AddImage from "../AdminSlideBarComponent/addImage.png";
import axios from "axios";
import "../AdminAcc.css";
import AdminContext from "../../../Context/AdminContext";
import AdminSlideBar from "../AdminSlideBar";

function AddProduct() {
  const { adminData } = useContext(AdminContext);
  const adminName = adminData?.data?.adminFullName || "Admin";

  const [formData, setFormData] = useState({
    ProductName: "",
    ProductCategory: "",
    ProductPrice: "",
    ProductQty: "",
    ProductDescription: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setImages(Array.from(files));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true); // Disable the button
  
    const data = new FormData();
    data.append("ProductName", formData.ProductName);
    data.append("ProductCategory", formData.ProductCategory);
    data.append("ProductPrice", Number(formData.ProductPrice));
    data.append("ProductQty", Number(formData.ProductQty));
    data.append("ProductDescription", formData.ProductDescription);
    data.append("adminId", adminData.data._id);
  
    images.forEach((image) => {
      data.append("ProductImages", image);
    });
  
    const categoryApiMap = {
      Rings: "add-ring",
      Earrings: "add-earring",
      Pendants: "add-pendants",
      Mangalsutra: "add-mangalsutra",
      Bangles: "add-bangles",
      Chains: "add-chains",
    };
  
    const selectedCategory = formData.ProductCategory;
    const apiEndpoint = categoryApiMap[selectedCategory] || "add-products";
  
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/products/${apiEndpoint}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");
      console.log("Data added:", response.data.data);
  
      // Clear form fields and uploaded images
      setFormData({
        ProductName: "",
        ProductCategory: "",
        ProductPrice: "",
        ProductQty: "",
        ProductDescription: "",
      });
      setImages([]);
      fileInputRef.current.value = null; // Reset file input field
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false); // Re-enable the button
    }
  };
  
  return (
    <>
      {adminData ? (
        <div className="flex MainContainerAdmin min-h-screen">
          <AdminSlideBar />
          <div className="flex-1 p-8">
            <header className="flex justify-end items-center mb-8">
              <img
                src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-418179856.jpg"
                alt="Admin"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-2 text-sm text-white">{adminName}</span>
            </header>
            <h2 className="text-2xl text-[#8f85fe] font-semibold mb-6">
              Add Jewellery Product
            </h2>
            <div className="p-0 pt-3 bg-[#0B1739] text-white rounded-lg min-h-screen flex justify-center">
              <div className="rounded-lg shadow-md p-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="AddProduct-LeftBlock pr-8">
                    <label className="block font-medium mb-2">Add Images</label>
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className={`border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${
                        images.length > 0 ? "w-full p-0 border-none" : null
                      }`}
                    >
                      <div
                        className={`AddProduct-ImagesBox flex justify-center items-center rounded ${
                          images.length > 0 ? "w-[100%] h-full" : "w-36 h-60"
                        }`}
                      >
                        {images.length > 0 ? (
                          <img
                            src={URL.createObjectURL(images[0])}
                            alt="Preview"
                            className="w-72 h-full object-cover rounded"
                          />
                        ) : (
                          <img
                            src={AddImage}
                            alt="Add Image"
                            style={{ filter: "invert(100%) brightness(200%)" }}
                            className="mt-[-25%]"
                          />
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-gray-500 mb-[8%] mt-[-5%]">
                        Select your file{" "}
                        <span className="text-[#8f85fe]">Browse</span>
                      </p>
                    </div>
                    <div className="mt-4 space-y-2">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-[#0B1739] p-2 rounded"
                        >
                          <span>
                            {image.name} ({Math.round(image.size / 1024)} KB)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="AddProduct-RightBlock pl-8">
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-4">
                        <label className="block font-medium mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="ProductName"
                          value={formData.ProductName}
                          onChange={handleInputChange}
                          className="w-full border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-medium mb-2">
                          Product Category
                        </label>
                        <select
                          name="ProductCategory"
                          value={formData.ProductCategory}
                          onChange={handleInputChange}
                          className="w-full p-2 border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Rings">Rings</option>
                          <option value="Earrings">Earrings</option>
                          <option value="Pendants">Pendants</option>
                          <option value="Mangalsutra">Mangalsutra</option>
                          <option value="Bangles">Bangles</option>
                          <option value="Chains">Chains</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block font-medium mb-2">
                          Product Price
                        </label>
                        <input
                          type="text"
                          name="ProductPrice"
                          value={formData.ProductPrice}
                          onChange={handleInputChange}
                          className="w-full border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter product price"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-medium mb-2">
                          Stock Quantity
                        </label>
                        <input
                          type="text"
                          name="ProductQty"
                          value={formData.ProductQty}
                          onChange={handleInputChange}
                          className="w-full border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter stock quantity"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-medium mb-2">
                          Product Description
                        </label>
                        <textarea
                          name="ProductDescription"
                          value={formData.ProductDescription}
                          onChange={handleInputChange}
                          className="w-full pl-3 pt-3 border-gray-300 rounded-lg bg-[#0B1739] shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          rows="4"
                          placeholder="Enter product description"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={loading} // Disable button when loading
                        className={`w-full ${
                          loading ? "bg-gray-500" : "bg-[#8f85fe]"
                        } text-white hover:bg-[#8f85fe94] shadow-md transition-all duration-100 py-2 rounded-lg mt-4`}
                      >
                        {loading ? "Publishing..." : "Publish Product"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Please log in as an admin to view the Add Product section.</h1>
      )}
    </>
  );
}

export default AddProduct;
