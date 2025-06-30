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
    try {
      const endpoint = `delete-${productType.toLowerCase()}`;
      await axios.delete(`https://backend-pbs-coo6.onrender.com/api/v1/products/${endpoint}`, {
        data: { id: product._id },
      });

      toast.success(`${productType} deleted successfully`);

      // Optionally update context (or use refreshData)
      onClose();
      refreshData && refreshData();

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      toast.error(`Failed to delete ${productType}`);
    }
  };

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update {productType}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="mb-2">
          <label className="font-semibold text-sm">Product ID:</label>
          <input
            type="text"
            value={product._id}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="font-semibold text-sm">Product Name:</label>
          <input
            type="text"
            name="ProductName"
            value={productData.ProductName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="font-semibold text-sm">Product Gender:</label>
          <input
            type="text"
            name="ProductGender"
            value={productData.ProductGender}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="font-semibold text-sm">Description:</label>
          <textarea
            name="ProductDescription"
            value={productData.ProductDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-sm">Price (₹):</label>
          <input
            type="number"
            name="ProductPrice"
            value={productData.ProductPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-[#4f3267] hover:bg-[#432a58] text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductDetails;
