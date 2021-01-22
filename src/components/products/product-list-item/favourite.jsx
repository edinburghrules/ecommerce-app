import React from 'react';
import './favourite.scss';
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

  componentDidMount = () => {
    if (this.props.authenticated) {
      this.setState({
        isFavourited: this.props.isFavourite,
      });
    } else {
      /* Get the favourite from local storage by
      passing in the product Id and the variant color */
      this.setState({
        isFavourited: getFavouritesFromLocalStorage(
          'favourites',
          this.props.product.id,
          this.props.variant.color
        )
          ? true
          : false,
      });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.authenticated) {
      if (prevProps.isFavourite !== this.props.isFavourite) {
        this.setState({
          isFavourited: this.props.isFavourite,
        });
      }
    } else {
      if (prevProps.authenticated !== this.props.authenticated) {
        console.log('signed out');
        this.setState({
          isFavourited: getFavouritesFromLocalStorage(
            'favourites',
            this.props.product.id,
            this.props.variant.color
          )
            ? true
            : false,
        });
      }
    }
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
    const { isSelected } = this.props;

    return (
      <button
        onClick={this.handleAddFavourite}
        className={
          isSelected
            ? 'favourite__btn favourite__btn--active'
            : 'favourite__btn'
        }
      >
        <img
          className='favourite__img'
          src={isFavourited ? heartFilled : heartOutline}
          alt='favourite'
        />
      </button>
    );
  }
}

/* Check favourites from backend to match this particular product
id and variant color*/
const favouriteSelector = (state, ownProps) => {
  return state.favourites.favouritesList.some((favourite) => {
    if (favourite.id === ownProps.product.id) {
      return favourite.color === ownProps.variant.color;
    } else {
      return false;
    }
  });
};

const mapStateToProps = (state, ownProps) => ({
  authenticated: state.account.authenticated,
  isFavourite: favouriteSelector(state, ownProps),
});

const mapActionsToProps = {
  addFavouriteProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(Favourite);
