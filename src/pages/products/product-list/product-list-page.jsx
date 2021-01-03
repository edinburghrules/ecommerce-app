import React from 'react';
import { connect } from 'react-redux';
import ProductList from '../../../components/products/product-list/product-list';
import './product-list-page.scss';

class ProductListPage extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <div className='product-list-page'>
        <div className='filters'>FILTERS</div>
        <ProductList products={products} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.productsList,
});

export default connect(mapStateToProps)(ProductListPage);
