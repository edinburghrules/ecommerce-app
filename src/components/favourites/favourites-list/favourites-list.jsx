import React from 'react';
import './favourites-list.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FavouriteCard from '../favourite-card/favourite-card';
import { parseFavouritesFromLocalStorage } from '../../../utils/local-storage/favourites-handler';
import { getFavouriteProducts } from '../../../redux/actions/favouriteActions';

class FavouritesList extends React.Component {
  componentDidMount = () => {
    if (this.props.authenticated) {
      this.props.getFavouriteProducts();
    } else {
      console.log('GET FAVOURITES FROM LOCAL STORAGE');
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.authenticated !== this.props.authenticated) {
      this.props.getFavouriteProducts();
    }
  };

  render() {
    const { favourites } = this.props;
    return (
      <div className='favourites-list'>
        {favourites &&
          favourites.map((favourite, index) => (
            <FavouriteCard key={index} favourite={favourite} />
          ))}
      </div>
    );
  }
}

const favouritesSelector = (state) => {
  if (state.account.authenticated) {
    return state.favourites.favouritesList;
  } else {
    const favourites = parseFavouritesFromLocalStorage('favourites');
    console.log(favourites);
    return favourites;
  }
};

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  favourites: favouritesSelector(state),
});

const mapActionsToProps = {
  getFavouriteProducts,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(FavouritesList));
