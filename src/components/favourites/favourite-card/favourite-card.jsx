import React from "react";
import "./favourite-card.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  parseFavouritesFromLocalStorage,
  removeFavouriteFromLocalStorage
} from "../../../utils/local-storage/favourites-handler";
import { removeFavouriteProduct } from "../../../redux/actions/favouriteActions";
import { addToCart, openCart } from "../../../redux/actions/cartActions";

class FavouriteCard extends React.Component {
  state = {
    selectedSize: false
  };

  handleChange = e => {
    const size = e.currentTarget.value;
    if (size) {
      this.setState({
        selectedSize: size
      });
    }
  };

  addToCart = async () => {
    const productToAdd = {
      id: this.props.favourite.id,
      name: this.props.favourite.name,
      price: this.props.favourite.price,
      image: this.props.favourite.img,
      color: this.props.favourite.color,
      size: this.props.favourite.collection.includes("-shoes")
        ? Number(this.state.selectedSize)
        : this.state.selectedSize,
      category: this.props.favourite.category,
      collection: this.props.favourite.collection,
      qty: 1
    };
    this.props.addToCart(productToAdd, this.props.authenticated);
  };

  removeFromFavourites = () => {
    console.log("runs");
    if (this.props.authenticated) {
      console.log("IF AUTHENTICATED REMOVE FROM FIRESTORE");
      this.props.removeFavouriteProduct(this.props.favourite);
    } else {
      console.log("REMOVE FROM LOCAL STORAGE");
      removeFavouriteFromLocalStorage(
        "favourites",
        this.props.favourite.id,
        this.props.favourite.color
      );
      this.props.handleDelete(parseFavouritesFromLocalStorage("favourites"));
    }
  };

  render() {
    const { selectedSize } = this.state;
    const {
      img,
      color,
      name,
      price,
      sizes,
      category,
      collection,
      id,
      variantIndex
    } = this.props.favourite;

    return (
      <React.Fragment>
        <div className="favourite-card">
          <Link
            to={{
              pathname: `/collection/${collection}/${category}/product/${id}`,
              state: { variantIndex }
            }}
          >
            <img src={img && img} alt="product" />
          </Link>
          <h3>{name && name}</h3>
          <p>£{price && price}</p>
          <p>{color && color}</p>
          <select onChange={this.handleChange}>
            <option defaultValue hidden>
              Select size
            </option>
            {sizes &&
              sizes.map(size => {
                if (size.stockQty > 0) {
                  return (
                    <option key={size.size} value={size.size}>
                      Size {size.size}
                    </option>
                  );
                } else return null;
              })}
          </select>
          <div className="favourite-card__btns">
            <button
              className="favourite-card__btn"
              onClick={this.addToCart}
              disabled={!selectedSize}
            >
              ADD
            </button>
            <button
              className="favourite-card__btn"
              onClick={this.removeFromFavourites}
            >
              DELETE
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.account.authenticated
});

const mapActionsToProps = {
  addToCart,
  removeFavouriteProduct,
  openCart
};

export default connect(mapStateToProps, mapActionsToProps)(FavouriteCard);
