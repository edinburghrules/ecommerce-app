import React from 'react';
import './favourites-list.scss';
import FavouriteCard from '../favourite-card/favourite-card';

const FavouritesList = () => {
  return (
    <div className='favourites-list'>
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
      <FavouriteCard />
    </div>
  );
};

export default FavouritesList;
