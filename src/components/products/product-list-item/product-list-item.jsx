import React from 'react';
import './product-list-item.scss';
import heartOutline from '../../../assets/heart-outline.png';
import heartFilled from '../../../assets/heart-filled.png';
import { connect } from 'react-redux';
import { addFavouriteProduct } from '../../../redux/actions/favouriteActions';

class ProductListItem extends React.Component {
  state = {
    variantIndex: 0,
    colors: this.props.colorOptions ? this.props.colorOptions : false,
    colorIndex: 0,
    isFavourited: false,
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

  handleAddFavourite = () => {
    const { variantIndex, colorIndex } = this.state;
    const { authenticated, product } = this.props;

    this.setState(
      (prevState) => ({
        isFavourited: prevState.isFavourited ? false : true,
      }),
      () => {
        const favouritedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          variant: product.variants[variantIndex || colorIndex],
        };

        if (this.state.isFavourited) {
          if (authenticated) {
            console.log('Call redux action to add favourite');
            this.props.addFavouriteProduct(favouritedProduct);
          } else {
            console.log('Save to LS');
          }
        } else {
          console.log('Unfavourited and remove from db');
        }
      }
    );
  };

  render() {
    const { variantIndex, colorIndex, colors, isFavourited } = this.state;

    const {
      product: { name, price, variants },
    } = this.props;
    const renderVariants = (variant, index) => {
      const renderBy = colors.length > 0 ? colorIndex : variantIndex;
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
            <button
              onClick={this.handleAddFavourite}
              className='product-list-item__add-favourite-btn'
            >
              <img
                className='product-list-item__favourite'
                src={isFavourited ? heartFilled : heartOutline}
                alt='favourite'
              />
            </button>
          </div>
          <p className='product-list-item__variant'>
            {colors ? variants[colorIndex].color : variants[variantIndex].color}
          </p>
          <p className='product-list-item__price'>£{price}</p>
          <div className='product-list-item__variants'>
            {variants &&
              variants.map((variant, index) => {
                if (colors && colors.includes(variant.color)) {
                  return (
                    <React.Fragment key={index}>
                      <img
                        className={
                          colors && colorIndex === index
                            ? 'product-list-item__variant-img--active'
                            : 'product-list-item__variant-img'
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

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  account: state.account.credentials.email,
});

const mapActionsToProps = {
  addFavouriteProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductListItem);
