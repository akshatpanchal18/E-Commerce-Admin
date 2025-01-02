import React, { useState } from "react";
import styled from "styled-components";
import { FaRegImage } from "react-icons/fa6";
import { useAuth } from "../Contaxt/AuthContaxt";
import { IoLogOutOutline } from "react-icons/io5";
import { useProductAdmin } from "../Contaxt/ProductContext";
import Popup from "./Popup";

function AddProductDetails() {
  const { addProducts } = useProductAdmin();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(null);
  const [msg,setMsg]=useState('')
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
        setImage(reader.result); // Set the base64 image URL for preview
      };
      reader.readAsDataURL(selectedfile);
      // console.log(file);
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
  // const formdata = new FormData()
  // formdata.append("name", formData.name);
  // formdata.append("description", formData.description);
  // formdata.append("price", formData.price);
  // formdata.append("stock", formData.stock);
  // formdata.append("brand", formData.brand);
  // formdata.append("category", formData.category);
  // formdata.append("isFeatured", formData.featured);
  // formdata.append("image",file)

  const handleSubmit = async (e) => {
    e.preventDefault();

    addProducts(formData, file).then((res) => {
      if (res.success) {
        setIsSuccess(true)
        setMsg('Product Added Successfully')
        setTimeout(() => {
          setIsSuccess(false);
        },2000);
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
        
      }else{
        console.log(res.data);
      }
    });
  };

  return (
    <Wrapper>
      {isSuccess ? (
        <>
          {/* <p style={{ textAlign: "center", fontSize: "1rem" }}>
            Product Added Successfully
          </p> */}
          <Popup message={msg}/>
        </>
      ) : (
        <>{isError}</>
      )}
      <div className="add-image-container">
        <h2>Add Image</h2>
        <div className="image-preview">
          {image ? (
            <>
              <img src={image} alt="Preview" className="preview" />
              <button className="remove-btn" onClick={handleRemoveImage}>
                Remove Image
              </button>
            </>
          ) : (
            <label htmlFor="file-upload" className="upload-label">
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
              <div className="img-flex">
                <FaRegImage className="icon" />
                <span>Click to Upload</span>
              </div>
            </label>
          )}
        </div>
      </div>
      <div className="form-container">
        <form className="form-layout">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input
                id="description"
                type="text"
                name="description"
                className="form-input"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter brand"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter price"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter category"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter stock"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group form-checkbox-container">
              <label className="form-label">Is Featured</label>
              <input
                type="checkbox"
                className="form-checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" className="form-button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .add-image-container {
    width: 100%;
    max-width: 400px;
    margin: 5px auto;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: #f9f9f9;
  }

  .add-image-container h2 {
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
  }

  .image-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    padding: 0.5rem;
  }

  .image-preview img.preview {
    max-width: 100%;
    max-height: 80%;
    object-fit: cover;
    border-radius: 8px;
  }

  .upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    color: #555;
    font-size: 16px;
  }

  .img-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    font-size: 3rem;
  }

  .upload-label:hover {
    color: #333;
  }

  .remove-btn {
    margin-top: 10px;
    padding: 4px 6px;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .remove-btn:hover {
    background-color: #c0392b;
  }
  /* ProductForm.css */
  .form-container {
    width: 700px;
    margin: 0 auto;
    padding: 16px;
    //   background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    text-align: center;
  }

  .form-layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .form-group {
    flex: 1;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
  }

  .form-checkbox-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .form-checkbox {
    width: 16px;
    height: 16px;
  }

  .form-button {
    max-width: 50%;
    margin: 0 auto;
    padding: 8px;
    // background-color: #2c3e50;
    background-color: #2c4e41;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
  }

  .form-button:hover {
    // background-color: #0056b3;
    background-color: rgb(31, 53, 45);
  }
`;
export default AddProductDetails;
