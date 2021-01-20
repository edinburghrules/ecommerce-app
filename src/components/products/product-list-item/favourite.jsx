import React from 'react';
import heartOutline from '../../../assets/heart-outline.png';
import heartFilled from '../../../assets/heart-filled.png';
import { connect } from 'react-redux';
import { addFavouriteProduct } from '../../../redux/actions/favouriteActions';
import {
  getFavouritesFromLocalStorage,
  addFavouriteToLocalStorage,
  removeFavouriteFromLocalStorage,
} from './utils/favourites-handler';

class Favourite extends React.Component {
  state = {
    isFavourited: false,
  };

  /* Get the favourite from local storage by
   passing in the product Id and the variant color */
  componentDidMount = () => {
    this.setState({
      isFavourited: getFavouritesFromLocalStorage(
        'favourites',
        this.props.product.id,
        this.props.variant.color
      )
        ? true
        : false,
    });
  };

  handleAddFavourite = () => {
    const { authenticated, product, variant } = this.props;

    this.setState(
      (prevState) => ({
        isFavourited: prevState.isFavourited ? false : true,
      }),
      () => {
        if (this.state.isFavourited) {
          const favouritedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            color: variant.color,
            img: variant.image,
          };
          if (authenticated) {
            this.props.addFavouriteProduct(favouritedProduct);
          } else {
            addFavouriteToLocalStorage('favourites', favouritedProduct);
          }
        } else {
          if (authenticated) {
            console.log('remove favourite from firestore');
          } else {
            console.log('Remove from local storage');
            removeFavouriteFromLocalStorage(
              'favourites',
              this.props.product.id,
              variant.color
            );
          }
        }
      }
    );
  };

  render() {
    const { isFavourited } = this.state;
    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
});

const mapActionsToProps = {
  addFavouriteProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(Favourite);
