import React from "react";
import "./product-main.scss";
import { withRouter } from "react-router-dom";
import { capitaliseFirstLetter } from "../../../utils/text-formatting/text-formatting";
import Accordion from "../../../components/accordion/accordion";
import "../../../components/accordion/accordion.scss";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";

class ProductMain extends React.Component {
  state = {
    index: 0,
    selectedSize: null,
    productFeatures: [],
  };

  componentDidMount = () => {
    this.setState({
      productFeatures: this.props.product.features
        ? [
            {
              title: "core features",
              content: this.props.product.features,
              open: false,
            },
            {
              title: "description",
              content: this.props.product.description,
              open: false,
            },
            {
              title: "delivery & returns",
              content: this.props.product.delivery,
              open: false,
            },
            {
              title: "care guide",
              content: this.props.product.care,
              open: false,
            },
          ]
        : null,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.productFeatures === null) {
      this.setState({
        productFeatures: [
          {
            title: "core features",
            content: this.props.product.features,
            open: false,
          },
          {
            title: "description",
            content: this.props.product.description,
            open: false,
          },
          {
            title: "delivery & returns",
            content: this.props.product.delivery,
            open: false,
          },
          {
            title: "care guide",
            content: this.props.product.care,
            open: false,
          },
        ],
      });
    }
  };

  handleVariantSelect = (index) => {
    this.props.handleVariantSelect(index);
  };

  handleSizeSelect = (size) => {
    if (this.state.selectedSize === size) {
      this.setState({
        selectedSize: null,
      });
    } else {
      this.setState({
        selectedSize: size,
      });
    }
  };

  handleToggle = (index) => {
    this.setState((prevState) => ({
      productFeatures: prevState.productFeatures.map((feature, i) => {
        if (index === i) {
          return {
            ...feature,
            open: !feature.open,
          };
        } else {
          return {
            ...feature,
            open: false,
          };
        }
      }),
    }));
  };

  handleAddToCart = () => {
    const product = {
      name: this.props.product.name,
      category: this.props.product.category,
      collection: this.props.product.collection,
      color: this.props.product.colors[this.props.variantIndex],
      id: this.props.match.params.id,
      image: this.props.product.variants[this.props.variantIndex].images[0].src,
      price: this.props.product.price,
      qty: 1,
      size: this.state.selectedSize,
    };
    this.props.addToCart(product, this.props.authenticated);
  };

  render() {
    const { product, variantIndex, totalReviews } = this.props;
    const { selectedSize, productFeatures } = this.state;
    if (product.colors === undefined || product.variants === undefined) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <div className="product-main">
          <h1 className="product-main__title">{product.name}</h1>
          <div className="product-main__rating">
            {this.props.displayRatingStars("light")}
            {
              <a
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              >
                ({totalReviews})
              </a>
            }
          </div>
          <p className="product-main__price">£{product.price}</p>
          <div className="product-main__variants-container">
            <span>STANDARD EDITION:</span> {""}
            <span>{capitaliseFirstLetter(product.colors[variantIndex])}</span>
            <div className="product-main__variants">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={
                    variantIndex === index
                      ? "product-main__variant active"
                      : "product-main__variant"
                  }
                >
                  <div
                    className={`product-main__variant-color product-main__variant-color--${color}`}
                    onClick={() => this.handleVariantSelect(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-main__variant-sizes-container">
            <span>SELECT SIZE:</span>
            <div className="product-main__variant-sizes">
              {product.variants[variantIndex].sizes &&
                product.variants[variantIndex].sizes.map((size, index) => (
                  <div
                    key={index}
                    onClick={() => this.handleSizeSelect(size.size)}
                    className={
                      selectedSize === size.size
                        ? "product-main__variant-size active"
                        : "product-main__variant-size"
                    }
                  >
                    <p>UK</p>
                    {size.size}
                  </div>
                ))}
            </div>
          </div>
          <div className="product-main__cart-container">
            <button
              onClick={this.handleAddToCart}
              disabled={selectedSize == null}
              className={
                selectedSize
                  ? "product-main__add-to-cart-btn"
                  : "product-main__add-to-cart-btn disabled "
              }
            >
              {selectedSize ? "ADD TO CART" : "SELECT SIZE"}
            </button>
            <div className="product-main__cart">
              <p className="">Free delivery and 30 day returns!</p>
            </div>
          </div>
          <div className="product-main__highlights-container">
            {product.highlights && (
              <h5>{product.name.toUpperCase()} HIGHLIGHTS</h5>
            )}
            <div className="product-main__highlights">
              {product.highlights &&
                product.highlights.map((highlight, index) => (
                  <div key={index} className="product-main__hightlight">
                    <img src={highlight.img} />
                    <p>{highlight.text}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="product-main__accordion-container">
            {productFeatures &&
              productFeatures.map((feature, index) => (
                <Accordion
                  key={index}
                  index={index}
                  feature={feature}
                  handleToggle={this.handleToggle}
                />
              ))}
            <button className="accordion__btn"></button>
          </div>
        </div>
      );
    }
  }
}

const mapActionsToProps = {
  addToCart,
};

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(ProductMain));
