import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../Contaxt/AuthContaxt";
import { FaTriangleExclamation } from "react-icons/fa6";
import Pagination from "./Pagination";
import EditProductModal from "./EditProduct";
import DeleteProductModal from "./DeleteProduct";
import { useProductAdmin } from "../Contaxt/ProductContext";
import Amount from "../Helper/Amount";

function ViewAllProducts() {
  const { isAuthenticated, URL } = useAuth();
  const { fetchProducts } = useProductAdmin();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    const authToken = localStorage.getItem("isAuth") === "true";
    setIsLoggedIn(isAuthenticated || authToken);
  }, [isAuthenticated]);
  useEffect(() => {
    fetchProducts(currentPage).then((res) => {
      if (res.success) {
        setProducts(res.data.products || []);
        setTotalPages(res.data.pagination.totalPages);
        setTotalProducts(res.data.pagination.totalProducts);
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
    console.log(product);

    setIsModalOpen(true);
  };
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const refreshProducts = () => {
    fetchProducts(currentPage); // Refresh the product list
  };
  return (
    <>
      <Wrapper>
        {isLoggedIn ? (
          <>
            <h1>All Products ({totalProducts})</h1>
            <div className="product-list">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                    <div className="product-card" key={product._id}>
                      <NavLink to={`/all-products/${product._id}`} >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <h2 className="product-name">
                      {truncateText(product.name, 10)}
                    </h2>
                    <p className="product-price">
                      <Amount amount={product.price} />
                    </p>
                    </NavLink>
                    <div className="button-container">
                      <button
                        className="edit-button"
                        onClick={() => openModal(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          handleDeleteClick(product);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrevious={handlePrevPage}
            />
            <EditProductModal
              product={selectedProduct}
              isOpen={isModalOpen}
              onClose={closeModal}
              onUpdate={refreshProducts} // Refresh products after updating
            />
            <DeleteProductModal
              product={selectedProduct}
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={refreshProducts} // Refresh the product list after deletion
            />
          </>
        ) : (
          <>
            <h1
              style={{
                textAlign: "center",
                fontSize: "3rem",
                color: "#992234",
              }}
            >
              <FaTriangleExclamation /> Access Denied !!!!
            </h1>
          </>
        )}
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  max-width: 1200px; /* Limit the width of the container */
  margin: 0 auto; /* Center the container */
  padding: 10px; /* Add some padding */
  max-height: 100vh;
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    overflow-y: auto; /* Allow vertical scrolling if needed */
    max-height: 80vh; /* Limit the height of the product list */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margin */
    a{
    text-decoration:none;
    color:#254336;
    }
    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #3b4f46;
      /* border-radius: 10px;  */
    }

    &::-webkit-scrollbar-track {
      background: rgb(221, 234, 228);
    }
  }

  .product-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column; /* Arrange items in a column */
    justify-content: space-between; /* Space items evenly */
    height: 300px; /* Set a fixed height for consistency */

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .product-image {
    width: 100%;
    height: 150px; /* Fixed height for images */
    object-fit: cover;
    // object-fit: contain;
    border-radius: 8px;
  }

  .product-name {
    font-size: 18px;
    font-weight: bold;
    margin: 8px 0;
    flex-grow: 1; /* Allow name to take remaining space */
  }

  .product-price {
    color: #555;
    margin: 4px 0 12px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }

  .edit-button,
  .delete-button {
    // background-color: #283747;
    background-color: #2c4e41;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .edit-button:hover {
    // background-color: #0056b3;
    background-color: rgb(31, 53, 45);
  }

  .delete-button {
    // background-color: #914a49;
    background-color: #914a49;
  }

  .delete-button:hover {
    // background-color: #c82333;
    background-color: #c82333;
  }
`;

export default ViewAllProducts;
