import React from 'react';
import './product-list.scss';
import { connect } from 'react-redux';
import ProductListItem from '../product-list-item/product-list-item';
import Loading from '../../loading/loading';
import {
  getAllProducts,
  getCategoryProducts,
} from '../../../redux/actions/productActions';

class ProductList extends React.Component {
  state = {
    collection: this.props.match.params.collection,
    category: this.props.match.params.category,
  };

  componentDidMount = () => {
    const { collection, category } = this.state;
    const { getAllProducts, getCategoryProducts } = this.props;
    if (collection && category) {
      getCategoryProducts(collection, category);
    } else {
      getAllProducts(collection);
    }
  };

  render() {
    const { products, loading } = this.props;

    if (loading) return <Loading />;

    return (
      <div className='product-list'>
        {products &&
          products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.productsList,
    loading: state.async.loadingProducts,
  };
};

const mapActionsToProps = {
  getAllProducts,
  getCategoryProducts,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductList);
