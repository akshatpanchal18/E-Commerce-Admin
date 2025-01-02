import { useContext } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContaxt";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { URL } = useAuth();
  const addProducts = async (formData, file) => {
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("description", formData.description);
    formdata.append("price", formData.price);
    formdata.append("stock", formData.stock);
    formdata.append("brand", formData.brand);
    formdata.append("category", formData.category);
    formdata.append("isFeatured", formData.featured);
    if (file) {
      formdata.append("image", file);
    }
    // console.log(formData,file);
    // for (let [key, value] of formdata.entries()) {
    //     console.log(key, value);
    //   }

    try {
      const res = await fetch(`${URL}/product/add-product`, {
        method: "POST",
        body: formdata,
        credentials: "include",
      });
      const result = await res.json();
      if (result.statusCode === 201) {
        return { success: true, data: result };
      }
    } catch (error) {
      return { success: false, data: error };
    }
  };
  const fetchProducts = async (page) => {
    const productsPerPage = 12;
    try {
      const res = await fetch(
        `${URL}/product/products?page=${page}&limit=${productsPerPage}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      if (result.statusCode === 200) {
        return { success: true, data: result.data };
      }
    } catch (error) {
      return { success: false, data: error };
    }
  };
  const updateProduct = async (payload) => {
    console.log(payload);

    try {
      const res = await fetch(`${URL}/product/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const result = await res.json();
      if (result.statusCode === 200) {
        return { success: true, data: result.data };
      }
    } catch (error) {
      return { success: false, data: error };
    }
  };
  const deleteProduct = async (product) => {
    // console.log(product);
    // console.log(product._id);

    try {
      const res = await fetch(`${URL}/product/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: product._id }),
        credentials: "include",
      });
      const result = await res.json();
      if (result.statusCode === 200) {
        return { success: true, data: result.data };
      }
    } catch (error) {
      return { success: false, data: error };
    }
  };
  const ProductDetails = async (id) => {
    const res = await fetch(`${URL}/product/all-products/product/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    // console.log(result.data);
    if (result.statusCode === 200) {
      return { success: true, data: result.data };
    }
  };
  return (
    <ProductContext.Provider
      value={{ fetchProducts, addProducts, updateProduct, deleteProduct,ProductDetails }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductAdmin = () => useContext(ProductContext);
