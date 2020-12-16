import React from 'react';
import './home.scss';
import MainMenu from '../../components/main-menu/main-menu';
import Slider from '../../components/slider/slider';

const Home = () => {
  return (
    <div className='homepage'>
      <Slider />
      <MainMenu />
    </div>
  );
};

export default Home;
