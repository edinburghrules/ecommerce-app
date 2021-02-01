import React from "react";
import "./favourites-page.scss";
import { connect } from "react-redux";
import FavouritesList from "../../components/favourites/favourites-list/favourites-list";
import { parseFavouritesFromLocalStorage } from "../../utils/local-storage/favourites-handler";
import { getFavouriteProducts } from "../../redux/actions/favouriteActions";

class FavouritesPage extends React.Component {
  /* set favourites depending on signed in or not */
  state = {
    favourites: [],
  };

  /* When authenticated get favourites from firestore */
  componentDidMount = async () => {
    if (this.props.authenticated) {
      await this.props.getFavouriteProducts();
      this.setState({
        favourites: this.props.favourites,
      });
    }
    if (!this.props.authenticated && !this.props.match.params.accountId) {
      this.setState({
        favourites: parseFavouritesFromLocalStorage("favourites"),
      });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    /* When favourites change e.g deleted then update favourites 
    in state with new favourites from props */
    if (this.props.favourites !== prevProps.favourites) {
      this.setState({
        favourites: this.props.favourites,
      });
    }
    /* When refresh browser and signed in, authenticated is false momentarily, wait for it
    to turn true and then get favourites */
    if (this.props.authenticated && !prevProps.authenticated) {
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
        {this.props.favouritesLoading ? (
          <h1>LOADING...</h1>
        ) : this.state.favourites.length > 0 ? (
          <div className="favourites-list">
            <FavouritesList
              favourites={this.state.favourites}
              authenticated={this.props.authenticated}
              handleDelete={this.handleDelete}
            />
          </div>
        ) : (
          <h1>No favourites here!</h1>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  favourites: state.favourites.favouritesList,
  favouritesLoading: state.async.loadingProducts,
});

const mapActionsToProps = {
  getFavouriteProducts,
};

export default connect(mapStateToProps, mapActionsToProps)(FavouritesPage);
