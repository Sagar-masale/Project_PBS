import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function EditProductDetails({ ring, onClose, refreshData  }) {
  const [ringData, setRingData] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductPrice: "",
  });

  useEffect(() => {
    if (ring) {
      setRingData({
        ProductName: ring.ProductName,
        ProductDescription: ring.ProductDescription,
        ProductPrice: ring.ProductPrice,
      });
    }
  }, [ring]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete("https://backend-pbs-coo6.onrender.com/api/v1/products/delete-ring", {
        data: { id: ring._id },
      });
      toast.success("Ring deleted successfully");
      onClose();
      refreshData && refreshData();
    } catch (error) {
      toast.error("Failed to delete ring");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("https://backend-pbs-coo6.onrender.com/api/v1/products/update-ring", {
        id: ring._id,
        ...ringData,
      });
toast.success("Product updated successfully");
refreshData(); // <-- call this
onClose(); // <-- then close the modal

    } catch (err) {
      toast.error("Failed to update ring");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Ring Admin Options</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="mb-2">
          <label className="font-semibold text-sm">Ring ID:</label>
          <input
            type="text"
            value={ring._id}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="font-semibold text-sm">Product Name:</label>
          <input
            type="text"
            name="ProductName"
            value={ringData.ProductName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

         <div className="mb-2">
          <label className="font-semibold text-sm">Product Gender:</label>
          <input
            type="text"
            name="ProductGender"
            value={ringData.ProductGender}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="mb-2">
          <label className="font-semibold text-sm">Description:</label>
          <textarea
            name="ProductDescription"
            value={ringData.ProductDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        

        <div className="mb-4">
          <label className="font-semibold text-sm">Price (₹):</label>
          <input
            type="number"
            name="ProductPrice"
            value={ringData.ProductPrice}
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
