import React, { useState, useEffect, useContext } from "react";
import ProductContext from "../Context/ProductContext";
import axios from "axios";
import toast from "react-hot-toast";

function EditProductDetails({ product, productType, onClose, refreshData }) {
  const {
    setRingProductData,
    setEarringProductData,
    setBangleProductData,
    setChainProductData,
    setPendantProductData,
    setMangalsutraProductData,
  } = useContext(ProductContext);

  const [productData, setProductData] = useState({
    ProductName: "",
    ProductGender: "",
    ProductDescription: "",
    ProductPrice: "",
  });

  useEffect(() => {
    if (product) {
      setProductData({
        ProductName: product.ProductName || "",
        ProductGender: product.ProductGender || "",
        ProductDescription: product.ProductDescription || "",
        ProductPrice: product.ProductPrice || "",
        makingCharges: product.makingCharges || "" ,
        weightInGrams: product.weightInGrams || "",
        metalType: product.metalType || "",
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleDelete = async () => {
  const confirmed = window.confirm(`Are you sure you want to delete this ${productType}?`);
  if (!confirmed) return;

  try {
    const endpoint = `delete-${productType.toLowerCase()}`;
    await axios.delete(`https://backend-pbs-coo6.onrender.com/api/v1/products/${endpoint}`, {
      data: { id: product._id },
    });

    toast.success(`${productType} deleted successfully`);

    onClose();
    refreshData && refreshData();

    setTimeout(() => {
      window.location.reload();
    }, 100);
  } catch (error) {
    toast.error(`Failed to delete ${productType}`);
  }
};

console.log("Product Data:",productData);

  const handleUpdate = async () => {
    try {
      const endpointMap = {
        rings: "update-ring",
        earrings: "update-earring",
        bangles: "update-bangle",
        chains: "update-chain",
        pendants: "update-pendant",
        mangalsutra: "update-mangalsutra",
      };

      const endpoint = endpointMap[productType.toLowerCase()];
      if (!endpoint) {
        toast.error("Invalid product type");
        return;
      }

      await axios.put(`https://backend-pbs-coo6.onrender.com/api/v1/products/${endpoint}`, {
        id: product._id,
        ...productData,
      });

      toast.success(`${productType} updated successfully`);

      // Update specific product context
      const updater = (prev) =>
        prev.map((item) =>
          item._id === product._id ? { ...item, ...productData } : item
        );

      switch (productType.toLowerCase()) {
        case "rings":
          setRingProductData(updater);
          break;
        case "earrings":
          setEarringProductData(updater);
          break;
        case "bangles":
          setBangleProductData(updater);
          break;
        case "chains":
          setChainProductData(updater);
          break;
        case "pendants":
          setPendantProductData(updater);
          break;
        case "mangalsutras":
          setMangalsutraProductData(updater);
          break;
        default:
          break;
      }

      onClose();
      refreshData && refreshData();

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      toast.error(`Failed to update ${productType}`);
    }
  };

  return (
<div className="fixed inset-0  bg-opacity-60 z-[99999] flex items-center justify-center px-4">
  <div className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-[#4f3267]">Update {productType}</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-black text-xl font-bold">
        ✕
      </button>
    </div>

    {/* Product ID */}
    <div className="mb-3">
      <label className="font-medium text-sm block mb-1">Product ID:</label>
      <input
        type="text"
        value={product._id}
        disabled
        className="w-full p-2 border rounded bg-gray-100 text-sm"
      />
    </div>

    {/* Product Name */}
    <div className="mb-3">
      <label className="font-medium text-sm block mb-1">Product Name:</label>
      <input
        type="text"
        name="ProductName"
        value={productData.ProductName}
        onChange={handleInputChange}
        className="w-full p-2 border rounded text-sm"
      />
    </div>

    {/* Gender */}
    <div className="mb-3">
      <label className="font-medium text-sm block mb-1">Product Gender:</label>
      <input
        type="text"
        name="ProductGender"
        value={productData.ProductGender}
        onChange={handleInputChange}
        className="w-full p-2 border rounded text-sm"
      />
    </div>

    {/* Description */}
    <div className="mb-3">
      <label className="font-medium text-sm block mb-1">Description:</label>
      <textarea
        name="ProductDescription"
        value={productData.ProductDescription}
        onChange={handleInputChange}
        className="w-full p-2 border rounded text-sm"
        rows={3}
      />
    </div>

    {/* Making Charges */}
    <div className="mb-3">
      <label className="font-medium text-sm block mb-1">Making Charges (per gram):</label>
      <input
        type="number"
        name="makingCharges"
        value={productData.makingCharges}
        onChange={handleInputChange}
        className="w-full p-2 border rounded text-sm"
      />
    </div>

    {/* Product Weight */}
    <div className="mb-3">
      <label className="font-medium text-sm block mb-1">Product Weight (g):</label>
      <input
        type="number"
        name="weightInGrams"
        value={productData.weightInGrams}
        onChange={handleInputChange}
        className="w-full p-2 border rounded text-sm"
      />
    </div>

    {/* Metal Type */}
    <div className="mb-4">
      <label className="font-medium text-sm block mb-1">Product Metal Type:</label>
      <input
        type="text"
        name="metalType"
        value={productData.metalType}
        onChange={handleInputChange}
        className="w-full p-2 border rounded text-sm"
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-between mt-6">
      <button
        onClick={handleUpdate}
        className="bg-[#4f3267] hover:bg-[#3e264e] text-white px-5 py-2 rounded-md font-semibold transition duration-200"
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold transition duration-200"
      >
        Delete
      </button>
    </div>
  </div>
</div>

  );
}

export default EditProductDetails;
