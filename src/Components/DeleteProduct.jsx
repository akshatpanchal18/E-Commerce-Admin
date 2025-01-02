import React from "react";
import styled from "styled-components";
import { useAuth } from "../Contaxt/AuthContaxt";
import { useProductAdmin } from "../Contaxt/ProductContext";

const DeleteProductModal = ({ product, isOpen, onClose, onDelete }) => {
  const { URL } = useAuth();
  const { deleteProduct } = useProductAdmin();
  const handleDelete = async () => {
    deleteProduct(product)
    .then((res) => {
      if (res.success) {
        onDelete(); // Call onDelete to refresh the product list
        onClose();
      } else {
        console.log(res.data);
      }
    });
    // try {
    //   // Make API call to delete product
    //   const res = await fetch(`${URL}/product/delete`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ _id: product._id }),
    //     credentials: 'include',
    //   });

    //   const result = await res.json();
    //   if (result.statusCode === 200) {
    //     onDelete(); // Call onDelete to refresh the product list
    //     onClose(); // Close the modal
    //   } else {
    //     alert('Failed to delete the product. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error deleting product:', error);
    // }
  };

  if (!isOpen) return null; // Don't render anything if not open

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete the following product?</p>
        <img src={product.image} alt="" />
        <p>
          <strong>ID:</strong> {product._id}
        </p>
        <p>
          <strong>Name:</strong> {product.name}
        </p>
        <p>
          <strong>Price:</strong> {product.price}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <ButtonContainer>
          <button onClick={handleDelete} className="delete">
            Delete
          </button>
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  img {
    width: 100px;
    object-fit: cover;
  }
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;

  h2 {
    margin-bottom: 15px;
    color: #333;
  }

  p {
    margin-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .delete {
    background-color: #dc3545;
    color: white;
  }

  .delete:hover {
    background-color: #c82333;
  }

  .cancel {
    background-color: #6c757d;
    color: white;
  }

  .cancel:hover {
    background-color: #5a6268;
  }
`;

export default DeleteProductModal;
