import React from 'react';
import './product-list.scss';
import { connect } from 'react-redux';
import queryString from 'query-string';
import ProductListItem from '../product-list-item/product-list-item';
import Loading from '../../loading/loading';
import {
  getAllProducts,
  getCategoryProducts,
  getColorProducts,
} from '../../../redux/actions/productActions';

class ProductList extends React.Component {
  state = {
    collection: this.props.match.params.collection,
    category: this.props.match.params.category
      ? this.props.match.params.category
      : false,
    colors: this.props.location.search,
    parsedColors: [],
  };

  componentDidMount = () => {
    const { collection, category, colors } = this.state;
    const {
      getAllProducts,
      getCategoryProducts,
      getColorProducts,
    } = this.props;
    if (colors) {
      const parsedColors = queryString.parse(colors);
      this.setState({
        parsedColors: parsedColors.colors.split(','),
      });
      getColorProducts(collection, parsedColors.colors, category);
    } else {
      if (collection && category) {
        getCategoryProducts(collection, category);
      } else {
        getAllProducts(collection);
      }
    }
  };

  render() {
    const { parsedColors } = this.state;
    const { products, loading } = this.props;

    if (loading) return <Loading />;

    return (
      <div className='product-list'>
        {products &&
          products.map((product, index) => (
            <ProductListItem
              colorOptions={parsedColors}
              key={index}
              product={product}
            />
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
  getColorProducts,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductList);
