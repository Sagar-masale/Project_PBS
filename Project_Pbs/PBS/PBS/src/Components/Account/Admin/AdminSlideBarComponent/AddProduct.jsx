import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AddImage from "../AdminSlideBarComponent/addImage.png"
import '../AdminAcc.css';
import AdminContext from "../../../Context/AdminContext";
import AdminSlideBar from "../AdminSlideBar";

function AddProduct() {
  const { adminData } = useContext(AdminContext);
  const adminName = adminData?.data?.adminFullName || "Admin";


  // Admin add logic
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2), // size in KB
      progress: 0,
    }));
    setImages([...images, ...uploadedImages]);
    console.log("image", uploadedImages);   
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageRemove = (imageName) => {
    setImages(images.filter((image) => image.name !== imageName));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Product added successfully!");
  };



  return (
    <>
      {adminData ? (
        <div className="flex MainContainerAdmin min-h-screen ">
          <AdminSlideBar/>

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
            <h2 className="text-2xl text-[#8f85fe] font-semibold mb-6">Add Jewellery Product</h2>
            <div className="p-0 pt-3 bg-[#0B1739] text-white rounded-lg min-h-screen flex justify-center">
      <div className=" rounded-lg shadow-md p-4 w-full">
        

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* File Upload Section */}
          <div className="AddProduct-LeftBlock  pr-8">
            <label className="block font-medium mb-2">Add Images</label>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer">
               <div className="AddProduct-ImagesBox w-36 h-60 flex justify-center align-items-center">
                <img src={AddImage} alt={AddImage} 
                style={{ filter: "invert(100%) brightness(200%)" }}
                className="mt-[-25%]"
                />
                </div> 
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-gray-500 mb-[8%] mt-[-5%]">Drop your files here, or <span className="text-[#8f85fe]">Browse</span></p>
            </div>
            <div className="mt-4 space-y-2">
              {images.map((image) => (
                <div key={image.name} className="flex justify-between items-center bg-[#0B1739] p-2 rounded">
                  <span>{image.name} ({image.size} KB)</span>
                  <button
                    onClick={() => handleImageRemove(image.name)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
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
                  className="w-full border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Category</label>
                <select
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
                  className="w-full border-gray-300 bg-[#0B1739] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
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
