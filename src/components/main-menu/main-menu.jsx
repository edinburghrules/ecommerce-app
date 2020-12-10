import React from 'react';
import MenuItem from '../menu-item/menu-item';

class MainMenu extends React.Component {
  render() {
    return (
      <div className='main-menu'>
        <MenuItem title={'HATS'}/>
      </div>      
    )
  }
}

export default MainMenu;