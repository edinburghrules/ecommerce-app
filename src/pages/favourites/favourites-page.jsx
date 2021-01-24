import React from 'react';
import './favourites-page.scss';
import FavouritesList from '../../components/favourites/favourites-list/favourites-list';

class FavouritesPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Favourites</h1>
        <div className='favourites-list'>
          <FavouritesList />
        </div>
      </React.Fragment>
    );
  }
}

export default FavouritesPage;
