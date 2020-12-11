import React from 'react';
import './main-menu.scss';
import MenuItem from '../menu-item/menu-item';

const categories = [{ type: 'MEN' }, { type: 'WOMEN' }, { type: 'KIDS' }];

class MainMenu extends React.Component {
  render() {
    return (
      <div className='main-menu'>
        {categories.map(({ type }) => (
          <MenuItem title={type} />
        ))}
      </div>
    );
  }
}

export default MainMenu;
