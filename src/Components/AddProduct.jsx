import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import Popup from "../Helpers/Popup";
import { useProductAdmin } from "../Context/ProductContext";
import { LuImagePlus } from "react-icons/lu";

function AddProductDetails() {
  const { addProducts } = useProductAdmin();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    featured: false,
  });

  const handleImageChange = (e) => {
    const selectedfile = e.target.files[0];
    if (selectedfile) {
      setFile(selectedfile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedfile);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProducts(formData, file).then((res) => {
      if (res.success) {
        setIsSuccess(true);
        setMsg("Product Added Successfully");
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          brand: "",
          category: "",
          featured: false,
        });
        setImage(null);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-md">
      {isSuccess && <Popup message={msg} />}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold">Add Products</h2>
        <div className="flex flex-col items-center justify-center border-3 border-dashed border-gray-300 p-4 rounded-md h-56">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md"
              />
              <button
                className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
              {/* <FaRegImage className="text-4xl text-gray-400" /> */}
              <LuImagePlus fontSize={80} className=" text-gray-500" />
              <span className="text-lg text-gray-500">Click to Upload</span>
            </label>
          )}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded w-full"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded w-full"
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded w-full"
            type="text"
            placeholder="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded w-full"
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded w-full"
            type="text"
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
          <input
            className="border p-2 rounded w-full"
            type="number"
            placeholder="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="text-sm">
            Is Featured
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProductDetails;
