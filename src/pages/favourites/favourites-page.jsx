import React from "react";
import "./favourites-page.scss";
import { connect } from "react-redux";
import FavouritesList from "../../components/favourites/favourites-list/favourites-list";
import { parseFavouritesFromLocalStorage } from "../../utils/local-storage/favourites-handler";
import { getFavouriteProducts } from "../../redux/actions/favouriteActions";

class FavouritesPage extends React.Component {
  state = {
    favourites:
      this.props.authenticated === false
        ? parseFavouritesFromLocalStorage("favourites")
        : [],
  };

  componentDidMount = async () => {
    if (this.props.authenticated) {
      await this.props.getFavouriteProducts();
      this.setState({
        favourites: this.props.favourites,
      });
    } else {
      this.setState({
        favourites: parseFavouritesFromLocalStorage("favourites"),
      });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.authenticated && prevProps.authenticated === false) {
      await this.props.getFavouriteProducts();
      this.setState({
        favourites: this.props.favourites,
      });
    }
  };

  handleDelete = (favourites) => {
    this.setState({
      favourites,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Favourites</h1>
        <div className="favourites-list">
          <FavouritesList
            favourites={this.state.favourites}
            authenticated={this.props.authenticated}
            handleDelete={this.handleDelete}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  favourites: state.favourites.favouritesList,
});

const mapActionsToProps = {
  getFavouriteProducts,
};

export default connect(mapStateToProps, mapActionsToProps)(FavouritesPage);
