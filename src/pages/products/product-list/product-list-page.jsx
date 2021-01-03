import React from 'react';
import './product-list-page.scss';
import { connect } from 'react-redux';
import FilterCategories from '../../../components/fiter-categories/filter-categories';
import Filters from '../../../components/filters/filters.jsx';
import ProductList from '../../../components/products/product-list/product-list';
import { mensShoeLinks } from '../../../navigation-links/navigation-links';

class ProductListPage extends React.Component {
  render() {
    const {
      products,
      match: { params },
    } = this.props;
    let options;
    if (params.collection === 'mens-shoes') {
      options = mensShoeLinks;
    }
    return (
      <div className='product-list-page'>
        <div className='product-list-page__filters'>
          <FilterCategories options={options} />
          <Filters />
        </div>
        <ProductList products={products} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.productsList,
});

export default connect(mapStateToProps)(ProductListPage);
