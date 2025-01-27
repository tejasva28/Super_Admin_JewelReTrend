// src/components/products/ProductContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading states
  const [error, setError] = useState(null); // For handling errors

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Debugging: Log API Base URL
  console.log('API_BASE_URL:', API_BASE_URL);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const response = await axios.get(`${API_BASE_URL}/admin/products`);
        console.log('Products fetched:', response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_BASE_URL]);

  // Approve a product
  const approveProduct = async (id) => {
    try {
      console.log(`Approving product with ID: ${id}`);
      await axios.put(`${API_BASE_URL}/admin/products/${id}/approve`);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, approved: true, status: 'live' } : product
        )
      );
    } catch (err) {
      console.error('Error approving product:', err);
      setError('Failed to approve product.');
    }
  };

  // Reject a product
  const rejectProduct = async (id) => {
    try {
      console.log(`Rejecting product with ID: ${id}`);
      await axios.delete(`${API_BASE_URL}/admin/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      console.error('Error rejecting product:', err);
      setError('Failed to reject product.');
    }
  };

  // Update a product (e.g., in ProductDetails)
  const updateProduct = async (updatedProduct) => {
    try {
      console.log(`Updating product with ID: ${updatedProduct.id}`);
      const response = await axios.put(`${API_BASE_URL}/admin/products/${updatedProduct.id}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? response.data : product
        )
      );
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product.');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        approveProduct,
        rejectProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
