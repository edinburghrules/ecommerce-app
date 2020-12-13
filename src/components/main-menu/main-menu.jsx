import React from 'react';
import './main-menu.scss';
import MenuItem from '../menu-item/menu-item';
import MensApparel from '../../assets/mens-apparel.webp';
import WomenApparel from '../../assets/womens-apparel.webp';
import MensShoes from '../../assets/mens-shoes.png';
import WomensShoes from '../../assets/womens-shoes.png';

const categories = [
  {
    type: "Men's Apparel",
    src: MensApparel,
  },
  {
    type: "Women's Apparel",
    src: WomenApparel,
  },
  {
    type: 'Mens Shoes',
    src: MensShoes,
  },
  {
    type: 'Womens Shoes',
    src: WomensShoes,
  },
];

class MainMenu extends React.Component {
  render() {
    return (
      <div className='main-menu'>
        <h1 className='main-menu__heading'>Shop by category</h1>
        <div className='main-menu__grid'>
          {categories.map(({ type, src }, i) => (
            <MenuItem key={i} title={type} src={src} />
          ))}
        </div>
      </div>
    );
  }
}

export default MainMenu;
