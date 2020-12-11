import React from 'react';
import './home.scss';
import NavigationBar from '../../components/navigation-bar/navigation-bar';
import MainMenu from '../../components/main-menu/main-menu';
import Slider from '../../components/slider/slider';

const Home = () => {
  return (
    <div className='homepage'>
      <NavigationBar/>
      <Slider/>
      <MainMenu/>
    </div>
  );
}

export default Home;