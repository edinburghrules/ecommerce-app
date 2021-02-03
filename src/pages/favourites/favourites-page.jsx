import React from "react";
import "./favourites-page.scss";
import { connect } from "react-redux";
import FavouritesList from "../../components/favourites/favourites-list/favourites-list";
import { parseFavouritesFromLocalStorage } from "../../utils/local-storage/favourites-handler";
import { getFavouritesList } from "../../redux/actions/favouriteActions";
import Loading from "../../components/loading/loading";

class FavouritesPage extends React.Component {
  /* set favourites depending on signed in or not */
  //
  state = {
    favourites: [],
  };

  /* When authenticated get favourites from firestore */
  componentDidMount = async () => {
    if (this.props.authenticated && this.props.match.params.accountId) {
      await this.props.getFavouritesList();
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
      await this.props.getFavouritesList();
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
    if (!this.props.favouritesLoading) {
      if (this.state.favourites.length > 0) {
        return (
          <div className="favourites-list">
            <FavouritesList
              favourites={this.state.favourites}
              authenticated={this.props.authenticated}
              handleDelete={this.handleDelete}
            />
          </div>
        );
      } else {
        return <h1>No Favourites</h1>;
      }
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  favourites: state.favourites.favouritesList,
  favouritesLoading: state.async.loadingProducts,
});

const mapActionsToProps = {
  getFavouritesList,
};

export default connect(mapStateToProps, mapActionsToProps)(FavouritesPage);
