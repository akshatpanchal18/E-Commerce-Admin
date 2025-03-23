import React, { useEffect, useState } from "react";
import { useProductAdmin } from "../Context/ProductContext";

function DashBoardProducts() {
  const { fetchProducts } = useProductAdmin();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then((res) => {
      if (res.success) {
        setProducts(res.data.products || []);
        // console.log(res.data.products);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Trending Products
      </h2>
      {isLoading && <div className="progress"></div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-xl p-2 shadow-lg bg-white hover:shadow-xl transition-all flex flex-col items-center text-center"
          >
            {/* Product Image */}
            <div className="w-40 h-40">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoardProducts;
