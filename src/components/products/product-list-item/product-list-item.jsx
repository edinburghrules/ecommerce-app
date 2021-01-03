import React from 'react';
import './product-list-item.scss';
import heartOutline from '../../../assets/heart-outline.png';

class ProductListItem extends React.Component {
  state = {
    variantIndex: 0,
  };
  handleVariantSelect = (index) => {
    this.setState({
      variantIndex: index,
    });
  };
  render() {
    const { variantIndex } = this.state;
    const {
      product: { name, price, variants },
    } = this.props;
    return (
      <div className='product-list-item'>
        <div className='product-list-item__content'>
          <img
            className='product-list-item__main-img'
            src={variants[variantIndex].image}
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
            {variants[variantIndex].color}
          </p>
          <p className='product-list-item__price'>£{price}</p>
          <div className='product-list-item__variants'>
            {variants &&
              variants.map((variant, index) => (
                <React.Fragment key={index}>
                  <img
                    className={
                      variantIndex === index
                        ? 'product-list-item__variant-img--active'
                        : 'product-list-item__variant-img'
                    }
                    onClick={() => this.handleVariantSelect(index)}
                    src={variant.image}
                    alt={`${variant.name}-${variant.color}`}
                  />
                  {variantIndex === index && (
                    <div className='product-list-item__variant-sizes'>
                      <h5>Quick Add</h5>
                      <div className='product-list-item__variant-size-list'>
                        {variant.sizes &&
                          variant.sizes.map(({ size, stockQty }) => {
                            if (stockQty > 0) {
                              return (
                                <div
                                  key={size}
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
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
