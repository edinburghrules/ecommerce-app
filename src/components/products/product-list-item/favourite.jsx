import React from "react";
import "./favourite.scss";
import heartOutline from "../../../assets/heart-outline.png";
import heartFilled from "../../../assets/heart-filled.png";
import { connect } from "react-redux";
import {
  getFavouritesFromLocalStorage,
  addFavouriteToLocalStorage,
  removeFavouriteFromLocalStorage,
} from "../../../utils/local-storage/favourites-handler";
import {
  addFavouriteProduct,
  removeFavouriteProduct,
} from "../../../redux/actions/favouriteActions";

class Favourite extends React.Component {
  state = {
    isFavourited: false,
  };

  componentDidMount = () => {
    const { authenticated, isFavourite, product, variant } = this.props;
    /* If authenticated get favourite from redux */
    if (authenticated) {
      this.setState({
        isFavourited: isFavourite,
      });
    } else {
      /* Get the favourite from local storage by
      passing in the product Id and the variant color */
      this.setState({
        isFavourited: getFavouritesFromLocalStorage(
          "favourites",
          product.id,
          variant.color
        )
          ? true
          : false,
      });
    }
  };

  componentDidUpdate = (prevProps) => {
    const { authenticated, isFavourite, product, variant } = this.props;
    // If signed in and isFavourite changes on update
    if (authenticated) {
      if (prevProps.isFavourite !== isFavourite) {
        this.setState({
          isFavourited: isFavourite,
        });
      }
    } else {
      // When signing out use local storage favourites instead of database
      if (prevProps.authenticated !== authenticated) {
        this.setState({
          isFavourited: getFavouritesFromLocalStorage(
            "favourites",
            product.id,
            variant.color
          )
            ? true
            : false,
        });
      }
    }
  };

  handleAddFavourite = () => {
    const {
      authenticated,
      product,
      variant,
      addFavouriteProduct,
      removeFavouriteProduct,
    } = this.props;

    this.setState(
      (prevState) => ({
        isFavourited: prevState.isFavourited ? false : true,
      }),
      () => {
        const favouritedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          color: variant.color,
          img: variant.image,
          sizes: variant.sizes,
          category: product.category,
          collection: product.collection,
        };
        if (this.state.isFavourited) {
          if (authenticated) {
            addFavouriteProduct(favouritedProduct);
          } else {
            addFavouriteToLocalStorage("favourites", favouritedProduct);
          }
        } else {
          if (authenticated) {
            console.log("remove favourite from firestore");
            removeFavouriteFromLocalStorage(
              "favourites",
              this.props.product.id,
              variant.color
            );
            removeFavouriteProduct(favouritedProduct);
          } else {
            console.log("Remove from local storage");
            removeFavouriteFromLocalStorage(
              "favourites",
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
            ? "favourite__btn favourite__btn--active"
            : "favourite__btn"
        }
      >
        <img
          className="favourite__img"
          src={isFavourited ? heartFilled : heartOutline}
          alt="favourite"
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
  removeFavouriteProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(Favourite);
