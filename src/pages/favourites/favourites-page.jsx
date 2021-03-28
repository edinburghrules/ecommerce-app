import React from "react";
import "./favourites-page.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FavouritesList from "../../components/favourites/favourites-list/favourites-list";
import { parseFavouritesFromLocalStorage } from "../../utils/local-storage/favourites-handler";
import { getFavouritesList } from "../../redux/actions/favouriteActions";
import Loading from "../../components/loading/loading";
import brokenHeartIcon from "../../assets/broken-heart.svg";

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
    console.log(this.state.favourites, this.props.favouritesLoading);
    if (!this.props.favouritesLoading) {
      if (this.state.favourites.length > 0) {
        return (
          <div className="favourites-page">
            <div className="favourites-page__title">
              <h1>Favourites</h1>
            </div>
            <FavouritesList
              favourites={this.state.favourites}
              authenticated={this.props.authenticated}
              handleDelete={this.handleDelete}
            />
          </div>
        );
      } else {
        return (
          <div className="favourites-page">
            <div className="favourites-page__no-favourites">
              <img src={brokenHeartIcon} alt="broken heart" />
              <h1 className="favourites-page__no-favourites-msg">
                No Favourites here!
              </h1>
              <Link to="/">Home</Link>
            </div>
          </div>
        );
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
