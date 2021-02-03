import React from "react";
import "./product-list-item.scss";
import Favourite from "./favourite";

class ProductListItem extends React.Component {
  state = {
    variantIndex: 0,
    colors: this.props.colorOptions ? this.props.colorOptions : false,
    colorIndex: 0,
  };

  
  componentDidMount = () => {
    if (this.state.colors.length > 0) {
      // Create color index to show selected color image and details
      const colorIndex = this.props.product.variants.findIndex((variant) => {
        return (
          variant.color === this.state.colors[this.state.colors.length - 1]
        );
      });
      this.setState({
        colorIndex,
      });
    }
  };

  // Select variant if color filter applied or not
  handleVariantSelect = (index) => {
    if (this.state.colors.length > 0) {
      this.setState({
        colorIndex: index,
      });
    } else {
      this.setState({
        variantIndex: index,
      });
    }
  };

  render() {
    const { variantIndex, colorIndex, colors } = this.state;
    const {
      product: { name, price, variants, id },
    } = this.props;

    const renderVariants = (variant, index) => {
      const renderBy = colors.length > 0 ? colorIndex : variantIndex;
      if (renderBy === index) {
        return (
          <div className="product-list-item__variant-sizes">
            <h5>Quick Add</h5>
            <div className="product-list-item__variant-size-list">
              {variant.sizes &&
                variant.sizes.map(({ size, stockQty }, index) => {
                  if (stockQty > 0) {
                    return (
                      <div
                        key={index}
                        className="product-list-item__variant-size"
                      >
                        <p>UK</p>
                        <p>{size}</p>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        );
      }
    };
    return (
      <div className="product-list-item">
        <div className="product-list-item__content">
          <img
            className="product-list-item__main-img"
            src={
              colors ? variants[colorIndex].image : variants[variantIndex].image
            }
            alt="shoe"
          />
          <div className="product-list-item__content-header">
            <h1 className="product-list-item__title">{name}</h1>
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
                        product={{ id, name, price }}
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
                        src={variant.image}
                        alt={`${variant.name}-${variant.color}`}
                      />
                      {renderVariants(variant, index)}
                    </React.Fragment>
                  );
                } else if (!colors) {
                  return (
                    <React.Fragment key={index}>
                      <Favourite
                        product={{ id, name, price }}
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
                        src={variant.image}
                        alt={`${variant.name}-${variant.color}`}
                      />
                      {renderVariants(variant, index)}
                    </React.Fragment>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
