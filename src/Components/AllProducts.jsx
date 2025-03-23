import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import Pagination from "../Helpers/Pagination.jsx";
import { useProductAdmin } from "../Context/ProductContext.jsx";
import EditProductModal from "./EditProduct.jsx";
import DeleteProductModal from "./DeleteProduct.jsx";
import Popup from "../Helpers/Popup.jsx";

function AllProducts() {
  const { fetchProducts } = useProductAdmin();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showPopup, setShowpopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [popupBg, setPopupBg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchProducts(currentPage).then((res) => {
      if (res.success) {
        setProducts(res.data.products || []);
        setTotalPages(res.data.pagination.totalPages);
        setTotalProducts(res.data.pagination.totalProducts);
        setIsLoading(false);
      }
    });
  }, [currentPage]);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setPopupMsg("Product Updated Successfully");
    setPopupBg("bg-green-200 text-black");
    setShowpopup(true);
    setTimeout(() => {
      setShowpopup(false);
    }, 3000);
    setSelectedProduct(null);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPopupMsg("Product Deleted Successfully");
    setPopupBg("bg-red-500 text-white");
    setShowpopup(true);
    setTimeout(() => {
      setShowpopup(false);
    }, 3000);
    setSelectedProduct(null);
  };
  const refreshProducts = () => {
    fetchProducts(currentPage); // Refresh the product list
    console.log("fetching products", currentPage);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        {showPopup && (
          <Popup
            message={popupMsg}
            className={popupBg}
            popUpClose={() => setShowpopup(false)}
          />
        )}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Our Products({totalProducts})
        </h1>
        {isLoading && <div class="progress"></div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClose={closeModal}
              onDelete={handleDeleteClick}
              onEdit={openModal}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePrevPage}
          onPageChange={setCurrentPage}
        />
        <EditProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={refreshProducts}
        />
        <DeleteProductModal
          product={selectedProduct}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={refreshProducts} // Refresh the product list after deletion
        />
      </div>
    </>
  );
}

export default AllProducts;
