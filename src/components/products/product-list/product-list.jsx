import React from "react";
import "./product-list.scss";
import { connect } from "react-redux";
import queryString from "query-string";
import ProductListItem from "../product-list-item/product-list-item";
import Loading from "../../loading/loading";
import {
  getAllProducts,
  getCategoryProducts,
  getFilteredProducts,
} from "../../../redux/actions/productActions";
import { getFavouriteProducts } from "../../../redux/actions/favouriteActions";

class ProductList extends React.Component {
  state = {
    collection: null,
    category: null,
    colors: null,
    bestFor: null,
    weather: null,
    sort: null,
  };

  componentDidMount = () => {
    this.setState(
      {
        collection: this.props.match.params.collection,
        category: this.props.match.params.category || null,
        colors: queryString.parse(this.props.location.search).colors || null,
        bestFor: queryString.parse(this.props.location.search).bestfor || null,
        weather: queryString.parse(this.props.location.search).weather || null,
        sort: queryString.parse(this.props.location.search).sort || null,
      },
      () => {
        const {
          collection,
          category,
          colors,
          bestFor,
          weather,
          sort,
        } = this.state;
        const { authenticated, getFavouriteProducts } = this.props;

        const {
          getAllProducts,
          getCategoryProducts,
          getFilteredProducts,
        } = this.props;

        window.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });

        if (authenticated) {
          getFavouriteProducts();
        }

        if (colors || bestFor || weather) {
          getFilteredProducts(
            collection,
            colors,
            bestFor,
            weather,
            category,
            sort
          );
        } else {
          if (collection && category) {
            getCategoryProducts(collection, category, sort);
          } else {
            getAllProducts(collection, sort);
          }
        }
      }
    );
  };

  // Only run when authenticated is still false after page refresh
  componentDidUpdate = (prevProps, prevState) => {
    const { authenticated, getFavouriteProducts } = this.props;
    if (!prevProps.authenticated && authenticated) {
      getFavouriteProducts();
    }
  };

  render() {
    const { colors } = this.state;
    const { products, loading } = this.props;

    if (loading) return <Loading />;

    return (
      <React.Fragment>
        <div className="product-list">
          {products &&
            products.map((product, index) => (
              <ProductListItem
                colorOptions={colors && colors.split(",")}
                key={index}
                product={product}
              />
            ))}
        </div>
      </React.Fragment>
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
