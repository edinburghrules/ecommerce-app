import React from 'react';
import './home.scss';
import NavigationBar from '../../components/navigation-bar/navigation-bar';
import MainMenu from '../../components/main-menu/main-menu';

const Home = () => {
  return (
    <div className='homepage'>
      <NavigationBar/>
      <MainMenu/>
    </div>
  );
}

export default Home;