import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useProductAdmin } from "../Context/ProductContext";

const EditProductModal = ({ product, isOpen, onClose, onUpdate }) => {
  const { updateProduct } = useProductAdmin();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setStock(product.stock || "");
      setIsFeatured(product.isFeatured || false);
      setCategory(product.category || "");
      setBrand(product.brand || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      _id: product._id,
      name,
      price,
      stock,
      isFeatured,
      category,
      brand,
    };

    updateProduct(payload).then((res) => {
      if (res.success) {
        onUpdate();
        onClose();
      } else {
        console.log(res.data);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-70">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Edit Product
          </h2>
          <div className="flex flex-col items-center mb-4">
            <p className="text-sm">
              <strong>ID:</strong> {product._id}
            </p>
            <p className="text-sm">
              <strong>Name:</strong> {product.name}
            </p>
            <img
              src={product.image}
              alt=""
              className="w-24 h-24 object-cover rounded-md mt-2"
            />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Brand:</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Stock:</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || "")}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm">Featured</label>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
