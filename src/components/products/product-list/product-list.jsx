import React from 'react';
import ProductListItem from '../product-list-item/product-list-item';
import './product-list.scss';

const ProductList = ({ products }) => {
  return (
    <div className='product-list'>
      {products &&
        products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
