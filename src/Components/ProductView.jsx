import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useProductAdmin } from "../Context/ProductContext";
import { FaArrowLeft } from "react-icons/fa6";
import { Amount } from "../Helpers/helper";

function SingleProduct() {
  const { ProductDetails } = useProductAdmin();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    ProductDetails(id).then((res) => {
      if (res.success) {
        setProduct(res.data);
      }
    });
  }, []);

  if (!product) {
    return (
      // <div className="text-center text-lg text-gray-600">Product not found</div>
      <div class="progress"></div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <NavLink
        onClick={() => window.history.back()} // Navigates to the previous page
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition mb-6 cursor-pointer"
      >
        <FaArrowLeft className="text-lg" />
        <span className="text-lg font-semibold">Back</span>
      </NavLink>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-1/2 max-w-md h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h2>
          <strong className="text-xl text-blue-600">
            <Amount amount={product.price} />
            /-
          </strong>
          <p className="text-gray-600">{product.description}</p>

          <p className="text-gray-700">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Stock:</span>{" "}
            <span
              className={`px-2 py-1 rounded-lg text-white font-semibold ${
                product.stock > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
