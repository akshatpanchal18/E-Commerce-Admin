import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {NavLink, useParams} from 'react-router-dom'
import { useProductAdmin } from '../Contaxt/ProductContext'
import { FaArrowLeft } from 'react-icons/fa6'
import Amount from '../Helper/Amount'

function SingleProduct() {
    const {ProductDetails}=useProductAdmin()
    const [product,setProduct]=useState(null)
    const { id } = useParams();
    useEffect(()=>{
        ProductDetails(id).then((res)=>{
      if(res.success){
        // console.log(res.data);
        setProduct(res.data)
      }
        })
      },[])
      if (!product) {
        return <div>Product not found</div>; // Handle case where product is not found
      }
  return (
    <div><Container>
      <NavLink to="/all-products">
        <FaArrowLeft />
      </NavLink>
      <ImageContainer>
        <img src={product.image} alt={product.name} />
      </ImageContainer>
      <Content>
        <Data>
          <h2>{product.name}</h2>
          <strong><Amount amount={product.price}/>/-</strong>
          <p>{product.description}</p>
          <p>
            Brand:<strong>{product.brand}</strong>
          </p>
          <p>
            Category:<strong>{product.category}</strong>
          </p>
          <p>
            Stock:<strong>{product.stock}</strong>
          </p>
          
        </Data>
      </Content>
    </Container></div>
  )
}
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  // border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  a {
    color: black;
    font-size: 1.7rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
    max-width: 500px;
    margin: 3rem auto;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      margin: 0;
      max-height: 300px;
      object-fit: contain;
    }
    @media (max-width: 768px) {
      padding: 0 3rem;
    }
  }
`;

const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const Data = styled.div`
  h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }

  strong {
    font-size: 18px;
    color: #555;
  }

  p,
  .p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export default SingleProduct