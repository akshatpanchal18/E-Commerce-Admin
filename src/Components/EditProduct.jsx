import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../Contaxt/AuthContaxt';
import { useProductAdmin } from '../Contaxt/ProductContext';

const EditProductModal = ({ product, isOpen, onClose, onUpdate }) => {
  // console.log(product);
  const {URL}=useAuth()
const {updateProduct}=useProductAdmin()
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (product) {
      setName('');
      setPrice('');
      setImage('');
      setStock(''); // Set initial stock value
      setIsFeatured(product.isFeatured || false); // Set initial featured status
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the payload
    const payload = {
      _id: product._id,
      name,
      price,
      image,
      stock,
      isFeatured,
    };
updateProduct(payload).then((res)=>{
if(res.success){
  onUpdate(); // Call onUpdate to refresh the product list
      onClose();
}else{
  console.log(res.data);
  
}
})
    // Make API call to update product
    // const res = await fetch(`${URL}/product/update`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    //   credentials: 'include',
    // });

    // const result = await res.json();
    // if (result.statusCode === 200) {
    //   onUpdate(); // Call onUpdate to refresh the product list
    //   onClose(); // Close the modal
    // }
  };

  if (!isOpen) return null; // Don't render anything if not open

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Edit Product</h2>
        <div className='info'>
        <p><strong>ID:</strong> {product._id}</p>
        <p><strong>Name:</strong> {product.name}</p>
        <img src={product.image} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label>
              Stock:
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || '')}
                
              />
            </label>
          </div>
          {/* <div>
            <label>
              Image URL:
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </label>
          </div> */}
          <div>
            <label>
              Featured:
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
            </label>
          </div>
          <ButtonContainer>
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </ButtonContainer>
        </form>
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  .info{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  }
img{
width:100px;
object-fit:cover;
}
  h2 {
    margin-bottom: 15px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 10px;
  }

  input {
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button[type="submit"] {
    background-color: #007bff;
    color: white;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }

  button[type="button"] {
    background-color: #dc3545;
    color: white;
  }

  button[type="button"]:hover {
    background-color: #c82333;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EditProductModal;
