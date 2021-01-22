import React from 'react';
import './product-list.scss';
import { connect } from 'react-redux';
import queryString from 'query-string';
import ProductListItem from '../product-list-item/product-list-item';
import Loading from '../../loading/loading';
import {
  getAllProducts,
  getCategoryProducts,
  getFilteredProducts,
} from '../../../redux/actions/productActions';
import { getFavouriteProducts } from '../../../redux/actions/favouriteActions';

class ProductList extends React.Component {
  state = {
    collection: this.props.match.params.collection,
    category: this.props.match.params.category
      ? this.props.match.params.category
      : false,
    colors: this.props.location.search
      ? queryString.parse(this.props.location.search).colors
      : '',
    bestFor: this.props.location.search
      ? queryString.parse(this.props.location.search).bestfor
      : '',
  };

  componentDidMount = () => {
    const { collection, category, colors, bestFor } = this.state;
    const {
      getAllProducts,
      getCategoryProducts,
      getFilteredProducts,
    } = this.props;

    if (this.props.authenticated) {
      this.props.getFavouriteProducts();
    }

    if (colors || bestFor) {
      getFilteredProducts(collection, colors, bestFor, category);
    } else {
      if (collection && category) {
        getCategoryProducts(collection, category);
      } else {
        getAllProducts(collection);
      }
    }
  };

  // Only run when authenticated is still false after page refresh
  componentDidUpdate = (prevProps) => {
    if (prevProps.authenticated === false && this.props.authenticated) {
      this.props.getFavouriteProducts();
    }
  };

  render() {
    const { colors } = this.state;
    const { products, loading } = this.props;

    if (loading) return <Loading />;

    return (
      <div className='product-list'>
        {products &&
          products.map((product, index) => (
            <ProductListItem
              colorOptions={colors && colors.split(',')}
              key={index}
              product={product}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  products: state.products.productsList,
  loading: state.async.loadingProducts,
});

const mapActionsToProps = {
  getAllProducts,
  getCategoryProducts,
  getFilteredProducts,
  getFavouriteProducts,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductList);
