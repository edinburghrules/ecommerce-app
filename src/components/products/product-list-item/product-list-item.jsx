import React from "react";
import "./product-list-item.scss";
import { Link, withRouter } from "react-router-dom";
import Variants from "./variants";
import Favourite from "./favourite";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";

class ProductListItem extends React.Component {
  state = {
    variantIndex: 0,
    colors: false,
    colorIndex: 0,
  };

  // loop through this.state.colors ->

  componentDidMount = () => {
    this.setState(
      {
        colors: this.props.colorOptions,
      },
      () => {
        if (this.state.colors) {
          const firstMatchIndex = this.props.product.variants.findIndex(
            (variant) =>
              variant.color === this.state.colors[this.state.colors.length - 1]
          );
          if (firstMatchIndex > -1) {
            this.setState((prevState) => {
              return {
                colorIndex: firstMatchIndex,
              };
            });
          } else {
            const matchIndex = this.props.product.variants.findIndex(
              (variant) => {
                return (
                  variant.color ===
                  this.props.colorOptions[this.props.colorOptions.length - 2]
                );
              }
            );

            this.setState({
              colorIndex:
                matchIndex > -1
                  ? matchIndex
                  : this.props.product.variants.findIndex((variant) =>
                      this.props.colorOptions.includes(variant.color)
                    ),
            });
          }
        }
      }
    );
  };

  // Select variant if color filter applied or not
  handleVariantSelect = (index) => {
    if (this.state.colors) {
      this.setState({
        colorIndex: index,
      });
    } else {
      this.setState({
        variantIndex: index,
      });
    }
  };

  quickAdd = (variant, size) => {
    const product = {
      name: this.props.product.name,
      category: this.props.product.category,
      collection: this.props.product.collection,
      color: variant.color,
      id: this.props.product.id,
      image: variant.images[0].src,
      price: this.props.product.price,
      qty: 1,
      size: size,
    };
    this.props.addToCart(product, this.props.authenticated);
  };

  render() {
    const { variantIndex, colorIndex, colors } = this.state;
    const {
      product: { name, price, variants, id, category, collection },
    } = this.props;

    const renderBy = colors ? colorIndex : variantIndex;

    if (variants.length === 0 || this.state.variantIndex === undefined)
      return <h1>Loading</h1>;

    return (
      <div className="product-list-item">
        <div className="product-list-item__content">
          <Link
            to={{
              pathname: `/collection/${collection}/${category}/product/${id}`,
              state: {
                variantIndex: this.state.colors ? colorIndex : variantIndex,
                prevPath: this.props.location.pathname,
              },
            }}
          >
            <img
              className="product-list-item__main-img"
              src={
                colors
                  ? variants[colorIndex].images[0].src
                  : variants[variantIndex].images[0].src
              }
              alt="shoe"
            />
          </Link>
          <div className="product-list-item__content-header">
            <Link
              to={`/${collection}/product/${id}`}
              className="product-list-item__title"
            >
              {name}
            </Link>
          </div>
          <p className="product-list-item__variant">
            {colors ? variants[colorIndex].color : variants[variantIndex].color}
          </p>
          <p className="product-list-item__price">£{price}</p>
          <div className="product-list-item__variants">
            {variants &&
              variants.map((variant, index) => {
                if (colors && colors.includes(variant.color)) {
                  return (
                    <React.Fragment key={index}>
                      <Favourite
                        product={{ id, name, price, category, collection }}
                        variant={variant}
                        isSelected={colorIndex === index}
                      />
                      <img
                        className={
                          colors && colorIndex === index
                            ? "product-list-item__variant-img--active"
                            : "product-list-item__variant-img"
                        }
                        onClick={() => this.handleVariantSelect(index)}
                        src={variant.images[0].src}
                        alt={`${variant.name}-${variant.color}`}
                      />
                      {/* <Variants
                        key={index}
                        renderBy={renderBy}
                        variant={variant}
                        index={index}
                      /> */}
                    </React.Fragment>
                  );
                } else if (!colors) {
                  return (
                    <div>
                      <div key={index}>
                        <Favourite
                          product={{ id, name, price, category, collection }}
                          variant={variant}
                          isSelected={variantIndex === index}
                        />
                        <img
                          className={
                            variantIndex === index
                              ? "product-list-item__variant-img--active"
                              : "product-list-item__variant-img"
                          }
                          onClick={() => this.handleVariantSelect(index)}
                          src={variant.images[0].src}
                          alt={`${variant.name}-${variant.color}`}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div>
            <Variants
              product={this.props.product}
              renderBy={renderBy}
              variant={this.state.variantIndex}
              variants={variants}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
});

const mapActionsToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(ProductListItem));
