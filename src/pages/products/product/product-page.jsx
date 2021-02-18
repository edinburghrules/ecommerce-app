import React from "react";
import "./product-page.scss";
import ProductMain from "../../../components/products/product/product-main";
import Loading from "../../../components/loading/loading";
import { connect } from "react-redux";
import {
  getAllProducts,
  getProduct,
} from "../../../redux/actions/productActions";

class ProductPage extends React.Component {
  state = {
    index: 0,
  };

  componentDidMount = () => {
    this.props.getProduct(
      this.props.match.params.collection,
      this.props.match.params.id
    );
    this.setState({
      index: this.props.location.state.variantIndex,
    });
  };

  handleVariantSelect = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const { product } = this.props;
    return (
      <React.Fragment>
        {this.props.loading && <Loading />}
        {this.props.product && (
          <div className="product-page">
            <div className="product-page__left-column">
              {product.variants &&
                product.variants[
                  this.state.index
                ].images.map((image, index) => (
                  <img
                    key={index}
                    className="product-page__img"
                    src={image}
                    alt={product.name}
                  />
                ))}
            </div>
            <div className="product-page__right-column">
              <ProductMain
                handleVariantSelect={this.handleVariantSelect}
                variantIndex={this.state.index}
                product={this.props.product}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product,
  loading: state.async.loadingProducts,
});

const mapActionsToProps = {
  getAllProducts,
  getProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductPage);
