import React, { useContext, useState, useRef } from "react";
import AddImage from "../AdminSlideBarComponent/addImage.png";
import "../AdminAcc.css";
import AdminContext from "../../../Context/AdminContext";
import AdminSlideBar from "../AdminSlideBar";

function AddProduct() {
  const { adminData } = useContext(AdminContext);
  const adminName = adminData?.data?.adminFullName || "Admin";

  // Form data state
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    description: "",
  });

  // Images state
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setImages(Array.from(files)); // Update images state with selected files
      console.log("Images uploaded:", files);  // Log selected files
    } else {
      console.log("No files selected");
    }
  };

  // Handle input changes (for product name, category, etc.)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("Input change", name, value);  // Log each input change
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
 const handleFormSubmit = (e) => {
  e.preventDefault();

  // Log form data before submitting
  console.log("Form data on submit:", formData);

  // Create a FormData object to submit both the form data and images
  const data = new FormData();

  // Append form data (text fields)
  data.append("productName", formData.productName);
  data.append("category", formData.category);
  data.append("price", formData.price);
  data.append("description", formData.description);

  // Append images to FormData (with unique keys)
  images.forEach((image, index) => {
    data.append("images", image); // Append the image file itself
  });

  // Log FormData contents
  // Iterate through the FormData entries to log all key-value pairs
  const formDataArray = [];
  for (let [key, value] of data.entries()) {
    formDataArray.push([key, value instanceof File ? value.name : value]);
  }
  console.table(formDataArray); // Display data in a table format in the console
  

  // Simulate an API call (you can replace this with the actual API call)
  // Here we are logging the form data and images that would be sent in a real-world case
//   console.log("Form submitted with FormData:", data);

  alert("Product added successfully!");
};


  return (
    <>
      {adminData ? (
        <div className="flex MainContainerAdmin min-h-screen ">
          <AdminSlideBar />

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
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
                  {/* File Upload Section */}
                  <div className="AddProduct-LeftBlock pr-8">
                    <label className="block font-medium mb-2">Add Images</label>
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div className="AddProduct-ImagesBox w-36 h-60 flex justify-center items-center">
                        <img
                          src={AddImage}
                          alt="Add Image"
                          style={{ filter: "invert(100%) brightness(200%)" }}
                          className="mt-[-25%]"
                        />
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-gray-500 mb-[8%] mt-[-5%]">
                        select your file{" "}
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

                  {/* Product Details Form */}
                  <div className="AddProduct-RightBlock pl-8">
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-4">
                        <label className="block font-medium mb-2">Product Name</label>
                        <input
                          type="text"
                          name="productName"
                          value={formData.productName}
                          onChange={handleInputChange}
                          className="w-full border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter product name"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium mb-2">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full p-2 border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Rings">Rings</option>
                          <option value="Earrings">Earrings</option>
                          <option value="Necklaces">Necklaces</option>
                          <option value="Bracelets">Bracelets</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium mb-2">Price</label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter price"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full border-gray-300 rounded-lg bg-[#0B1739] shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          rows="4"
                          placeholder="Enter product description"
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#8f85fe] text-white hover:[background-color:#8f85fe94] shadow-md transition-all duration-100 py-2 rounded-lg mt-4"
                      >
                        Publish Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Please log in as an admin to view Add Product section.</h1>
      )}
    </>
  );
}

export default AddProduct;
