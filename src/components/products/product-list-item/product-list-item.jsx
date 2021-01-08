import React from 'react';
import './product-list-item.scss';
import heartOutline from '../../../assets/heart-outline.png';

class ProductListItem extends React.Component {
  state = {
    variantIndex: 0,
    colors: this.props.colorOptions.color
      ? this.props.colorOptions.color
      : false,
    colorIndex: 0,
  };

  componentDidMount = () => {
    if (this.state.colors) {
      const colorIndex = this.props.product.variants.findIndex((variant) => {
        return variant.color === this.state.colors;
      });
      this.setState({
        colorIndex,
      });
    }
  };

  handleVariantSelect = (index) => {
    this.setState({
      colors: false,
      variantIndex: index,
    });
  };
  render() {
    const { variantIndex, colorIndex, colors } = this.state;
    const {
      product: { name, price, variants },
    } = this.props;
    const renderVariants = (variant, index) => {
      const renderBy = colors ? colorIndex : variantIndex;
      if (renderBy === index) {
        return (
          <div className='product-list-item__variant-sizes'>
            <h5>Quick Add</h5>
            <div className='product-list-item__variant-size-list'>
              {variant.sizes &&
                variant.sizes.map(({ size, stockQty }, index) => {
                  if (stockQty > 0) {
                    return (
                      <div
                        key={index}
                        className='product-list-item__variant-size'
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
      <div className='product-list-item'>
        <div className='product-list-item__content'>
          <img
            className='product-list-item__main-img'
            src={
              colors ? variants[colorIndex].image : variants[variantIndex].image
            }
            alt='shoe'
          />
          <div className='product-list-item__content-header'>
            <h1 className='product-list-item__title'>{name}</h1>
            <img
              className='product-list-item__favourite'
              src={heartOutline}
              alt='favourite'
            />
          </div>
          <p className='product-list-item__variant'>
            {colors ? variants[colorIndex].color : variants[variantIndex].color}
          </p>
          <p className='product-list-item__price'>£{price}</p>
          <div className='product-list-item__variants'>
            {variants &&
              variants.map((variant, index) => (
                <React.Fragment key={index}>
                  <img
                    className={
                      colors
                        ? colorIndex === index
                          ? 'product-list-item__variant-img--active'
                          : 'product-list-item__variant-img'
                        : variantIndex === index
                        ? 'product-list-item__variant-img--active'
                        : 'product-list-item__variant-img'
                    }
                    onClick={() => this.handleVariantSelect(index)}
                    src={variant.image}
                    alt={`${variant.name}-${variant.color}`}
                  />
                  {renderVariants(variant, index)}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
