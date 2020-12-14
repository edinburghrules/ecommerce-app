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
    link: 'mens-apparel'
  },
  {
    type: "Women's Apparel",
    src: WomenApparel,
    link: 'womens-apparel'
  },
  {
    type: 'Mens Shoes',
    src: MensShoes,
    link: 'mens-shoes'
  },
  {
    type: 'Womens Shoes',
    src: WomensShoes,
    link: 'womens-shoes'
  },
];

class MainMenu extends React.Component {
  render() {
    return (
      <div className='main-menu'>
        <h1 className='main-menu__heading'>Shop by category</h1>
        <div className='main-menu__grid'>
          {categories.map(({ ...catProps}, i) => (
            <MenuItem key={i} {...catProps} />
          ))}
        </div>
      </div>
    );
  }
}

export default MainMenu;
