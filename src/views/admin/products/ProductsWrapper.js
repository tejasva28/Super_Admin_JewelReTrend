// src/components/products/ProductsWrapper.js

import React from 'react';
import { ProductProvider } from './ProductContext';
import Products from './index'; // Ensure this path points to the correct file

const ProductsWrapper = () => {
  return (
    <ProductProvider>
      <Products />
      {/* Include other components that consume ProductContext here */}
      {/* For example: <ProductDetails /> */}
    </ProductProvider>
  );
};

export default ProductsWrapper;
